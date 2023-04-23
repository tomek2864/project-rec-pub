import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useAppDispatch } from "./utiles/hooks/useAppDispatch";

import { getUserProfile, setGuestRole } from "./features/auth/authSlice";

import PrivateRoutes from "./enums/routes-private.enum";
import PublicRoutes from "./enums/routes-public.enum";

import Layout from "./components/layout/Layout";

import { setupFirebase } from "./lib/firebase";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const VehiclesPage = lazy(() => import("./pages/VehiclesPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const Loading = () => (
  <p className="p-4 w-full h-full text-center">Loading...</p>
);

const router = createBrowserRouter([
  {
    path: PublicRoutes.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: PrivateRoutes.data,
        element: <VehiclesPage />,
      },
      {
        path: PublicRoutes.registration,
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setupFirebase();

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          getUserProfile({
            uid: user.uid,
            email: user.email ?? null,
          })
        );
      } else {
        dispatch(setGuestRole());
      }
    });
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
