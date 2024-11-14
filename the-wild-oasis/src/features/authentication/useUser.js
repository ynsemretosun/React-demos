import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser as getCurrentUserApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
export function useUser() {
  const {
    data: user,
    isLoading: isGettingUser,
    error,
  } = useQuery({
    queryFn: getCurrentUserApi,
    queryKey: ["user"],
  });
  return {
    isGettingUser,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
