import { useNavigate } from "react-router";
export default function Trips() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Trips</h1>
            <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    )
}