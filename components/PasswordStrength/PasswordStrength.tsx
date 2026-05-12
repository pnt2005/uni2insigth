import styles from './PasswordStrength.module.css';

interface PasswordStrengthProps {
  password?: string;
}

export default function PasswordStrength({ password = '' }: PasswordStrengthProps) {
  let score = 0;
  
  if (password.length >= 6) {
    score = 1;
    // Có chữ cái và số
    const hasCharAndNum = /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
    if (hasCharAndNum) {
      score = 2;
    }
    // Độ dài >= 8, có chữ cái, số, ký tự đặc biệt, và chữ in hoa
    if (
      password.length >= 8 &&
      hasCharAndNum &&
      /[^a-zA-Z0-9]/.test(password) &&
      /[A-Z]/.test(password)
    ) {
      score = 3;
    }
  }

  const getLabel = () => {
    if (!password) return 'Độ mạnh mật khẩu';
    if (score === 0) return 'Quá ngắn';
    if (score === 1) return 'Yếu';
    if (score === 2) return 'Trung bình';
    return 'Mạnh';
  };

  return (
    <div className={styles.strengthWrap}>
      <div className={styles.strengthBar}>
        <div className={`${styles.strengthSegment} ${score >= 1 ? styles.weak : ''}`} />
        <div className={`${styles.strengthSegment} ${score >= 2 ? styles.medium : ''}`} />
        <div className={`${styles.strengthSegment} ${score >= 3 ? styles.strong : ''}`} />
      </div>
      <div className={styles.strengthLabel}>{getLabel()}</div>
    </div>
  );
}
