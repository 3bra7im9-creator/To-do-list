// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [tasksCount, setTasksCount] = useState(0);

  useEffect(() => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      setTasksCount(Array.isArray(tasks) ? tasks.length : 0);
    } catch (err) {
      setTasksCount(0);
    }
  }, []);

  return (
    <div className="container">
      <header style={{ marginTop: 12 }}>
        <h1 className="page-title">مرحباً في مشروع <span style={{ color: "var(--accent)" }}>To-Do List</span></h1>
        <p className="lead">
          هذا تطبيق بسيط لإدارة مهامك: أضف مهمة جديدة، عدّل عليها أو شاهد تفاصيل كل مهمة.
          تستطيع استخدامه كقائمة يومية للمهام أو كمذكرة صغيرة لتنظيم شغلك.
        </p>
      </header>

      <section style={{ display: "flex", gap: 20, alignItems: "stretch", marginTop: 18, flexWrap: "wrap" }}>
        <div style={{ minWidth: 240, flex: "1 1 320px" }}>
          <div className="task-card" style={{ padding: 16 }}>
            <div className="info">
              <h3>الحالة الآن</h3>
              <p className="desc">عدد المهام المحفوظة في المتصفح (localStorage)</p>
              <p className="meta" style={{ fontSize: 20, marginTop: 8 }}>{tasksCount} مهمة</p>
            </div>
          </div>
        </div>

        <div style={{ minWidth: 240, flex: "1 1 320px" }}>
          <div className="task-card" style={{ padding: 16, justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
              <Link to="/tasks" className="btn btn-primary" style={{ textAlign: "center" }}>عرض كل المهام</Link>
              <Link to="/add" className="btn btn-ghost" style={{ textAlign: "center" }}>إضافة مهمة جديدة</Link>
              <Link to="/profile" className="btn" style={{ textAlign: "center", background: "transparent", color: "var(--muted)" }}>الملف الشخصي</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 26 }}>
        <div className="task-card" style={{ flexDirection: "column" }}>
          <h3 style={{ marginBottom: 8 }}>نصائح سريعة</h3>
          <ul style={{ color: "var(--muted)", marginLeft: 18 }}>
            <li>اضف عنوان واضح للمهمة (مثلاً: "مراجعة محاضرة الويب").</li>
            <li>استخدم الوصف لوضع تفاصيل أو روابط مهمة.</li>
            <li>حدد ميعاد عندما تحتاج تذكير بذات المهمة.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
