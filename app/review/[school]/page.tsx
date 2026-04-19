import Script from "next/script";
import styles from "../Review.module.css";

export default async function SchoolReviewPage({ params }: { params: Promise<{ school: string }> }) {
  const resolvedParams = await params;
  const schoolName = "Đại học " + resolvedParams.school.replace(/-/g, ' ').toUpperCase();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Học phí ${schoolName} là bao nhiêu?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Học phí dao động từ 25 - 35 triệu VNĐ/học kỳ tùy thuộc vào ngành học."
        }
      },
      {
        "@type": "Question",
        "name": `Trường ${schoolName} là công lập hay tư thục?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Trường ${schoolName} là một cơ sở đào tạo uy tín với hệ thống quản lý chuẩn quốc tế.`
        }
      }
    ]
  };

  return (
    <article className={styles.article}>
      <Script 
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <h1 className={styles.title}>Review chi tiết {schoolName} - Có đáng học hông?</h1>
      
      <div className={styles.metaTags}>
        <span className={styles.tag}>Đánh giá sinh viên</span>
        <span className={styles.tag}>Hướng nghiệp</span>
        <span className={styles.tag}>Mới nhất 2026</span>
      </div>

      <div className={styles.content}>
        <p>Nếu bạn đang băn khoăn không biết <strong>{schoolName}</strong> có thực sự tốt như lời đồn? Cơ sở vật chất ra sao, chương trình đào tạo thế nào? Cùng UniInsight khám phá chi tiết trong bài review này.</p>
        
        <h2 id="gioi-thieu">1. Giới thiệu chung</h2>
        <p>{schoolName} được thành lập với mục tiêu đào tạo sinh viên chất lượng cao, đáp ứng nhu cầu doanh nghiệp. Tọa lạc tại trung tâm thành phố, trường mang đến một môi trường học tập năng động, hiện đại và chuẩn quốc tế.</p>
        
        <h2 id="chuong-trinh">2. Chương trình đào tạo</h2>
        <ul>
          <li>Đào tạo chuyên sâu về Công nghệ, Kinh tế và Ngôn ngữ.</li>
          <li>Chương trình liên kết quốc tế, trao đổi sinh viên.</li>
          <li>Phát triển kỹ năng mềm và ngoại ngữ cường độ cao.</li>
        </ul>

        <h2 id="co-hoi">3. Cơ hội việc làm</h2>
        <p>100% sinh viên được hõ trợ giới thiệu việc làm sau tốt nghiệp thông qua mạng lưới doanh nghiệp đối tác lớn.</p>

        {/* FAQ Section */}
        <div className={`${styles.faqSection}`} id="faq">
          <h2>4. Câu hỏi thường gặp (FAQ)</h2>
          <div className={styles.faqItem}>
            <div className={styles.faqQuestion}>Học phí {schoolName} là bao nhiêu?</div>
            <div className={styles.faqAnswer}>Học phí dao động từ 25 - 35 triệu VNĐ/học kỳ tùy thuộc vào ngành học.</div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQuestion}>Trường {schoolName} là công lập hay tư thục?</div>
            <div className={styles.faqAnswer}>Trường {schoolName} là một cơ sở đào tạo uy tín với hệ thống quản lý chuẩn quốc tế.</div>
          </div>
        </div>
      </div>
    </article>
  );
}
