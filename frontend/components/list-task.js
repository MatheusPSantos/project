import { useState, useEffect } from "react";
import ReactTooltip from 'react-tooltip';
import api from "../providers/api";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function Tasks({ project_id }) {

  const [listTask, setListTask] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(async () => {
    await getTasks();
  }, []);

  async function getTasks() {
    const { data } = await api.get("/tasks/" + project_id);

    if (data.success) {
      setListTask(data.data.tasks);
      setLoading(false);
    }

    else {
      alert("An Error appear when try to get tasks.");
      setLoading(false);
    }
  }

  async function deleteTask(e, task) {
    try {
      e.preventDefault();
      const { data } = await api.delete("/task/" + task._id);
      if (data.success) {
        alert("Task has been deleted.");
        await getTasks(project_id);
      }
      else {
        alert("Som erro while trying delete.");
        return;

      }
    } catch (error) {
      console.error(error);
      alert("Erro while try to delete task");
    }
  }

  useEffect(() => { setLoading(false) }, [listTask]);

  return <ul className="container list-group">
    <ReactTooltip id="tip" />
    {loading && <li>Loading ...</li>}
    {
      listTask.length > 0 ?
        listTask?.map((task, index) => (
          <ListItem key={index} task={task} done={task.status} deleteTask={deleteTask} />
        ))
        : <></>
    }
  </ul>
}


function ListItem({ task, done, deleteTask }) {
  return <li style={{ listStyle: "none", margin: "10px 0" }}
    className={`list-group-item`}
  >
    <div className="row justify-content-between ">
      <div
        className="col-5"
        data-tip={`
     description: ${task.description}
   `}>
        <Link href={"/" + task._id}>
          <a className={`text-dark ${done && done === "done" ? "text-decoration-line-through " : ""}`}>
            {task.name}
          </a>
        </Link>
        <ReactTooltip />
      </div>
      <div className="col-5">
        <button
          title="Delete task"
          style={{ fontSize: "10px", margin: "0 5px" }} onClick={(e) => deleteTask(e, task)} className="btn btn-danger"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  </li>
}