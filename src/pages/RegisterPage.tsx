import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Section from "../components/layout/Section";

import usePrivateRoute from "../features/auth/hooks/usePrivateRoute";
import Registration from "../features/auth/registration";

export default function RegisterPage() {
  const isAuthorized = usePrivateRoute();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate("/prezentacja-danych", { replace: true });
    }
  }, [isAuthorized, navigate]);

  return (
    <Section>
      <Registration />
    </Section>
  );
}
