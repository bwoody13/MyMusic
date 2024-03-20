import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
      const userInfo = localStorage.getItem('user');
      const tokenTimestamp = localStorage.getItem('token_timestamp');
      const userIsAuthenticated = Boolean(userInfo);
      
       // Check if the token timestamp is more than 4 hours old
       const logoutUserIfTokenExpired = () => {
        if (tokenTimestamp) {
          const timestampDate = new Date(tokenTimestamp);
          const currentDate = new Date();
          const hoursDifference = Math.abs(currentDate.getTime() - timestampDate.getTime()) / 36e5;
          if (hoursDifference > 4) {
            // Token is more than 4 hours old, log the user out
            console.log("Token expired, logging out...");
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('token_timestamp');
            navigate('/');
            return true;
          }
        }
        return false;
      };

      if (logoutUserIfTokenExpired()) {
        return;
      }

      if (userIsAuthenticated && location.pathname === '/') {
        navigate('/dashboard');
        return;
      }
  
      // Redirect to login page if user is not authenticated and not already on the login page
      if (!userIsAuthenticated && location.pathname !== '/') {
        navigate('/');
        return;
      }
    }, [navigate, location.pathname]);
  
    return <>{children}</>;
  };
  
  export default AuthWrapper;
  