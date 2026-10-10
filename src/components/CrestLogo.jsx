import React from 'react';

export default function CrestLogo({ 
  className = "h-11 sm:h-14", 
  variant = "header", // 'header' | 'footer' | 'icon'
  alt = "ELIX Dental & Aesthetic Clinic" 
}) {
  if (variant === 'footer') {
    return (
      <picture className="inline-block">
        <source type="image/webp" srcSet="/images/elix-logo-full.webp" />
        <img
          src="/images/elix-logo-full.png"
          alt={alt}
          width="260"
          height="150"
          loading="lazy"
          className="h-16 sm:h-20 w-auto object-contain transition-opacity duration-300"
        />
      </picture>
    );
  }

  return (
    <div className="flex items-center group cursor-pointer select-none">
      <picture className="inline-block">
        {/* Mobile breakpoint (below 640px) uses compact mobile logo without crowded tagline */}
        <source
          media="(max-width: 639px)"
          type="image/webp"
          srcSet="/images/elix-logo-mobile-header.webp"
        />
        <source
          media="(max-width: 639px)"
          type="image/png"
          srcSet="/images/elix-logo-mobile-header.png"
        />
        {/* Desktop uses full header logo with feminine profile, wordmark & tagline */}
        <source type="image/webp" srcSet="/images/elix-logo-header.webp" />
        <img
          src="/images/elix-logo-header.png"
          alt={alt}
          width="200"
          height="80"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className={`${className} w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]`}
        />
      </picture>
    </div>
  );
}

