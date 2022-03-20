import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import api from "../providers/api";

export default function Task() {
  const router = useRouter()
  const { task, project } = router.query

  const [taskID, setTaskID] = useState(task);
  const [taskObj, setTaskObj] = useState();
  const [loading, setLoading] = useState(true);

  const [taskName, setTaskName] = useState(taskObj?.name);
  const [taskDescription, setTaskDescription] = useState(taskObj?.description);
  const [taskStatus, setTaskStatus] = useState(taskObj?.status);

  useEffect(() => setTaskID(task), [task]);

  useEffect(async () => {
    if (project) return;
    setTimeout(async () => {
      await getTask(taskID);
    }, 2000);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [taskObj]);

  async function getTask(id) {

    const { data } = await api.get("/task/" + id);

    if (data.success) {
      setTaskObj(data.data);
      setTaskName(data.data.name);
      setTaskDescription(data.data.description);
      setTaskStatus(data.data.status);
    }


  }

  async function createTask() {
    try {
      const { data } = await api.post("/task", {
        project: project,
        name: taskName,
        description: taskDescription,
        status: taskStatus
      });

      if (data.success) {
        setTaskObj(data.data);
        alert("Task created.");
        router.push("/dashboard");
      }

      else {
        alert("Something went wrong when try to create task. Please, try again later.");
      }
    } catch (error) {
      alert("Erro while trynig update task.");
    }
  }

  async function updateTask() {
    try {
      const { data } = await api.put("/task", {
        id: taskID,
        name: taskName,
        description: taskDescription,
        status: taskStatus
      });

      if (data.success) {
        setTaskObj(data.data);
      }

      else {
        alert("Something went wrong when try to update task. Please, try again later.");
      }
    } catch (error) {
      alert("Erro while trynig update task.");
    }
  }

  return <>
    {loading &&
      "Carregando dados da task..."
    }
    {!loading && <>
      <div className='container' style={{ height: "calc(90vh - 120px)" }}>
        <h2>Task</h2>
        <div className='card'>
          <div className='card-body'>
            <div className='card-text'>
              <span>Title: </span>
              <input className='card-title' value={taskName} onChange={e => setTaskName(e.target.value)} />
              <br></br>
              <span>Description: </span><br></br>
              <textarea
                style={{ width: "50%", height: "auto" }}
                className='card-title' value={taskDescription}
                onChange={e => setTaskDescription(e.target.value)}
              />
              <br></br>
              <span>Status: </span>
              <select name="status" value={taskStatus} onChange={e => setTaskStatus(e.target.value)}>
                <option value="todo">to do</option>
                <option value="done">done</option>
              </select>
              <br></br>
              <span>Created at: {new Date(taskObj?.createdAt).toDateString()}</span>
              <br></br>
              <span>Finished at: {taskObj?.finishedAt ? new Date(taskObj?.finishedAt).toDateString() : "No yet"}</span>
            </div>
          </div>
          <div className='row'>
            {
              project ?
                <button
                  title="update task"
                  style={{ fontSize: "10px", margin: "20px 10%" }}
                  onClick={createTask}
                  className="col-2 btn btn-primary"
                >
                  Create Task
                </button>
                :
                <button
                  title="update task"
                  style={{ fontSize: "10px", margin: "20px 10%" }}
                  onClick={updateTask}
                  className="col-2 btn btn-primary"
                >
                  Update
                </button>
            }
            <Link href="/dashboard">
              <a
                style={{ fontSize: "10px", margin: "20px 10%" }}
                className='col-2 btn btn-secondary' >
                Back
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
    }

  </>
}