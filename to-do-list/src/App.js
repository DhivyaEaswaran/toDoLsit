import './App.css';
import { useState} from 'react'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'

function App() {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [edit, setEdit] = useState("");
  const [editIndex, setEditIndex] = useState();
 

  function addTask() {
    if (input.trim() !== "") {
      setTask([...task, input]);
      setCount(count + 1);
      setInput("");
      setError("");
    } else {
      setError("Please add a task");
    }
  }

  const handleDelete = (index) => {
    task.splice(index, 1);
    setCount(count - 1);
  }

  const handleEdit = (index) => {
    
    setEditIndex(index);
    setEdit(task[index]);
  }

  const saveEditedTask = () => {
    if (editIndex !== null) {
      task[editIndex] = edit;
      setEditIndex(null);
    }
  }

  const handleEditInputChange = (e, index) => {
    setEdit(e.target.value);
  }

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <input type="text" placeholder="Add new task here..." value={input} onChange={e => setInput(e.target.value)} />
      <button type="submit" onClick={addTask}>Add</button>
  
      <p>You have {count} tasks</p>
      {task.map((taskText, index) => (
        <div key={index}>
          {editIndex === index ? (
            <input
              type="text"
              value={edit}
              onChange={(e) => handleEditInputChange(e, index)}
               
            />
          ) : (
            <span>{taskText}</span>
          )}
          <button onClick={() => handleDelete(index)}><AiFillDelete /></button>
          {editIndex === index ? (
            <button onClick={saveEditedTask}>Save</button>
          ) : (
            <button onClick={() => handleEdit(index)}><AiOutlineEdit /></button>
          )}
        </div>
      ))}
      <p>{error}</p>
    </div>
  );
  
}

export default App;
