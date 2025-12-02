// src/pages/AddEdit.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // لو مفيش id يبقى إنشاء
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    const found = stored.find((t) => String(t.id) === String(id));
    if (found) {
      setTitle(found.title);
      setDesc(found.desc);
      setDate(found.date);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) {
      alert("اكتب عنوان المهمة");
      return;
    }

    setSaving(true);
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (id) {
      // تعديل: استبدل العنصر المناسب
      tasks = tasks.map((task) =>
        String(task.id) === String(id) ? { ...task, title: t, desc, date } : task
      );
    } else {
      // إنشاء جديد
      const newTask = {
        id: Date.now(),
        title: t,
        desc,
        date,
      };

      // منع تكرار نفس العنوان + التاريخ
      const exists = tasks.some((task) => task.title === newTask.title && task.date === newTask.date);
      if (exists) {
        alert("المهمة دي موجودة بالفعل.");
        setSaving(false);
        return;
      }

      tasks.push(newTask);
    }

    // تأكد من عدم وجود مكررات نهائياً (دبب)
    const dedup = tasks.reduce((acc, cur) => {
      const key = cur.title + "::" + cur.date;
      if (!acc._keys.has(key)) {
        acc._keys.add(key);
        acc.result.push(cur);
      }
      return acc;
    }, { _keys: new Set(), result: [] }).result;

    localStorage.setItem("tasks", JSON.stringify(dedup));
    setSaving(false);

    // افراغ الحقول لو إنشاء، أو ارجع للقائمة
    setTitle("");
    setDesc("");
    setDate("");

    navigate("/tasks");
  };

  return (
    <div className="container mt-4">
      <h1>{id ? "تعديل المهمة" : "إضافة مهمة جديدة"}</h1>

      <form style={{ maxWidth: 600 }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">عنوان المهمة:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="اكتب عنوان المهمة"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">وصف المهمة:</label>
          <textarea
            className="form-control"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="اكتب وصف المهمة"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ميعاد المهمة:</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "جاري الحفظ..." : id ? "حفظ التعديلات" : "حفظ المهمة"}
        </button>
      </form>
    </div>
  );
}
