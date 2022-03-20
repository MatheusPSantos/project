import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Tasks from "../components/list-task";
import Project from "../components/project";
import api from "../providers/api";
import { userIsLogged } from "../utils/auth";

export default function Dashboard() {

  const router = useRouter();

  const [projectName, setProjectName] = useState("");
  const [listProject, setListProject] = useState();


  useEffect(async () => {
    if (!await userIsLogged()) {
      router.push("/login");
    }
  }, []);

  useEffect(async () => {
    await getProjects();
  }, []);

  async function getProjects() {
    const { data } = await api.get("/project");

    if (data.success) {
      setListProject([...data.data]);
    }
  }

  async function createProject() {
    if (projectName.trim("") === "") {
      alert("Project shoul have a name.");
      return;
    }

    const { data } = await api.post("/project", {
      tasks: [],
      name: projectName
    });

    if (data.success) {
      let projects = listProject;
      projects.push(data.data)
      setListProject([projects]);
    }
  }

  return <>
    <div className="container" style={{ width: "50%", margin: "auto" }}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create new project</h5>
          <input
            required
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            value={projectName}
          />
          <button
            style={{ margin: "10px auto", width: "100%" }}
            type="button"
            className="btn btn-primary col"
            onClick={createProject}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
    <div className="container">
      {/* listagem */}
      <h3>My Projects</h3>
      <div className="col">
        {listProject?.map((project, index) => (
          <Project project={project} key={index} getProjects={getProjects} />
        ))}
      </div>
    </div>
  </>;
}