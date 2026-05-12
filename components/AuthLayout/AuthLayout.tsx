'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './AuthLayout.module.css';

const SLIDE_IMAGES = [
  '/images/beauty_3.jpg',
  '/images/beauty_img.jpg',
  '/images/beauty_1.jpg',
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 3000); // Đổi hình mỗi 6 giây
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* Left Side: Brand & Intro with Image Rotation */}
        <div className={styles.brandPanel}>
          {SLIDE_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`${styles.brandBgLayer} ${index === i ? styles.activeLayer : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}

          <div className={styles.brandContent}>
            <Link href="/" aria-label="Trang chủ" className={styles.logo}>
              <span className={styles.logoIcon}>🎓</span>
              <span className={styles.logoText}>Uni2Insight</span>
            </Link>

            <h1 className={styles.heroTitle}>
              Tương lai của bạn bắt đầu từ sự lựa chọn đúng đắn
            </h1>
            <p className={styles.heroDesc}>
              Khám phá các trường Đại học, so sánh các ngành học và nhận đánh giá chân thực từ cộng đồng sinh viên toàn quốc.
            </p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className={styles.formPanel}>
          <div className={styles.mobileLogo}>
            <Link href="/" aria-label="Trang chủ">
              <span className={styles.logoIcon}>🎓</span>
              <span className={styles.logoText}>Uni2Insight</span>
            </Link>
          </div>

          <div className={styles.card}>
            {children}
          </div>

          <div className={styles.footer}>
            <Link href="/terms">Điều khoản</Link> &middot; <Link href="/privacy">Bảo mật</Link> &middot; <Link href="/contact">Trợ giúp</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
