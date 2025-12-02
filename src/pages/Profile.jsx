// src/pages/Profile.jsx
import { useEffect, useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [msg, setMsg] = useState("");

  // load profile from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("profile") || "null");
      if (saved) {
        setName(saved.name || "");
        setEmail(saved.email || "");
        setBio(saved.bio || "");
      }
    } catch (err) {
      // ignore parse errors
    }
  }, []);

  function handleSave(e) {
    e.preventDefault();
    const profile = { name: name.trim(), email: email.trim(), bio: bio.trim() };
    localStorage.setItem("profile", JSON.stringify(profile));
    setMsg("تم حفظ الملف الشخصي بنجاح ✅");
    // إخفاء الرسالة بعد ثانيتين
    setTimeout(() => setMsg(""), 2000);
  }

  function handleClear() {
    localStorage.removeItem("profile");
    setName("");
    setEmail("");
    setBio("");
    setMsg("تم مسح البيانات.");
    setTimeout(() => setMsg(""), 1500);
  }

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <h1 className="page-title">الملف الشخصي</h1>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 12 }}>
        {/* form */}
        <form onSubmit={handleSave} style={{ flex: "1 1 320px", minWidth: 300 }}>
          <div className="card" style={{ padding: 16 }}>
            <label>الاسم</label>
            <input
              type="text"
              className="form-control"
              placeholder="اكتب اسمك"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label style={{ marginTop: 12 }}>البريد الإلكتروني</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label style={{ marginTop: 12 }}>نبذة عنك</label>
            <textarea
              className="form-control"
              placeholder="اكتب نبذة قصيرة عن نفسك"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className="btn btn-primary" type="submit">حفظ</button>
              <button type="button" onClick={handleClear} className="btn btn-ghost">مسح</button>
            </div>

            {msg && <p style={{ marginTop: 10, color: "var(--accent)" }}>{msg}</p>}
          </div>
        </form>

        {/* preview */}
        <div style={{ flex: "1 1 320px", minWidth: 300 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3>معاينة الملف</h3>
            <p style={{ color: "var(--muted)" }}>هنا تظهر بياناتك كما سيراها الآخرون (أو أنت لاحقًا).</p>

            <div style={{ marginTop: 12 }}>
              <strong>الاسم:</strong>
              <div style={{ marginTop: 6 }}>{name || <span style={{ color: "var(--muted)" }}>لم يُحدد بعد</span>}</div>
            </div>

            <div style={{ marginTop: 12 }}>
              <strong>البريد:</strong>
              <div style={{ marginTop: 6 }}>{email || <span style={{ color: "var(--muted)" }}>لم يُحدد بعد</span>}</div>
            </div>

            <div style={{ marginTop: 12 }}>
              <strong>نبذة:</strong>
              <div style={{ marginTop: 6 }}>{bio ? <div style={{ whiteSpace: "pre-wrap" }}>{bio}</div> : <span style={{ color: "var(--muted)" }}>لا توجد نبذة</span>}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
