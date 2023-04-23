import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import Section from "../components/layout/Section";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Section>
      <h1>Oops!</h1>
      <p>Mamy błąd</p>
      {isRouteErrorResponse(error) ? (
        <p>
          <i>{error.status || error.statusText}</i>
        </p>
      ) : (
        <p>{"Nie znany błąd"}</p>
      )}
    </Section>
  );
}
