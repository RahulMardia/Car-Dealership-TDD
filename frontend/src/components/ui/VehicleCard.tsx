import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Card className="w-full bg-black/40 backdrop-blur-md border-white/10 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] duration-300 group overflow-hidden relative">

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
            <div className="text-xl font-bold">₹ {vehicle.price.toLocaleString()}</div>
            <div className={`text-xs mt-1 font-medium ${vehicle.quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {vehicle.quantity > 0 ? `${vehicle.quantity} In Stock` : 'Out of Stock'}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>

        <div className="w-full h-32 bg-white/5 rounded-md flex items-center justify-center border border-white/5">
          <img
            src="/hero-car.png"
            alt="Luxury Minimalist Car"
            className="w-full h-full object-cover opacity-40 scale-105 animate-in fade-in zoom-in duration-[3000ms]"
          />        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-white text-black hover:bg-white/90 font-medium"
          disabled={vehicle.quantity === 0}
        >
          {vehicle.quantity > 0 ? 'Purchase Vehicle' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
