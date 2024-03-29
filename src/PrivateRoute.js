import { Navigate } from "react-router-dom";

export { PrivateRoute };

function PrivateRoute({ children }) {
  return children;
  const auth = localStorage.getItem("Authorization");
  let authUser = true;

  if (auth == null || !auth.startsWith("Bearer ")) authUser = false;

  if (!authUser) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/2" />;
  }

  // authorized so return child components
  return children;
}
