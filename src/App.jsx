// App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import AddEdit from "./pages/AddEdit";
import Details from "./pages/Details";
import Profile from "./pages/Profile";

export default function App(){
  return (
    <div className="container">
      <nav className="app-nav">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/add">Add Task</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/tasks" element={<Tasks/>} />
        <Route path="/add" element={<AddEdit/>} />
        <Route path="/edit/:id" element={<AddEdit/>} />
        <Route path="/details/:id" element={<Details/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  )
}
