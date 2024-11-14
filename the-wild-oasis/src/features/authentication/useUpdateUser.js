import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    isLoading: isUpdatingUser,
    data: updatedUser,
    mutate: updateUser,
  } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateUserApi({ password, fullName, avatar }),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success(`User information updated succesfully!`);
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdatingUser, updateUser, updatedUser };
}
