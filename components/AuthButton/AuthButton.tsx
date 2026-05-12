import styles from './AuthButton.module.css';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function AuthButton({ children, loading, disabled, type = 'submit', ...props }: AuthButtonProps) {
  return (
    <button className={styles.btn} type={type} disabled={disabled || loading} {...props}>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {loading ? 'Đang xử lý...' : children}
    </button>
  );
}
