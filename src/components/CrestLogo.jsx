import React from 'react';

/**
 * Official PANACEA DENTAL CARE Brand Logo Component
 * 
 * Supports:
 * - Responsive header lockup (compact tooth+wordmark on mobile, full horizontal on desktop)
 * - Light variation for dark backgrounds (warm ivory lettering + metallic gold)
 * - Original variation for light backgrounds (deep forest green lettering + metallic gold)
 * - Footer and appointment section variants
 * - Isolated tooth-and-leaf emblem variant
 */
export default function CrestLogo({ 
  className = "h-11 sm:h-14", 
  variant = "header", // 'header' | 'footer' | 'appointment' | 'compact' | 'emblem'
  theme = "light", // 'light' (for dark backgrounds) | 'dark' (for light backgrounds)
  alt = "PANACEA DENTAL CARE" 
}) {
  const isLight = theme === "light";

  // Footer Variant: Full Official Logo
  if (variant === 'footer') {
    return (
      <picture className="inline-block select-none">
        <source 
          type="image/webp" 
          srcSet={isLight ? "/images/panacea-logo-full-light.webp" : "/images/panacea-logo-full.webp"} 
        />
        <img
          src={isLight ? "/images/panacea-logo-full-light.png" : "/images/panacea-logo-full.png"}
          alt={alt}
          width="280"
          height="80"
          loading="lazy"
          decoding="async"
          className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-opacity duration-300"
        />
      </picture>
    );
  }

  // Appointment Section Variant
  if (variant === 'appointment') {
    return (
      <div className="inline-flex items-center group select-none">
        <picture className="inline-block">
          <source 
            type="image/webp" 
            srcSet={isLight ? "/images/panacea-header-light.webp" : "/images/panacea-header-dark.webp"} 
          />
          <img
            src={isLight ? "/images/panacea-header-light.png" : "/images/panacea-header-dark.png"}
            alt={alt}
            width="240"
            height="70"
            loading="lazy"
            decoding="async"
            className={`${className} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
          />
        </picture>
      </div>
    );
  }

  // Compact Variant: Tooth Icon + PANACEA Wordmark
  if (variant === 'compact') {
    return (
      <picture className="inline-block select-none">
        <source 
          type="image/webp" 
          srcSet={isLight ? "/images/panacea-logo-compact-light.webp" : "/images/panacea-logo-compact.webp"} 
        />
        <img
          src={isLight ? "/images/panacea-logo-compact-light.png" : "/images/panacea-logo-compact.png"}
          alt={alt}
          width="220"
          height="56"
          loading="lazy"
          decoding="async"
          className={`${className} w-auto object-contain`}
        />
      </picture>
    );
  }

  // Emblem Variant: Tooth & Leaf Mark Only
  if (variant === 'emblem') {
    return (
      <picture className="inline-block select-none">
        <source 
          type="image/webp" 
          srcSet={isLight ? "/images/panacea-emblem-light.webp" : "/images/panacea-emblem.webp"} 
        />
        <img
          src={isLight ? "/images/panacea-emblem-light.png" : "/images/panacea-emblem.png"}
          alt={`${alt} Emblem`}
          width="120"
          height="120"
          loading="lazy"
          decoding="async"
          className={`${className} w-auto object-contain`}
        />
      </picture>
    );
  }

  // Default: Header Variant (Responsive with compact on mobile)
  return (
    <div className="flex items-center group cursor-pointer select-none">
      <picture className="inline-block">
        {/* Mobile: Compact version (<640px) */}
        <source
          media="(max-width: 639px)"
          type="image/webp"
          srcSet={isLight ? "/images/panacea-header-mobile-light.webp" : "/images/panacea-header-mobile-dark.webp"}
        />
        <source
          media="(max-width: 639px)"
          type="image/png"
          srcSet={isLight ? "/images/panacea-header-mobile-light.png" : "/images/panacea-header-mobile-dark.png"}
        />
        {/* Desktop: Full header logo (>=640px) */}
        <source 
          type="image/webp" 
          srcSet={isLight ? "/images/panacea-header-light.webp" : "/images/panacea-header-dark.webp"} 
        />
        <img
          src={isLight ? "/images/panacea-header-light.png" : "/images/panacea-header-dark.png"}
          alt={alt}
          width="240"
          height="70"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className={`${className} w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]`}
        />
      </picture>
    </div>
  );
}
