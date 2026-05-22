'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, MapPin, Filter, X, ChevronDown, Building2 } from 'lucide-react';
import universitiesData from '../../data/universities.json';
import styles from './search.module.css';
import ExpandableSection from '@/components/Common/ExpandableSection';

function SearchHubContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState('Toàn quốc');
  const [selectedRegion, setSelectedRegion] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('Điểm chuẩn');
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Real data from universities.json
  const universities = useMemo(() => universitiesData as any[], []);

  // Filter and search
  const filteredResults = useMemo(() => {
    let results = universities;

    // Filter by search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      results = results.filter((uni: any) =>
        uni.name?.toLowerCase().includes(lowerQuery) ||
        uni.title?.toLowerCase().includes(lowerQuery) ||
        uni.city?.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by location
    if (selectedLocation !== 'Toàn quốc') {
      results = results.filter((uni: any) =>
        uni.city === selectedLocation || uni.city?.includes(selectedLocation)
      );
    }

    // Filter by region
    if (selectedRegion !== 'Tất cả') {
      results = results.filter((uni: any) => uni.region === selectedRegion);
    }

    // Sort results
    if (sortBy === 'Điểm chuẩn') {
      results = [...results].sort((a: any, b: any) => {
        const scoreA = parseFloat(a.admissionScoreRange?.toString() || '0') || 0;
        const scoreB = parseFloat(b.admissionScoreRange?.toString() || '0') || 0;
        return scoreB - scoreA;
      });
    } else if (sortBy === 'A-Z') {
      results = [...results].sort((a: any, b: any) =>
        (a.name || a.title || '').localeCompare(b.name || b.title || '')
      );
    }

    return results;
  }, [query, selectedLocation, selectedRegion, sortBy, universities]);

  // Get unique locations
  const locations = useMemo(() => {
    const locs = new Set(['Toàn quốc']);
    universities.forEach((uni: any) => {
      if (uni.city) locs.add(uni.city);
    });
    return Array.from(locs);
  }, [universities]);

  const removeTag = (tagToRemove: string) => {
    if (tagToRemove === selectedLocation) {
      setSelectedLocation('Toàn quốc');
    } else if (tagToRemove === selectedRegion) {
      setSelectedRegion('Tất cả');
    } else if (tagToRemove === sortBy) {
      setSortBy('Điểm chuẩn');
    }
  };

  const getTagsToDisplay = () => {
    const tags = [];
    if (query.trim()) tags.push(query);
    if (selectedLocation !== 'Toàn quốc') tags.push(selectedLocation);
    if (selectedRegion !== 'Tất cả') tags.push(selectedRegion);
    return tags;
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.container}>
        <div style={{ marginBottom: '2.5rem', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Tra cứu thông tin tuyển sinh & đánh giá trường Đại học
          </h1>
          <ExpandableSection>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Chào mừng bạn đến với <strong>Trung tâm Tìm kiếm thông tin giáo dục (Search Hub)</strong> của Uni2Insight. Đây là một cổng thông tin tổng hợp toàn diện, được xây dựng và phát triển với mục đích cao cả là giúp đỡ các em học sinh trung học phổ thông, quý vị phụ huynh cũng như các nhà nghiên cứu giáo dục dễ dàng tiếp cận với một kho dữ liệu khổng lồ, chi tiết và vô cùng phong phú của hàng trăm trường đại học, cao đẳng và học viện danh tiếng trên toàn quốc. Tại nền tảng này, bạn có thể thực hiện các thao tác tìm kiếm chuyên sâu, đa chiều và chính xác tuyệt đối theo nhiều tiêu chí khác nhau như: tên trường đại học, nhóm ngành học mà bạn yêu thích, khu vực địa lý mà bạn muốn gắn bó, điểm chuẩn xét tuyển qua các năm học gần đây, hoặc mức học phí thực tế của từng chương trình đào tạo cụ thể. Hệ thống tìm kiếm của chúng tôi được ứng dụng công nghệ hiện đại, thiết kế giao diện tối ưu hóa cho mọi thiết bị, đảm bảo tốc độ phản hồi nhanh chóng, mượt mà và nội dung luôn được cập nhật liên tục để mang đến những kết quả đáng tin cậy nhất cho hành trình định hướng tương lai nghề nghiệp của bạn.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Không chỉ dừng lại ở việc cung cấp các thông tin cơ bản, công cụ của chúng tôi còn cho phép người dùng tự do cá nhân hóa kết quả tìm kiếm. Bằng việc sử dụng linh hoạt các thanh bộ lọc thông minh – chẳng hạn như lọc theo vị trí địa lý từng tỉnh thành, phân loại theo khu vực vùng miền (Bắc, Trung, Nam), hoặc sắp xếp kết quả theo mức điểm chuẩn thi tốt nghiệp THPT, điểm xét học bạ từ cao xuống thấp – bạn sẽ nhanh chóng và dễ dàng lập ra được một danh sách các ngôi trường đại học lý tưởng, phù hợp nhất với năng lực học tập hiện tại cũng như điều kiện tài chính thực tế của bản thân và gia đình. Hãy thử gõ vào thanh công cụ bất kỳ từ khóa tìm kiếm nào mà bạn quan tâm (ví dụ như tên một trường cụ thể, một khối ngành hot như Công nghệ thông tin, Kinh tế đối ngoại, Truyền thông đa phương tiện, hoặc chỉ đơn giản là tên một tỉnh/thành phố nơi bạn muốn theo học) để bắt đầu quá trình sàng lọc, đối chiếu và so sánh các chương trình đào tạo hấp dẫn nhất hiện nay.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Với sứ mệnh trở thành "kim chỉ nam" đáng tin cậy cho học sinh Việt Nam, Uni2Insight cam kết luôn nỗ lực hết mình để đồng hành cùng các sĩ tử trên mọi miền Tổ quốc. Chúng tôi không chỉ cung cấp những con số, thông tin tuyển sinh khô khan, mà còn mang đến những bài review đánh giá, những chia sẻ trải nghiệm sinh viên chân thực, sống động và đầy cảm hứng từ chính các anh chị khóa trước. Thông qua đó, bạn sẽ có cái nhìn toàn diện và sâu sắc hơn về văn hóa học đường, cơ sở vật chất cũng như cơ hội việc làm sau khi ra trường. Chúc bạn sẽ có một quá trình tra cứu thông tin hiệu quả, tìm được bến đỗ đại học mơ ước và gặt hái nhiều thành công rực rỡ trên con đường học vấn sắp tới!
            </p>
          </ExpandableSection>
        </div>

        {/* 1. Top Controls */}
        <div className={styles.controlsRow}>
          <div className={styles.searchBox}>
            <Search size={18} color="#999" />
            <input
              type="text"
              placeholder="Tìm kiếm trường đại học, ngành học, từ khóa..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <X
                size={16}
                color="#999"
                style={{ cursor: 'pointer' }}
                onClick={() => setQuery('')}
              />
            )}
          </div>

          <div
            className={styles.dropdownBox}
            onClick={() => setShowLocationMenu(!showLocationMenu)}
          >
            <MapPin size={18} color="#7b61ff" />
            <span>{selectedLocation}</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />

            {showLocationMenu && (
              <div className={styles.dropdownMenu}>
                {locations.map(loc => (
                  <div
                    key={loc}
                    className={`${styles.menuItem} ${selectedLocation === loc ? styles.active : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation(loc);
                      setShowLocationMenu(false);
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={styles.filterBtn}
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            <Filter size={18} color="#777" />
            <span>Bộ lọc</span>
            {getTagsToDisplay().length > 0 && <span className={styles.badge}>{getTagsToDisplay().length}</span>}

            {showFilterPanel && (
              <div className={styles.dropdownMenu} style={{ padding: '1rem', width: '200px' }} onClick={(e) => e.stopPropagation()}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#333' }}>Vùng miền</h4>
                <select
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    setShowFilterPanel(false);
                  }}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none' }}
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Miền Bắc">Miền Bắc</option>
                  <option value="Miền Trung">Miền Trung</option>
                  <option value="Miền Nam">Miền Nam</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* 2. Active Filter Tags */}
        <div className={styles.activeTagsRow}>
          {getTagsToDisplay().map(tag => (
            <span key={tag} className={styles.tag} onClick={() => {
              if (tag === selectedLocation) {
                setSelectedLocation('Toàn quốc');
              } else if (tag === selectedRegion) {
                setSelectedRegion('Tất cả');
              } else {
                setQuery('');
              }
            }}>
              <X size={14} /> {tag}
            </span>
          ))}
          {getTagsToDisplay().length > 0 && (
            <button
              className={styles.clearAll}
              onClick={() => {
                setQuery('');
                setSelectedLocation('Toàn quốc');
                setSelectedRegion('Tất cả');
              }}
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {/* 3. Results Header */}
        <div className={styles.resultsHeader}>
          <span>Chúng tôi tìm thấy <strong>{filteredResults.length} kết quả</strong></span>
          <div
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            Sắp xếp theo: <strong>{sortBy}</strong> <ChevronDown size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />

            {showSortMenu && (
              <div className={styles.dropdownMenu} style={{ right: 0, left: 'auto' }}>
                <div
                  className={`${styles.menuItem} ${sortBy === 'Điểm chuẩn' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortBy('Điểm chuẩn');
                    setShowSortMenu(false);
                  }}
                >
                  Điểm chuẩn
                </div>
                <div
                  className={`${styles.menuItem} ${sortBy === 'A-Z' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortBy('A-Z');
                    setShowSortMenu(false);
                  }}
                >
                  A-Z
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Results List (Card Layout) */}
        <div className={styles.resultsList}>
          {filteredResults.length > 0 ? (
            filteredResults.map((item: any, index: number) => (
              <div
                key={item.id || index}
                className={styles.card}
                onClick={() => router.push(`/review/${item.id}`)}
              >
                <div className={styles.cardLeft}>
                  <div className={styles.cardLogo}>
                    <Building2 size={24} />
                  </div>
                  <div className={styles.cardInfo}>
                    <h3>
                      {item.name || item.title}
                      {item.majors && item.majors.length > 0 && (
                        <div className={styles.cardTags}>
                          <span className={`${styles.miniTag} ${styles.tagBlue}`}>{item.majors[0]}</span>
                        </div>
                      )}
                    </h3>
                    <p className={styles.cardSubtitle}>{item.region || 'Đại học'} — {item.city}</p>
                  </div>
                </div>
                <div className={styles.cardRight}>
                  <div className={styles.cardScore}>{item.admissionScoreRange || 'N/A'}</div>
                  <div className={styles.cardTime}>Cập nhật 2 ngày trước</div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>Không tìm thấy kết quả nào. Vui lòng thử với từ khóa khác.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchHubClient() {
  return (
    <Suspense fallback={<div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Đang tải dữ liệu tra cứu...</div>}>
      <SearchHubContent />
    </Suspense>
  );
}