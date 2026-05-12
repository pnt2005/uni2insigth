'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '../../../components/AuthLayout/AuthLayout';
import AuthField from '../../../components/AuthField/AuthField';
import AuthButton from '../../../components/AuthButton/AuthButton';
import PasswordStrength from '../../../components/PasswordStrength/PasswordStrength';
import styles from './reset-password.module.css';

type ResetState = 'form' | 'success' | 'expired';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState<ResetState>('form');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');

  // Simulate URL param checking for demo purposes
  useEffect(() => {
    // We only access window in useEffect (client-side)
    const params = new URLSearchParams(window.location.search);
    if (params.get('state') === 'expired') {
      setPageState('expired');
    }
  }, []);

  const handleConfirmBlur = () => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmError('Mật khẩu xác nhận không khớp');
    } else {
      setConfirmError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmError('Mật khẩu xác nhận không khớp');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setPageState('success');
    }, 1500);
  };

  return (
    <AuthLayout>
      {pageState === 'form' && (
        <>
          <div className={styles.header}>
            <div className={styles.icon}>🔐</div>
            <h1 className={styles.title}>Đặt lại mật khẩu</h1>
            <p className={styles.subtitle}>Tạo mật khẩu mới cho tài khoản của bạn</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.passwordGroup}>
              <AuthField
                label="Mật khẩu mới *"
                type="password"
                name="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (confirmPassword && confirmError) {
                    if (e.target.value === confirmPassword) setConfirmError('');
                  }
                }}
              />
              <PasswordStrength password={password} />
            </div>

            <AuthField
              label="Xác nhận mật khẩu mới *"
              type="password"
              name="confirmPassword"
              required
              disabled={loading}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmError && e.target.value === password) setConfirmError('');
              }}
              onBlur={handleConfirmBlur}
              error={confirmError}
            />

            <AuthButton loading={loading}>
              Đặt lại mật khẩu
            </AuthButton>
          </form>
        </>
      )}

      {pageState === 'success' && (
        <div className={styles.stateBlock}>
          <div className={styles.icon}>✅</div>
          <h1 className={styles.title}>Mật khẩu đã được đặt lại thành công!</h1>
          <p className={styles.subtitle}>Bạn có thể đăng nhập bằng mật khẩu mới.</p>
          <div className={styles.actionWrap}>
            <Link href="/auth/login" className={styles.primaryLinkBtn}>
              Đăng nhập
            </Link>
          </div>
        </div>
      )}

      {pageState === 'expired' && (
        <div className={styles.stateBlock}>
          <div className={styles.icon}>⚠️</div>
          <h1 className={styles.title}>Link đã hết hạn</h1>
          <p className={styles.subtitle}>
            Link đặt lại mật khẩu chỉ có hiệu lực trong 15 phút.
          </p>
          <div className={styles.actionWrap}>
            <Link href="/auth/forgot-password" className={styles.primaryLinkBtn}>
              Yêu cầu link mới
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
