import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (
        <div>
            <main>
                <div className='layoutWrapper'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout