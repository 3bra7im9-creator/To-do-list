// src/pages/Tasks.jsx
import { useEffect, useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  // load tasks from localStorage once
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("tasks") || "[]");
      // ensure each task has an id and completed flag
      const normalized = raw.map((t, i) => ({
        id: t.id || `${Date.now()}-${i}`,
        title: t.title || "بدون عنوان",
        desc: t.desc || "",
        date: t.date || "",
        completed: !!t.completed,
      }));
      setTasks(normalized);
    } catch {
      setTasks([]);
    }
  }, []);

  // save to localStorage helper
  const save = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleDelete = (id) => {
    const filtered = tasks.filter((t) => t.id !== id);
    save(filtered);
  };

  const toggleComplete = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    save(updated);
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">قائمة المهام</h1>
        <p className="muted">لا توجد مهام حالياً. ابدأ بإضافة مهمة جديدة من صفحة "Add Task".</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">قائمة المهام</h1>
      <p className="muted">عدد المهام: {tasks.length}</p>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-card ${task.completed ? "done" : ""}`}>
            <div className="task-left">
              <button
                className="round-toggle"
                title="تمييز كمكتملة"
                onClick={() => toggleComplete(task.id)}
              >
                {task.completed ? "✔" : "◻"}
              </button>

              <div>
                <div className="task-title">{task.title}</div>
                {task.desc && <div className="task-desc">{task.desc}</div>}
                {task.date && <div className="task-date">الميعاد: {task.date}</div>}
              </div>
            </div>

            <div className="task-actions">
              <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
