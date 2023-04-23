import { useSelector } from "react-redux";

import usePrivateRoute from "../../features/auth/hooks/usePrivateRoute";
import { logout, selectCurrentUser } from "../../features/auth/authSlice";

import Button from "../buttons/Button";

import { useAppDispatch } from "../../utiles/hooks/useAppDispatch";

const Header = () => {
  const isAuthorized = usePrivateRoute();
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);

  return (
    <header className="sticky top-0 z-50 bg-white drop-shadow-sm">
      <div className="layout-wider grid h-16 grid-cols-[3fr_6fr_3fr] items-center">
        <div className="col-span-1 mr-auto">
          {user?.name && <span>{`Witaj ${user?.name} ${user?.lastname}`}</span>}
        </div>

        <div className="col-span-1 mx-auto">
          <h1>Projekt rekrutacyjny TS</h1>
        </div>

        {isAuthorized && (
          <div className="col-span-1 ml-auto">
            <Button variant="primary" onClick={() => dispatch(logout())}>
              Wyloguj się
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
