import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/Notfound';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import PrivateRoute from './PrivateRoute';
import AllBooks from '@/pages/AllBooks';
import BookDetails from '@/pages/BookDetails';
import EditBook from '@/pages/EditBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/all-books',
        element: <PrivateRoute><AllBooks /></PrivateRoute>,
      },
      {
        path: '/book-details/:id',
        element: <BookDetails />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/edit-book/:id',
    element: <PrivateRoute><EditBook /></PrivateRoute>,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
