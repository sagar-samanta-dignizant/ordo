import { appRoutes } from '@/constants/appRoutes';
// import useSession from '@/hooks/useSession';
import * as AppStorage from '../services/app-storage.service';

// import FullPageLoaderComponent from './fullPageLoaderComponent.utils';

const isBrowser = () => typeof window !== 'undefined';

const ProtectedRoute = ({ router, children }) => {
  const session = AppStorage.getAUth();

  
  const isAuthenticated = session.isLogIn || session.token;

  let unprotectedRoutes = [
    appRoutes.AUTH.subRoutes.SIGN_IN.pathname,
    appRoutes.AUTH.subRoutes.FORGET_PASSWORD.pathname,
    appRoutes.AUTH.subRoutes.CREATE_ACCOUNT.pathname,
    appRoutes.AUTH.subRoutes.CREATE_NEW_PASSWORD.pathname,
    appRoutes.AUTH.subRoutes.PASSWORD_VERIFICATION.pathname,
    // appRoutes.MAIN.subRoutes.HOME.pathname,
  ];

  /**

   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array

   */

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  // if (loading) {
  //   return <FullPageLoaderComponent />;
  // }

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push(appRoutes.AUTH.subRoutes.CREATE_ACCOUNT.pathname);
  }

  if (isBrowser() && isAuthenticated && !pathIsProtected) {
    router.push(appRoutes.MAIN.subRoutes.HOME.pathname);
  }

  return children;
};

export default ProtectedRoute;
