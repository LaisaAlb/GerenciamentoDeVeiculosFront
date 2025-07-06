import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Private } from "../components/privateRoute";
import { Register } from "../pages/Register"; 

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<Private><Dashboard/></Private>} />
            <Route path="/dashboard/:id" element={<Private><Dashboard/></Private>} />
        </Routes>
    )
}

export default RoutesApp;