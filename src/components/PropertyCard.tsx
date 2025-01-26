import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link, QrCode, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

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

  const visualizationUrl = `https://example.com/3d-view/${property.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(visualizationUrl);
    toast.success("Link copied to clipboard!");
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
        
        <div className="flex items-center gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <QrCode className="h-4 w-4" />
                QR Code
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Scan QR Code for 3D View</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 p-4">
                <QRCodeSVG value={visualizationUrl} size={200} />
                <p className="text-sm text-muted-foreground">{visualizationUrl}</p>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" className="gap-2" onClick={handleCopyLink}>
            <Link className="h-4 w-4" />
            Copy Link
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: property.title,
                  text: `Check out this property: ${property.title}`,
                  url: visualizationUrl,
                });
              } else {
                handleCopyLink();
              }
            }}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
}