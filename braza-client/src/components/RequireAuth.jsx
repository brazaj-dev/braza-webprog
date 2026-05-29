import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type");

  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (type === "viewer") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
