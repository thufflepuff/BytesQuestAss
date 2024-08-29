import React from 'react';
import ReactDOM from 'react-dom/client';

import{
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import App from './App';
import reportWebVitals from './reportWebVitals';

//Screens for routers
import Dashboard from './Screens/dashboard';
import SignIn from './Screens/signIn'
import SignUp from './Screens/signUp'
import Accounts from './Screens/accounts'
import Messages from './Screens/messages'
import Profile from './Screens/profile'
import Settings from './Screens/settings';
import Posts from './Screens/posts'
import NotFound from './Screens/notFound'

import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Default route for the root path */}
      <Route index element={<SignIn />} />
      <Route path="SignUp" element={<SignUp />} />
      
      {/*ProtectedRoute*/}
      
      <Route path=":username/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      {/*ProtectedRoute*/}

      {/* Other routes */}
      <Route path="Accounts" element={<Accounts />} />
      <Route path="Posts" element={<Posts />} />
      <Route path="Messages" element={<Messages />} />
      <Route path="Dashboard" element={<Dashboard />} />

      <Route path="Settings" element={<Settings />} />
      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
