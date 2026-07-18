import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { purchaseVehicle } from "@/redux/actions/vehicleActions";

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onPurchaseSuccess?: () => void;
}

const VehicleCard = ({ vehicle, onPurchaseSuccess }: VehicleCardProps) => {
  const dispatch = useAppDispatch();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const increaseQuantity = () => {
    if (purchaseQuantity < vehicle.quantity) setPurchaseQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (purchaseQuantity > 1) setPurchaseQuantity(prev => prev - 1);
  };

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    // Dispatch api call
    const isSuccess = await dispatch(purchaseVehicle(vehicle._id, purchaseQuantity));

    if (isSuccess) {
      // Reset the UI toggle
      setIsPurchasing(false);
      setPurchaseQuantity(1);
      // Tell the Dashboard to refresh the data so the new stock number shows up!
      if (onPurchaseSuccess) onPurchaseSuccess();
    }
    setIsProcessing(false);
  };

  return (
    <Card className="w-full bg-black/40 backdrop-blur-md border-white/10 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] duration-300 group overflow-hidden relative flex flex-col h-full">
<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              {vehicle.make} <span className="text-white/70">{vehicle.model}</span>
            </CardTitle>
            <CardDescription className="text-white/50 mt-1 uppercase tracking-widest text-xs font-medium">
              {vehicle.category}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">₹{vehicle.price.toLocaleString()}</div>
            <div className={`text-xs mt-1 font-medium ${vehicle.quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {vehicle.quantity > 0 ? `${vehicle.quantity} In Stock` : 'Out of Stock'}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="w-full h-32 bg-white/5 rounded-md flex items-center justify-center border border-white/5">
          <img
            src="/hero-car.png"
            alt="Luxury Minimalist Car"
            className="w-full h-full object-cover opacity-40 scale-105 animate-in fade-in zoom-in duration-[3000ms]"
          />        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {isPurchasing ? (
          <div className="w-full animate-in slide-in-from-bottom-2 fade-in duration-200">
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-md p-2 mb-2">
              <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={purchaseQuantity <= 1 || isProcessing} className="hover:bg-white/20 h-8 w-8 text-white">
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-bold text-lg w-12 text-center">{purchaseQuantity}</span>
              <Button variant="ghost" size="icon" onClick={increaseQuantity} disabled={purchaseQuantity >= vehicle.quantity || isProcessing} className="hover:bg-white/20 h-8 w-8 text-white">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsPurchasing(false)} disabled={isProcessing} className="w-1/3 border-white/20 hover:bg-white/10 text-white">
                <X className="w-4 h-4" />
              </Button>
              <Button onClick={handleConfirmPurchase} disabled={isProcessing} className="w-2/3 bg-white text-black hover:bg-white/90 font-medium">
                {isProcessing ? "Processing..." : `Confirm: ₹${(vehicle.price * purchaseQuantity).toLocaleString()}`}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className="w-full bg-white text-black hover:bg-white/90 font-medium group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
            disabled={vehicle.quantity === 0}
            onClick={() => setIsPurchasing(true)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {vehicle.quantity > 0 ? 'Purchase Vehicle' : 'Out of Stock'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;