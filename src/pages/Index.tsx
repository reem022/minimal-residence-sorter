import { useState } from 'react';
import { Filters, FilterState } from '@/components/Filters';
import { PropertyCard, Property } from '@/components/PropertyCard';

// Sample data - in a real app, this would come from an API
const SAMPLE_PROPERTIES: Property[] = [
  // 1 Bed Properties
  {
    id: '1a',
    title: 'Modern Studio A',
    price: 600000,
    beds: 1,
    layout: 'A',
    sqft: 800,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
  },
  {
    id: '1b',
    title: 'Cozy Studio B',
    price: 750000,
    beds: 1,
    layout: 'B',
    sqft: 850,
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80',
  },
  {
    id: '1c',
    title: 'Urban Studio C',
    price: 850000,
    beds: 1,
    layout: 'C',
    sqft: 900,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
  },
  {
    id: '1d',
    title: 'Downtown Studio D',
    price: 950000,
    beds: 1,
    layout: 'D',
    sqft: 950,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
  },
  // 2 Bed Properties
  {
    id: '2a',
    title: 'Modern 2-Bed A',
    price: 1200000,
    beds: 2,
    layout: 'A',
    sqft: 1200,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80',
  },
  {
    id: '2b',
    title: 'Central 2-Bed B',
    price: 1400000,
    beds: 2,
    layout: 'B',
    sqft: 1300,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80',
  },
  {
    id: '2c',
    title: 'Garden 2-Bed C',
    price: 1600000,
    beds: 2,
    layout: 'C',
    sqft: 1400,
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80',
  },
  {
    id: '2d',
    title: 'Luxury 2-Bed D',
    price: 1800000,
    beds: 2,
    layout: 'D',
    sqft: 1500,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
  },
  // 3 Bed Properties
  {
    id: '3a',
    title: 'Family Home A',
    price: 2100000,
    beds: 3,
    layout: 'A',
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
  },
  {
    id: '3b',
    title: 'Suburban 3-Bed B',
    price: 2300000,
    beds: 3,
    layout: 'B',
    sqft: 2000,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
  },
  {
    id: '3c',
    title: 'Premium 3-Bed C',
    price: 2500000,
    beds: 3,
    layout: 'C',
    sqft: 2200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
  },
  {
    id: '3d',
    title: 'Executive 3-Bed D',
    price: 2700000,
    beds: 3,
    layout: 'D',
    sqft: 2400,
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80',
  },
  // 4+ Bed Properties
  {
    id: '4a',
    title: 'Grand Estate A',
    price: 2800000,
    beds: 4,
    layout: 'A',
    sqft: 3000,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80',
  },
  {
    id: '4b',
    title: 'Luxury Villa B',
    price: 2850000,
    beds: 4,
    layout: 'B',
    sqft: 3200,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80',
  },
  {
    id: '4c',
    title: 'Premium Manor C',
    price: 2900000,
    beds: 4,
    layout: 'C',
    sqft: 3400,
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80',
  },
  {
    id: '4d',
    title: 'Executive Mansion D',
    price: 2950000,
    beds: 4,
    layout: 'D',
    sqft: 3600,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
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