import { Outlet, /*Link*/ } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div>hi</div>
            {/* <nav>
                <ul>
                    <li>
                        <Link to="/">HomeScreen</Link>
                    </li>
                    <li>
                        <Link to="/map">Map</Link>
                    </li>
                    <li>
                        <Link to="/trips">Trips</Link>
                    </li>
                    <li>
                        <Link to="/plan">Plan</Link>
                    </li>
                </ul>
            </nav> */}

            <Outlet />
        </>
    )
};

export default Layout;