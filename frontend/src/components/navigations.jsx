// useNavigationActions.js
import { useNavigate } from 'react-router-dom';

const useNavigations = () => {
  const navigate = useNavigate();

  return {
    navigateToProfile: () => navigate('/Profile'),
    navigateToDashboard: () => navigate('/Dashboard'),
    navigateToSettings: () => navigate('/Settings'),
    navigateToSignIn: () => {
      navigate('/');
      localStorage.clear();
    },
    navigateToSignUp: () => {
      navigate('/SignUp');
    }
  };
};

export default useNavigations;
