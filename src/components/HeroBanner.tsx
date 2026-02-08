interface HeroBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
}

export default function HeroBanner({
  title,
  subtitle,
  description,
  imageUrl,
}: HeroBannerProps) {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
      {imageUrl && (
        <div className="absolute inset-0 opacity-20">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        {subtitle && (
          <p className="text-blue-300 text-sm font-medium tracking-wider uppercase mb-3">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
