import { Card } from "@/components/ui/card";

export interface Property {
  id: string;
  title: string;
  price: number;
  beds: number;
  layout: string;
  sqft: number;
  image: string;
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-apple">
      <div className="aspect-[4/3] relative">
        <img
          src={property.image}
          alt={property.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-lg">{property.title}</h3>
        <p className="text-2xl font-semibold text-primary">
          {formatPrice(property.price)}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted">
          <span>{property.beds} Beds</span>
          <span>•</span>
          <span>Layout {property.layout}</span>
          <span>•</span>
          <span>{property.sqft} sqft</span>
        </div>
      </div>
    </Card>
  );
}