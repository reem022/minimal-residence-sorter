import { useState } from 'react';
import { Filters, FilterState } from '@/components/Filters';
import { PropertyCard, Property } from '@/components/PropertyCard';

// Generate 62 sample properties
const SAMPLE_PROPERTIES: Property[] = Array.from({ length: 62 }, (_, index) => {
  const bedOptions = [1, 2, 3, 4];
  const layoutOptions = ['A', 'B', 'C', 'D'];
  const beds = bedOptions[index % bedOptions.length];
  const layout = layoutOptions[index % layoutOptions.length];
  
  // Calculate price based on beds and layout
  const basePrice = 500000;
  const bedMultiplier = beds * 400000;
  const layoutMultiplier = layoutOptions.indexOf(layout) * 100000;
  const price = basePrice + bedMultiplier + layoutMultiplier;

  // Calculate sqft based on beds
  const baseSqft = 800;
  const sqft = baseSqft + (beds - 1) * 400;

  return {
    id: `prop-${index + 1}`,
    title: `${beds} Bed ${layout}-Type Unit ${index + 1}`,
    price,
    beds,
    layout,
    sqft,
    image: `https://images.unsplash.com/photo-${1600000000000 + index}?auto=format&fit=crop&q=80`,
  };
});

const Index = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(SAMPLE_PROPERTIES);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = SAMPLE_PROPERTIES;

    if (filters.beds) {
      filtered = filtered.filter(p => p.beds === parseInt(filters.beds));
    }

    if (filters.layout) {
      filtered = filtered.filter(p => p.layout === filters.layout);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(n => parseInt(n) * 1000);
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-secondary p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold mb-2">Off-Plan Residential Units</h1>
          <p className="text-muted">Sales Support Dashboard</p>
        </header>

        <Filters onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
          {filteredProperties.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted">
              No properties match your current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;