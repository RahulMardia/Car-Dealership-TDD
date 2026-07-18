import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";

const EditVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Grabs the vehicle ID from the URL!

  // The local state ready for the Update API
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("SUV");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");

  // (Later you will add a useEffect here to fetch the car by ID and pre-fill these states!)

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ready to send to Update API:", { id, make, model, category, price, quantity });
    // dispatch(updateVehicleAction(id, { make, model, category, price, quantity }))
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
            
          </div>
        </div>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1 space-y-2">
            <Label className="text-white/80 text-xs uppercase tracking-wider">Make (Brand)</Label>
            <Input 
              required value={make} onChange={(e) => setMake(e.target.value)}
              className="bg-black/50 border-white/10 text-white focus-visible:ring-white/30 h-11" placeholder="e.g. Toyota" 
            />
          </div>
          
          <div className="col-span-2 md:col-span-1 space-y-2">
            <Label className="text-white/80 text-xs uppercase tracking-wider">Model</Label>
            <Input 
              required value={model} onChange={(e) => setModel(e.target.value)}
              className="bg-black/50 border-white/10 text-white focus-visible:ring-white/30 h-11" placeholder="e.g. Fortuner" 
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label className="text-white/80 text-xs uppercase tracking-wider">Category</Label>
            <select 
              value={category} onChange={(e) => setCategory(e.target.value)}
              className="flex h-11 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
            </select>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-2">
            <Label className="text-white/80 text-xs uppercase tracking-wider">Price (₹)</Label>
            <Input 
              type="number" required value={price} onChange={(e) => setPrice(Number(e.target.value))}
              className="bg-black/50 border-white/10 text-white focus-visible:ring-white/30 h-11" placeholder="50000" 
            />
          </div>

          <div className="col-span-2 md:col-span-1 space-y-2">
            <Label className="text-white/80 text-xs uppercase tracking-wider">Quantity in Stock</Label>
            <Input 
              type="number" required value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
              className="bg-black/50 border-white/10 text-white focus-visible:ring-white/30 h-11" placeholder="10" 
            />
          </div>

          <div className="col-span-2 flex gap-4 mt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/admin")} className="w-1/3 border-white/20 text-white hover:bg-white/10">
              Cancel
            </Button>
            <Button type="submit" className="w-2/3 bg-white text-black hover:bg-white/90 font-medium">
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicle;