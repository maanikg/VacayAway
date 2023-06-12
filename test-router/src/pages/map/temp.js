import { useNavigate } from "react-router";
import { MapContainer } from "./MapView";

function WithNavigate(props) {
    let navigate = useNavigate();
    return <MapContainer {...props} navigate={navigate} />
}

export default WithNavigate