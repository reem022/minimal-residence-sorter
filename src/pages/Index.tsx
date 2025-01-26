import { useState } from 'react';
import { Filters, FilterState } from '@/components/Filters';
import { PropertyCard, Property } from '@/components/PropertyCard';

// Sample data - in a real app, this would come from an API
const SAMPLE_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    price: 750000,
    beds: 2,
    layout: 'A',
    sqft: 1200,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Luxury Penthouse',
    price: 2500000,
    beds: 4,
    layout: 'B',
    sqft: 2800,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Garden View Residence',
    price: 1200000,
    beds: 3,
    layout: 'C',
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80',
  },
];

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
          <p className="text-muted">Find your perfect home from our exclusive collection</p>
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