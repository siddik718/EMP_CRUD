import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div>
            <header style={{ marginBottom: "20px" }}>
                <nav >
                    <NavLink to='/' style={{marginRight:"20px"}}>All Employee</NavLink>
                    <NavLink to='add-employee'>Add Employee</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout;