import { Label } from "@/components/ui/label";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const categories = [
    
    "SUV", "Sedan", "Truck", "Coupe", 
    "Hatchback", "Convertible", "Van", 
    "Wagon", "Luxury", "Electric"
  ];

  return (
    <div className="space-y-2">
      <Label className="text-white/80 text-xs uppercase">Category</Label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="flex h-11 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat} className="bg-black text-white">
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;