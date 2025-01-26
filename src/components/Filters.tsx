import { useState } from 'react';
import { Card } from "@/components/ui/card";

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  beds: string;
  layout: string;
  priceRange: string;
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    beds: '',
    layout: '',
    priceRange: ''
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Card className="p-6 mb-8 bg-white shadow-apple">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Number of Beds</label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            value={filters.beds}
            onChange={(e) => handleFilterChange('beds', e.target.value)}
          >
            <option value="">All</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
            <option value="4">4+ Beds</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Layout Type</label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            value={filters.layout}
            onChange={(e) => handleFilterChange('layout', e.target.value)}
          >
            <option value="">All</option>
            <option value="A">Type A</option>
            <option value="B">Type B</option>
            <option value="C">Type C</option>
            <option value="D">Type D</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Price Range</label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          >
            <option value="">All</option>
            <option value="500-1000">500K - 1M</option>
            <option value="1000-2000">1M - 2M</option>
            <option value="2000-3000">2M - 3M</option>
          </select>
        </div>
      </div>
    </Card>
  );
}