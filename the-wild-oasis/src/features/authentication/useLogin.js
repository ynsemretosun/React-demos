import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    isLoading: isLogging,
    mutate: login,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect!");
    },
  });
  return { isLogging, login };
}
