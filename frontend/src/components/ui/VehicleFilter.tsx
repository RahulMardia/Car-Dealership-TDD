import { Input } from "@/components/ui/input";

export interface FilterState {
  search: string;
  category: string;
  minPrice: number | "";
  maxPrice: number | "";
}

interface VehicleFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const VehicleFilter = ({ filters, setFilters }: VehicleFilterProps) => {
  return (
    <div className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5 mb-8 flex flex-col lg:flex-row gap-6 shadow-xl">
      
       {/* Search Input */}
      <div className="flex-[2]">
        <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block font-medium">
          Search Make / Model
        </label>
        <Input
          type="text"
          placeholder="e.g. Toyota, Fortuner..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 focus-visible:ring-white/20"
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex-1">
        <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block font-medium">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full bg-[#111] border border-white/10 text-white h-11 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all cursor-pointer"
        >
          <option value="ALL">All Categories</option>
          <option value="SUV">SUV</option>
          <option value="SEDAN">Sedan</option>
          <option value="HATCHBACK">Hatchback</option>
          <option value="TRUCK">Truck</option>
          <option value="COUPE">Coupe</option>
        </select>
      </div>

      {/* Price Range (Min & Max) */}
      <div className="flex-[1.5] flex gap-2">
        <div className="w-full">
          <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block font-medium">
            Min Price (₹)
          </label>
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : "" })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 focus-visible:ring-white/20"
          />
        </div>
        <div className="w-full">
          <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block font-medium">
            Max Price (₹)
          </label>
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : "" })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 focus-visible:ring-white/20"
          />
        </div>
      </div>

    </div>
  );
};

export default VehicleFilter;