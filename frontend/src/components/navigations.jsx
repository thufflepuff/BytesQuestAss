import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/userContext';

const useNavigations = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  if(!!userData){
    const username = userData.Username
    return {
      navigateToSignIn: () => {
        navigate('/');
        localStorage.clear();
      },
      navigateToSignUp: () => {
        navigate('/SignUp');
      },
      navigateToSettings: () => navigate('/Settings'),

      navigateToProfile: () => navigate(`/${username}/Profile`),
      navigateToAccounts: () => navigate(`/${username}/Accounts`),
      
      navigateToDashboard: (type) => navigate(`/${username}/${type}/Dashboard`),
      navigateToPosts: (type) => navigate(`/${username}/${type}/Messages`),
      navigateToMessages: (type) => navigate(`/${username}/${type}/Posts`),      
    };
  }
  else {
    return {
      navigateToSignIn: () => {
        navigate('/');
        localStorage.clear();
      },
      navigateToSignUp: () => {
        navigate('/SignUp');
      },
      navigateToSettings: () => navigate('/Settings'),

      navigateToProfile: () => navigate(`/abc/Profile`),
      navigateToDashboard: () => navigate(`/abc/Dashboard`),
      navigateToAccounts: () => navigate(`/abc/Accounts`),

    };
  }
};

export default useNavigations;
