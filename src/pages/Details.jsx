// src/pages/Details.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    const found = stored.find((t) => String(t.id) === String(id));
    setTask(found || null);
  }, [id]);

  const handleDelete = () => {
    if (!confirm("متأكد تحذف المهمة دي؟")) return;
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    const filtered = stored.filter((t) => String(t.id) !== String(id));
    localStorage.setItem("tasks", JSON.stringify(filtered));
    navigate("/tasks");
  };

  if (!task) {
    return (
      <div className="container mt-4">
        <h1>المهمة غير موجودة</h1>
        <p>ربما تم حذفها أو الرابط غير صحيح.</p>
        <Link to="/tasks" className="btn btn-primary">رجوع للقائمة</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>تفاصيل المهمة</h1>
      <div style={{ marginTop: 16 }}>
        <h2>{task.title}</h2>
        <p>{task.desc}</p>
        <p><strong>الميعاد:</strong> {task.date}</p>

        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <Link to={`/edit/${task.id}`} className="btn btn-success">تعديل</Link>
          <button onClick={handleDelete} className="btn btn-danger">حذف</button>
          <Link to="/tasks" className="btn btn-secondary">رجوع</Link>
        </div>
      </div>
    </div>
  );
}
