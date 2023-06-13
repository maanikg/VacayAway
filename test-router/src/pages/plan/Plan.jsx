import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import './tabs.css'
export default function Plan() {
    const navigate = useNavigate();
    return (
        <div >
            <h1 style={{ background: "lightblue" }}>Plan</h1>
            <Tabs />
            <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    )
}