import { useAuth } from 'context/AuthContext';
import { validateUserPermissions } from 'utils/validateUserPermissions';

type UseCamParams = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles }: UseCamParams) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  const validPermissions = validateUserPermissions({
    user,
    permissions,
    roles
  });

  return validPermissions;
}
