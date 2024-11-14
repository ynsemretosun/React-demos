import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filtering
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { fieldName: "status", value: filterValue, method: "eq" };
  // : { fieldName: "totalPrice", value: 5000, method: "eq" };

  // Sorting
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [fieldName, direction] = sortBy.split("-");

  // Pagination
  const page = Number(searchParams.get("page")) || 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryFn: () =>
      getBookings({ filter, sortBy: { fieldName, direction }, page }),
    queryKey: ["bookings", filter, sortBy, page], //queryKey likes useEffect dependency array; if any value changes and
    //then react query will refectch the data.
  });

  // Prefecting
  const dataPerPage = 10;
  const totalPage = Math.ceil(count / dataPerPage);
  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () =>
        getBookings({
          filter,
          sortBy: { fieldName, direction },
          page: page - 1,
        }),
      queryKey: ["bookings", filter, sortBy, page - 1],
    });
  if (page < totalPage)
    queryClient.prefetchQuery({
      queryFn: () =>
        getBookings({
          filter,
          sortBy: { fieldName, direction },
          page: page + 1,
        }),
      queryKey: ["bookings", filter, sortBy, page + 1],
    });
  return { isLoading, bookings, error, count };
}

export default useBookings;
