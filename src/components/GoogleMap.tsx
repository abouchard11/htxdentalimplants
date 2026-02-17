import { MapPin } from "lucide-react";

interface GoogleMapProps {
  address: string;
  name: string;
  className?: string;
}

export default function GoogleMap({ address, name, className = "" }: GoogleMapProps) {
  const query = encodeURIComponent(`${name} ${address}`);
  const embedUrl = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-xl border border-border">
        <iframe
          title={`Map showing location of ${name}`}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="w-full aspect-video md:h-[350px] md:aspect-auto border-0"
        />
      </div>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
      >
        <MapPin className="h-4 w-4" />
        Get Directions
      </a>
    </div>
  );
}
