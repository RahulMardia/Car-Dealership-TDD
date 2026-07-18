import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2, Lock } from "lucide-react";
import { updateVehicle } from "@/redux/actions/vehicleActions";
import { useAppDispatch } from "@/redux/store";

const EditVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  // data passed from the Dashboard
  const location = useLocation();
  const carData = location.state?.vehicle;
 
  const [isProcessing, setIsProcessing] = useState(false);
  const [make, setMake] = useState(""); 
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  useEffect(() => {
   
    if (carData) {
      setMake(carData.make);
      setModel(carData.model);
      setCategory(carData.category);
      setPrice(carData.price);
      setQuantity(carData.quantity);
    } else {
      
      navigate("/admin");
    }
  }, [carData, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    console.log("Ready to send to Update API:", { id, price, quantity });
    
    await dispatch(updateVehicle(id, { price, quantity }));
    
    setIsProcessing(false);
    navigate("/admin"); 
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 selection:bg-white/20 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
        
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate("/admin")} className="mr-4 text-white/50 hover:text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Update Vehicle</h1>
            <p className="text-white/50 text-sm mt-1">Modifying ID: <span className="font-mono text-white/70">{id}</span></p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-6">
          
          {/* READ ONLY FIELDS */}
          <div className="col-span-2 md:col-span-1 space-y-2 relative">
            <Label className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1">
              Make <Lock className="w-3 h-3" />
            </Label>
            <Input disabled value={make} className="bg-black/30 border-white/5 text-white/50 h-11 cursor-not-allowed" />
          </div>
          
          <div className="col-span-2 md:col-span-1 space-y-2 relative">
            <Label className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1">
              Model <Lock className="w-3 h-3" />
            </Label>
            <Input disabled value={model} className="bg-black/30 border-white/5 text-white/50 h-11 cursor-not-allowed" />
          </div>

          <div className="col-span-2 space-y-2 relative">
            <Label className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1">
              Category <Lock className="w-3 h-3" />
            </Label>
            <Input disabled value={category} className="bg-black/30 border-white/5 text-white/50 h-11 cursor-not-allowed" />
          </div>

          {/* EDITABLE FIELDS */}
          <div className="col-span-2 md:col-span-1 space-y-2 mt-4">
            <Label className="text-white/80 text-xs uppercase tracking-wider">New Price (₹)</Label>
            <Input 
              type="number" required value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
              className="bg-black/60 border-white/20 text-white focus-visible:ring-white/30 h-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              placeholder="e.g. 500000" 
            />
          </div>

          <div className="col-span-2 md:col-span-1 space-y-2 mt-4">
            <Label className="text-white/80 text-xs uppercase tracking-wider">Update Quantity</Label>
            <Input 
              type="number" required value={quantity} onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
              className="bg-black/60 border-white/20 text-white focus-visible:ring-white/30 h-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              placeholder="e.g. 10" 
            />
          </div>

          <div className="col-span-2 flex gap-4 mt-6 border-t border-white/10 pt-6">
            <Button type="button" variant="outline" onClick={() => navigate("/admin")} disabled={isProcessing} className="w-1/3 border-white/20 text-white hover:bg-white/10">
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing} className="w-2/3 bg-white text-black hover:bg-white/90 font-medium">
              {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {isProcessing ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicle;