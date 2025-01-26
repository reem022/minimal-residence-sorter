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
  {
    id: '4',
    title: 'Seaside Villa',
    price: 2800000,
    beds: 4,
    layout: 'D',
    sqft: 3200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    title: 'Urban Studio',
    price: 600000,
    beds: 1,
    layout: 'A',
    sqft: 800,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    title: 'Family Townhouse',
    price: 1500000,
    beds: 3,
    layout: 'B',
    sqft: 2200,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
  },
  {
    id: '7',
    title: 'Mountain View Condo',
    price: 900000,
    beds: 2,
    layout: 'C',
    sqft: 1400,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80',
  },
  {
    id: '8',
    title: 'Downtown Loft',
    price: 850000,
    beds: 1,
    layout: 'D',
    sqft: 1100,
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80',
  },
  {
    id: '9',
    title: 'Riverside Apartment',
    price: 1800000,
    beds: 3,
    layout: 'A',
    sqft: 2000,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80',
  }
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