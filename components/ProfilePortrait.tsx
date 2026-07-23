"use client";

import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";

type ProfilePortraitProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ProfilePortrait({ src, alt, className = "" }: ProfilePortraitProps) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setLoaded(false);
    setCurrentSrc(src);

    const preload = new window.Image();
    preload.src = src;
    preload.onload = () => setLoaded(true);
    preload.onerror = () => setLoaded(true);

    return () => {
      preload.onload = null;
      preload.onerror = null;
    };
  }, [src]);

  return (
    <div className={`profile-portrait ${className}`}>
      <div
        aria-hidden="true"
        className={`profile-portrait-skeleton ${loaded ? "profile-portrait-skeleton-hidden" : ""}`}
      />
      {!loaded ? (
        <div aria-hidden="true" className="profile-portrait-placeholder">
          <UserRound className="h-16 w-16 text-[#888888]/40" />
        </div>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt={alt}
        className={`profile-portrait-image ${loaded ? "profile-portrait-image-visible" : ""}`}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{ objectPosition: "center 18%" }}
      />
    </div>
  );
}
