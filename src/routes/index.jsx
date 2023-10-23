import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import Dashboard from "../pages/dashboard/Dashboard";
import Invoices from "../pages/invoices/Invoices";
import Profiles from "../pages/profiles/profiles";
import Customer from "../pages/profiles/Customers";
import Newinvoice from "../pages/invoices/new";
import Home from "../pages/home";

export const authRoutes = [
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
];

export const appRoutes = [
  {
    path: "/accounts/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/accounts/invoices",
    element: <Invoices />,
  },
  {
    path: "/accounts/invoices/new",
    element: <Newinvoice />,
  },
  {
    path: "/accounts/profiles",
    element: <Profiles />,
  },
  {
    path: "/accounts/customers",
    element: <Customer />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];
