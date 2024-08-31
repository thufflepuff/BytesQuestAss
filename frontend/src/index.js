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
import SignIn from './Screens/signIn';
import SignUp from './Screens/signUp';

import Dashboard from './Screens/accountScreens/dashboard';
import Profile from './Screens/profile';
import Accounts from './Screens/accountScreens/accounts';

import Posts from './Screens/accountScreens/posts';
import Messages from './Screens/accountScreens/messages';

import Settings from './Screens/settings';

import NotFound from './Screens/notFound';
//to add contexts to stuff
import { ActiveUserProvider } from './components/contexts/userContext';

//to provide arotected access to some stuff
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Default route for the root path */}
      <Route index element={<SignIn />} />
      <Route path="SignUp" element={<SignUp />} />
      
      {/*ProtectedRoute*/}
      
      <Route path=":username/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path=":username/Accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />   
         
      <Route path=":username/:type/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path=":username/:type/Posts" element={<Posts />} />
      <Route path=":username/:type/Messages" element={<Messages />} />

      {/*ProtectedRoute*/}

      <Route path="Settings" element={<Settings />} />
      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActiveUserProvider>
    <RouterProvider router={router} />
    </ActiveUserProvider>
  </React.StrictMode>
);

reportWebVitals();
