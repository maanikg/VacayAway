import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
export default function Plan() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Plan</h1>
            <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    )
}