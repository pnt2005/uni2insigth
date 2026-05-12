'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthLayout from '../../../components/AuthLayout/AuthLayout';
import AuthField from '../../../components/AuthField/AuthField';
import AuthButton from '../../../components/AuthButton/AuthButton';
import styles from './forgot-password.module.css';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Countdown timer logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setCountdown(60); // Bắt đầu countdown 60s
    }, 1500);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setLoading(true);
    // Simulate API call resend
    setTimeout(() => {
      setLoading(false);
      setCountdown(60);
    }, 1000);
  };

  return (
    <AuthLayout>
      <Link href="/auth/login" className={styles.backLink}>
        &larr; Quay lại đăng nhập
      </Link>

      {!success ? (
        <>
          <div className={styles.header}>
            <div className={styles.icon}>🔑</div>
            <h1 className={styles.title}>Quên mật khẩu?</h1>
            <p className={styles.subtitle}>Nhập email để nhận link đặt lại mật khẩu</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <AuthField
              label="Email *"
              type="email"
              name="email"
              required
              autoFocus
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <AuthButton loading={loading}>
              Gửi link đặt lại
            </AuthButton>
          </form>
        </>
      ) : (
        <div className={styles.successState}>
          <div className={styles.icon}>✉️</div>
          <h1 className={styles.title}>Kiểm tra hộp thư!</h1>
          <p className={styles.subtitle}>
            Chúng tôi đã gửi link đặt lại mật khẩu đến
            <br />
            <strong>{email}</strong>
          </p>
          <p className={styles.note}>
            Link có hiệu lực trong 15 phút.
          </p>
          
          <div className={styles.resendBlock}>
            Không nhận được?{' '}
            <button 
              className={styles.resendBtn} 
              onClick={handleResend}
              disabled={countdown > 0 || loading}
            >
              {loading ? 'Đang gửi...' : `Gửi lại${countdown > 0 ? ` (${countdown}s)` : ''}`}
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
