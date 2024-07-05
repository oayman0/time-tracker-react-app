import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEdit, faTrash,faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCircle }  from '@fortawesome/free-regular-svg-icons';

const Tasks = ({mode, setMode}) => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [estPomodoros, setEstPomodoros] = useState(1);
  const [note, setNote] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [addingTask, setAddingTask] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleAddingTask = () => {
    setAddingTask(!addingTask);
    if (!addingTask) {
      // Reset form fields when closing form
      setTaskName('');
      setEstPomodoros(1);
      setNote('');
    }
  };

  const handleEstPomodorosChange = (amount) => {
    setEstPomodoros(prevEst => Math.max(1, prevEst + amount)); // Ensure estPomodoros is at least 1
  };

  const handleSaveTask = () => {
    if (editingTaskId !== null) {
      // Editing existing task
      const updatedTasks = tasks.map(task => {
        if (task.id === editingTaskId) {
          return {
            ...task,
            name: taskName,
            estPomodoros: estPomodoros,
            note: note
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditingTaskId(null); // Clear editing state
    } else {
      // Create new task object
      const newTask = {
        id: tasks.length + 1,
        name: taskName,
        estPomodoros: estPomodoros,
        note: note,
        done: false // Initially task is not done
      };

      // Update tasks state with new task
      setTasks([...tasks, newTask]);
    }

    // Close form after saving
    toggleAddingTask();
  };

  const markTaskDone = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, done: !task.done }; // Toggle task.done
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const editTask = (task) => {
    setTaskName(task.name);
    setEstPomodoros(task.estPomodoros);
    setNote(task.note);
    setEditingTaskId(task.id);
    setAddingTask(false); // Close the add new task form if open
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setTaskName('');
    setEstPomodoros(1);
    setNote('');
  };

  return (
    <div className={`tasks-section ${mode}`} >
      {/* <h2 className='tasks-title'>Tasks</h2> */}

      {/* Display tasks */}
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div className={`task-card ${task.done ? 'done' : ''}`} key={task.id}>
              {editingTaskId === task.id ? (
                <form className="edit-task-form">
                  <label>
                    What are you working on?
                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                  </label>
                  <label>
                    # Pomodoros
                    <div>
                      <button type="button" onClick={() => handleEstPomodorosChange(-1)}>-</button>
                      <input className='pomo-number' type="number" value={estPomodoros} onChange={(e) => setEstPomodoros(parseInt(e.target.value))} />
                      <button type="button" onClick={() => handleEstPomodorosChange(1)}>+</button>
                    </div>
                  </label>
                  <label>
                    Add Note
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} />
                  </label>
                  <div className="form-buttons">
                    <button className="save-btn" type="button" onClick={handleSaveTask}>Save</button>
                    <button className="cancel-btn" type="button" onClick={cancelEdit}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="task-details">
                    <div className={`task-title ${task.done ? 'done' : ''}`} onClick={() => markTaskDone(task.id)}>
                      {task.name}
                    </div>
                    {task.note && <div>{task.note}</div>}
                    <div># Pomodoros: {task.estPomodoros}</div>
                  </div>
                  <div className="task-actions">
                    <button className="mark-done-btn" onClick={() => markTaskDone(task.id)}>
                      <FontAwesomeIcon icon={task.done ? faCircleCheck : faCircle} />
                    </button>
                    <button className="edit-task-btn" onClick={() => editTask(task)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="delete-task-btn" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      {!addingTask && editingTaskId === null && (
        <button className="add-task-btn" onClick={toggleAddingTask}>
          <FontAwesomeIcon className="icon-btn"  icon={faCirclePlus} />
          Add Task</button>
      )}

      {addingTask && editingTaskId === null && (
        <form className="add-task-form">
          <label>
            What are you working on?
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
          </label>
          <label>
            # Pomodoros
            <div>
              <button type="button" onClick={() => handleEstPomodorosChange(1)}>+</button>
              <input className='pomo-number' type="number" value={estPomodoros} onChange={(e) => setEstPomodoros(parseInt(e.target.value))} />
              <button type="button" onClick={() => handleEstPomodorosChange(-1)}>-</button>
            </div>
          </label>
          <label>
            Add Note
            <textarea value={note} onChange={(e) => setNote(e.target.value)} />
          </label>
          <div className="form-buttons">
            <button className="save-btn" type="button" onClick={handleSaveTask}>Save</button>
            <button className="cancel-btn" type="button" onClick={toggleAddingTask}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Tasks;
