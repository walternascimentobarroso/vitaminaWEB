import useAuth from "./hooks/useAuth";

// Normal Pages
import FaqPage from "./pages/Faq/Page";
import UserPage from "./pages/User/Page";
import RolePage from "./pages/Role/Page";
import HomePage from "./pages/Home/Page";
import ProfilePage from "./pages/Profile/Page";
import Error404Page from "./pages/Error/404Page";
import ComponentPage from "./pages/Component/Page";

// Auth Pages
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import RecoverPasswordPage from "./pages/Auth/RecoverPasswordPage";

const Private = ({ Item }: any) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <LoginPage />;
};

const routes: any[] = [
  {
    path: "*",
    element: <Private Item={Error404Page} />,
  },
  {
    path: "/home",
    exact: true,
    element: <Private Item={HomePage} />,
  },
  {
    path: "/profile",
    exact: true,
    element: <Private Item={ProfilePage} />,
  },
  {
    path: "/user",
    exact: true,
    element: <Private Item={UserPage} />,
  },
  {
    path: "/role",
    exact: true,
    element: <Private Item={RolePage} />,
  },
  {
    path: "/faq",
    exact: true,
    element: <Private Item={FaqPage} />,
  },
  {
    path: "/components",
    exact: true,
    element: <Private Item={ComponentPage} />,
  },
  {
    path: "/login",
    exact: true,
    element: <LoginPage />,
  },
  {
    path: "/register",
    exact: true,
    element: <RegisterPage />,
  },
  {
    path: "/recover",
    exact: true,
    element: <RecoverPasswordPage />,
  },
];

export default routes;
