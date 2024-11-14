import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useSignup() {
  const {
    isLoading: isSigningUp,
    error,
    mutate: signUp,
  } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: (user) => {
      toast.success(
        "Account succesfully created! Please verify the new account from the user's email address"
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isSigningUp, signUp };
}
