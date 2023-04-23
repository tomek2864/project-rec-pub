import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentUser, selectCurrentUserRole } from '../authSlice';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentUserRole);

  return useMemo(() => ({ user, role }), [user, role]);
};
