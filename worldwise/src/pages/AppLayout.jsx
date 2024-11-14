import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import { useAuth } from "../../contexts/FakeAutContext";
import User from "../components/User";
function AppLayout({ isLoading }) {
  const { isAuthenticated } = useAuth();
  return (
    <div className={styles.app}>
      <Sidebar isLoading={isLoading} />
      <Map />
      {isAuthenticated && <User />}
    </div>
  );
}

export default AppLayout;
