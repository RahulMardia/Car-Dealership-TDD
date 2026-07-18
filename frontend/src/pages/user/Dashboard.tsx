
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
 
 
    
    useEffect(() => {
  // 
    }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

 
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vehicle Inventory</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      </div>
    </div>
  );
};

export default Dashboard;
