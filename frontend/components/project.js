import { useRouter } from "next/router";
import api from "../providers/api";
import Tasks from "./list-task";

export default function Project({ project, getProjects }) {

  const router = useRouter();

  async function deleteProject(event) {
    try {
      event.preventDefault();
      const { data } = await api.delete("/project/" + project._id);
      if (data.success) {
        await getProjects();
      }
    } catch (error) {
      alert("Something bad happens when try delete project. Try again later.");
    }
  }

  async function createTask() {
    try {
      router.push("/task?project=" + project._id);
    } catch (error) {
      alert("Something bad happens when try create task. Try again later.");
    }
  }


  return <div style={{ margin: "50px auto" }} className="card">
    <div className="col">
      <div className="card-body">
        <div class="row justify-content-between">
          <div class="col-8">
            <h5>{project?.name || ""}</h5>
          </div>
          <div class="col-4">
            <button style={{ margin: "2px" }} onClick={deleteProject} className="btn btn-danger">Delete</button>
            <button style={{ margin: "2px" }} onClick={createTask} className="btn btn-primary">Add task</button>
          </div>
        </div>
        <Tasks project_id={project._id} />
      </div>
    </div>
  </div>
}