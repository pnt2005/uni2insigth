import styles from './FAQAccordion.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <section className={styles.section} aria-label="Câu hỏi thường gặp">
      <h2 className={styles.heading}>Câu hỏi thường gặp</h2>
      <div className={styles.list}>
        {items.map((item, idx) => (
          <details key={idx} className={styles.item}>
            <summary className={styles.summary}>
              <span>{item.question}</span>
              <svg
                className={styles.icon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className={styles.body}>
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
