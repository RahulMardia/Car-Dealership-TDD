import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { getVehicles } from "@/redux/actions/vehicleActions";
import { useAppDispatch } from "@/redux/store";
import { logoutAction } from "@/redux/actions/authActions";
import VehicleCard, { Vehicle } from "@/components/ui/VehicleCard";
import VehicleFilter, { FilterState } from "@/components/ui/VehicleFilter";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({ 
    search: "", 
    category: "ALL",
    minPrice: "",
    maxPrice: ""
  });

  // Fetch data from backend with query 
  const getData = async () => {
    setIsLoading(true);
    
    const queryParams: any = {};
    
    if (filters.search) queryParams.search = filters.search; 
    if (filters.category !== "ALL") queryParams.category = filters.category;
    if (filters.minPrice) queryParams.minPrice = filters.minPrice;
    if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;

    const response: any = await dispatch(getVehicles(queryParams));
    
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
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)} 
            className={`border-white/20 transition-colors ${showFilters ? 'bg-white text-black' : 'hover:bg-white/10 text-white'}`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" onClick={handleLogout} className="border-white/20 hover:bg-white hover:text-black transition-colors text-white">
            Logout
          </Button>
        </div>
      </div>
      
      {/* Conditionally Render the Filter UI */}
      {showFilters && (
        <div className="flex flex-col gap-4 mb-8 animate-in slide-in-from-top-4 fade-in duration-300">
          <VehicleFilter filters={filters} setFilters={setFilters} />
          <div className="flex justify-end gap-4">
            <Button 
              variant="ghost" 
              onClick={() => {
                setFilters({ search: "", category: "ALL", minPrice: "", maxPrice: "" });
               
              }} 
              className="text-white/50 hover:text-white"
            >
              Clear
            </Button>
            <Button onClick={getData} className="bg-white text-black hover:bg-white/90">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center text-white/50 py-12 animate-pulse">
            Loading inventory...
          </div>
        ) : vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} onPurchaseSuccess={getData}/>
          ))
        ) : (
          <div className="col-span-full text-center text-white/50 py-12">
            No vehicles match your current filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;