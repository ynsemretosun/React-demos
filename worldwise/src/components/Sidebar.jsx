import { NavLink, Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p> © Copyright {new Date().getUTCFullYear()} React Inc.</p>
        <p style={{ marginLeft: "25px" }}> All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Sidebar;
