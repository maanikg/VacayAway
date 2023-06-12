import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div>hi</div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">HomeScreen</Link>
                    </li>
                    <li>
                        <Link to="/map">Map</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;