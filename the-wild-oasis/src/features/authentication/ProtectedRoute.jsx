import { useNavigate } from "react-router";
import Spinner from "../../ui/Spinner";
import { useUser } from "./useUser";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isGettingUser, isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated && !isGettingUser) {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate, isGettingUser]
  );

  if (isGettingUser) return <Spinner />;
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
