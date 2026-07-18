import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, PackagePlus, Trash2, X, Settings2 } from "lucide-react";

export interface Vehicle {
    _id: string;
    make: string;
    model: string;
    category: string;
    price: number;
    quantity: number;
}

// Added the callback props here!
interface AdminVehicleCardProps {
    vehicle: Vehicle;
    onUpdate?: (id: string) => void;
    onRestock?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const AdminVehicleCard = ({ vehicle, onUpdate, onRestock, onDelete }: AdminVehicleCardProps) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card className="w-full bg-black/40 backdrop-blur-md border-white/10 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden relative flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {showDetails && (
                <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 flex flex-col p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-bold">Manage Vehicle</h3>
                            <p className="text-white/50 text-xs">ID: {vehicle._id}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setShowDetails(false)} className="hover:bg-white/10 text-white">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex flex-col gap-3 flex-grow justify-center">
                        <Button
                            onClick={() => onUpdate && onUpdate(vehicle._id)}
                            className="w-full bg-white/10 hover:bg-white text-white hover:text-black transition-all justify-start"
                        >
                            <Edit className="w-4 h-4 mr-3" /> Update Details
                        </Button>
                        
                        <Button
                            onClick={() => onRestock && onRestock(vehicle._id)}
                            className="w-full bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-black border border-green-500/20 transition-all justify-start"
                        >
                            <PackagePlus className="w-4 h-4 mr-3" /> Restock Inventory
                        </Button>
                        
                        <Button
                            onClick={() => onDelete && onDelete(vehicle._id)}
                            className="w-full bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-all justify-start mt-4"
                        >
                            <Trash2 className="w-4 h-4 mr-3" /> Delete Vehicle
                        </Button>
                    </div>
                </div>
            )}

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
                            Stock: {vehicle.quantity}
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
                    />        
                </div>
            </CardContent>

            <CardFooter>
                <Button
                    variant="outline"
                    className="w-full border-white/20 hover:bg-white text-white hover:text-black transition-colors"
                    onClick={() => setShowDetails(true)}
                >
                    <Settings2 className="w-4 h-4 mr-2" />
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AdminVehicleCard;