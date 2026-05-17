'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../app/Home.module.css';

const HERO_IMAGES = [
  '/images/bg_1.jpg',
  '/images/bg_2.jpg',
  '/images/bg_3.jpg',
];

export default function HeroVisual() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heroVisual}>
      <div className={styles.heroGlow}></div>
      <div className={styles.heroImageCard}>
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: index === i ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: index === i ? 2 : 1
            }}
          >
            <Image
              src={img}
              fill
              priority={i === 0}
              alt={`Hero image ${i + 1}`}
              className={styles.heroImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
