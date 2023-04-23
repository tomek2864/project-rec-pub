
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from './useAuth';

import UserRoles from '../../../enums/user-roles.enum';
import PublicRoutes from '../../../enums/routes-public.enum';

const PublicRoutesList = [PublicRoutes.home as string, PublicRoutes.registration as string]

const usePrivateRoute = () => {
  const [isAuthorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (auth.role === UserRoles.guest) {
      setAuthorized(false);

      // redirect to the home page if user opened private routes
      if (!PublicRoutesList.includes(location.pathname)) {
        navigate('/', { replace: true })
      }
    } else {
      setAuthorized(true);
    }
  }, [auth.role, location.pathname, navigate]);

  return isAuthorized;
};

export default usePrivateRoute;
