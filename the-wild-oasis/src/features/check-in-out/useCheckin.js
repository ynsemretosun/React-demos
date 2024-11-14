import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isCheckingIn, mutate: checkInBooking } = useMutation({
    mutationFn: ({ bookingId, options }) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...options,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} succesfully checked in.`);
      navigate("/");
    },
    onError: () => {
      toast.error(`There was an error while checking in`);
    },
  });
  return { isCheckingIn, checkInBooking };
}
