import jwtDecode from 'jwt-decode';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from 'errors/AuthTokenError';
import { validateUserPermissions } from './validateUserPermissions';

type SSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
};

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: SSRAuthOptions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies['nextauth.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }
    const user = jwtDecode<{ permissions: string[]; roles: string[] }>(token);

    if (options) {
      const { permissions, roles } = options;

      const validPermissions = validateUserPermissions({
        user,
        permissions,
        roles
      });

      if (!validPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        };
      }
    }
    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextauth.token');
        destroyCookie(ctx, 'nextauth.refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        };
      }
    }
  };
}
