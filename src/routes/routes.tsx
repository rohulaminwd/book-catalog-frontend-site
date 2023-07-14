import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';

// Example authentication function
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};


type CustomRouteObject = RouteObject & { auth?: boolean };

const routes: CustomRouteObject[] = [
  {
    path: '/',
    element: <App />,
  },

];

// Filter routes based on authentication
const filteredRoutes = routes.map((route) => {
  if (route.auth && !isAuthenticated()) {
    // Redirect unauthenticated user to login page
    return {
      ...route,
      element: <Navigate to="/login" replace />,
    };
  }
  return route;
});

const BrowserRouter = createBrowserRouter(filteredRoutes);

export default BrowserRouter;
