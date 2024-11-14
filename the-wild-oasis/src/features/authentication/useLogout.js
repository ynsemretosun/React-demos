import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const { isLoading: isLogginout, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isLogginout, logout };
}
