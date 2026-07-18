import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, LogOut, X, Save } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { getVehicles } from "@/redux/actions/vehicleActions";
import { logoutAction } from "@/redux/actions/authActions";
import AdminVehicleCard, { Vehicle } from "@/components/ui/AdminVehicleCard";
import CategorySelect from "@/components/ui/CategorySelect";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Toggle state for the inline form
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("SUV");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      const response: any = await dispatch(getVehicles());
      if (response && Array.isArray(response)) {
        setVehicles(response);
      }
      setIsLoading(false);
    };
    fetchVehicles();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/admin/login");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ready to send to Create API:", { make, model, category, price, quantity });
    // dispatch(addVehicleAction({ make, model, category, price, quantity }))
    
   
  };

  return (
    <div className="container mx-auto p-8 min-h-screen bg-black text-white selection:bg-white/20">
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Command Center</h1>
          <p className="text-white/50 mt-1">Manage dealership inventory and operations.</p>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className={`transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] ${showAddForm ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' : 'bg-white text-black hover:bg-white/90'}`}
          >
            {showAddForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {showAddForm ? 'Close' : 'Add New Vehicle'}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="border-white/20 hover:bg-white hover:text-black transition-colors text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
      
      
      {showAddForm && (
        <div className="mb-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300">
          <h2 className="text-xl font-bold mb-4">Register New Vehicle</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-white/80 text-xs uppercase">Make</Label>
              <Input required value={make} onChange={(e) => setMake(e.target.value)} className="bg-black/50 border-white/10 text-white h-11" placeholder="e.g. Honda" />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 text-xs uppercase">Model</Label>
              <Input required value={model} onChange={(e) => setModel(e.target.value)} className="bg-black/50 border-white/10 text-white h-11" placeholder="e.g. Civic" />
            </div>
            <CategorySelect value={category} onChange={setCategory} />
            <div className="space-y-2">
              <Label className="text-white/80 text-xs uppercase">Price (₹)</Label>
              <Input type="number" required value={price} onChange={(e) => setPrice(Number(e.target.value))} className="bg-black/50 border-white/10 text-white h-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="₹500,000" />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 text-xs uppercase">Quantity</Label>
              <Input type="number" required  value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="bg-black/50 border-white/10 text-white h-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="10" />
            </div>
            
            <div className="col-span-2 md:col-span-5 flex justify-end mt-2">
               <Button type="submit" className="bg-white text-black hover:bg-white/90">
                 <Save className="w-4 h-4 mr-2" /> Add to Inventory
               </Button>
            </div>
          </form>
        </div>
      )}
      
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center text-white/50 py-12 animate-pulse">
            Loading database...
          </div>
        ) : vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <AdminVehicleCard key={vehicle._id} vehicle={vehicle} />
          ))
        ) : (
          <div className="col-span-full text-center text-white/50 py-12 border border-white/5 rounded-lg bg-white/5">
            No vehicles in inventory. Click "Add New Vehicle" to start.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;