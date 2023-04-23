import Section from "../components/layout/Section";

import usePrivateRoute from "../features/auth/hooks/usePrivateRoute";
import Vehicles from "../features/vehicles";

export default function VehiclesPage() {
  const isAuthorized = usePrivateRoute();

  if (!isAuthorized) return <div />;

  return (
    <Section>
      <Vehicles />
    </Section>
  );
}
