
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the student dashboard
    navigate("/student-dashboard");
  }, [navigate]);
  
  return null;
};

export default UserDashboard;
