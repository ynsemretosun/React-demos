import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkOutBooking } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} succesfully checked out.`);
    },
    onError: () => {
      toast.error(`There was an error while checking out`);
    },
  });
  return { isCheckingOut, checkOutBooking };
}
