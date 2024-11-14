import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Account from "./pages/Account";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckIn from "./features/check-in-out/CheckIn";
const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    path: "/",
    children: [
      {
        element: <Dashboard />,
        path: "/dashboard",
      },
      {
        element: <Navigate replace to="dashboard" />,
        index: true,
      },

      {
        element: <Bookings />,
        path: "/bookings",
      },
      {
        element: <Booking />,
        path: "/bookings/:bookingId",
      },
      {
        element: <CheckIn />,
        path: "/checkin/:bookingId",
      },
      {
        element: <Cabins />,
        path: "/cabins",
      },
      {
        element: <Account />,
        path: "/account",
      },
      {
        element: <Users />,
        path: "/users",
      },
      {
        element: <Settings />,
        path: "/settings",
      },
    ],
  },

  {
    element: <Login />,
    path: "/login",
  },

  {
    element: <PageNotFound />,
    path: "*",
  },
]);
function App() {
  const query = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={query}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          containerStyle={{
            margin: "8px",
          }}
          gutter={12}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 6000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
