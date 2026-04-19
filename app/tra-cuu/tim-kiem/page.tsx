'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import universitiesData from '../../../data/universities.json';
import styles from './search.module.css';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  
  // Use useMemo for blazing fast client-side filtering without API calls
  const filteredUniversities = useMemo(() => {
    return universitiesData.filter((uni) => {
      const matchSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRegion = selectedRegion === 'All' || uni.region === selectedRegion;
      return matchSearch && matchRegion;
    });
  }, [searchTerm, selectedRegion]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tra Cứu Gọn Nhẹ Nhất (Client-Side)</h1>
      <p className={styles.subtitle}>Tốc độ tức thì. Không cần gọi API.</p>
      
      <div className={styles.filters}>
        <input 
          type="text" 
          placeholder="Nhập tên trường..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        
        <select 
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className={styles.select}
        >
          <option value="All">Tất cả khu vực</option>
          <option value="Miền Bắc">Miền Bắc</option>
          <option value="Miền Trung">Miền Trung</option>
          <option value="Miền Nam">Miền Nam</option>
        </select>
      </div>

      <div className={styles.grid}>
        {filteredUniversities.map((uni) => (
          <div key={uni.id} className={styles.card}>
            <div className={styles.cardHeader}>
              {/* Force next/image usage as per Core Web Vitals requirement */}
              <div className={styles.imageContainer}>
             <Image 
                  src={uni.image} 
                  alt={`Logo ${uni.name}`} 
                  width={60} 
                  height={60} 
                  className={styles.logo}
                  loading="lazy" 
                />
              </div>
              <h2 className={styles.schoolName}>{uni.name}</h2>
            </div>
            
            <div className={styles.cardBody}>
              <p><strong>Khu vực:</strong> {uni.region}</p>
              <p><strong>Học phí:</strong> {uni.tuitionText}</p>
              <p><strong>Điểm chuẩn:</strong> {uni.admissionScoreRange}</p>
            </div>
            
            <div className={styles.cardFooter}>
              <Link href={`/review/${uni.id}`} className={styles.linkButton}>
                Xem Review
              </Link>
            </div>
          </div>
        ))}
        {filteredUniversities.length === 0 && (
          <p className={styles.noResult}>Không có kết quả nào trùng khớp.</p>
        )}
      </div>
    </div>
  );
}
