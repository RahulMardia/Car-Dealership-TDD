import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getVehicles } from "@/redux/actions/vehicleActions";
import { useAppDispatch } from "@/redux/store";
import { logoutAction } from "@/redux/actions/authActions";
import VehicleCard, { Vehicle } from "@/components/ui/VehicleCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
 
  const getData = async () => {
    setIsLoading(true);
    const response: any = await dispatch(getVehicles());
    
    // In Redux Thunks, if we return response.data, it comes back here directly.
    if (response && Array.isArray(response)) {
      setVehicles(response);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-8 min-h-screen bg-black text-white selection:bg-white/20">
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Inventory</h1>
          <p className="text-white/50 mt-1">Manage and purchase premium vehicles.</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="border-white/20 hover:bg-white hover:text-black transition-colors">
          Logout
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center text-white/50 py-12 animate-pulse">
            Loading inventory...
          </div>
        ) : vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))
        ) : (
          <div className="col-span-full text-center text-white/50 py-12">
            No vehicles currently in stock.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
