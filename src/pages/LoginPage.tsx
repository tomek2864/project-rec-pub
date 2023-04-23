import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Section from "../components/layout/Section";

import Login from "../features/auth/login";
import usePrivateRoute from "../features/auth/hooks/usePrivateRoute";

export default function LoginPage() {
  const isAuthorized = usePrivateRoute();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate("/prezentacja-danych", { replace: true });
    }
  }, [isAuthorized, navigate]);

  return (
    <Section>
      <Login />
    </Section>
  );
}
