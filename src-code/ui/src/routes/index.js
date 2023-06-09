import { useRoutes } from 'react-router-dom';

// routes
import AdminRoutes from './AdminRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import ClientRoutes from './ClientRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([ClientRoutes, AdminRoutes, AuthenticationRoutes]);
}
