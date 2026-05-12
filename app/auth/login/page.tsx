'use client';
import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '../../../components/AuthLayout/AuthLayout';
import AuthField from '../../../components/AuthField/AuthField';
import AuthButton from '../../../components/AuthButton/AuthButton';
import AuthDivider from '../../../components/AuthDivider/AuthDivider';
import GoogleButton from '../../../components/GoogleButton/GoogleButton';
import styles from './login.module.css';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate loading for UI
    setTimeout(() => {
      setLoading(false);
      setError('Email hoặc mật khẩu không chính xác.'); // Mock error state
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className={styles.header}>
        <h1 className={styles.title}>Chào mừng trở lại 👋</h1>
        <p className={styles.subtitle}>Đăng nhập để tiếp tục</p>
      </div>

      <GoogleButton onClick={() => console.log('Google login')} />
      <AuthDivider />

      {error && (
        <div className={styles.alertError} role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <AuthField
          label="Email *"
          type="email"
          name="email"
          required
          autoFocus
          disabled={loading}
        />
        
        <div className={styles.passwordGroup}>
          <AuthField
            label="Mật khẩu *"
            type="password"
            name="password"
            required
            disabled={loading}
          />
          <Link href="/auth/forgot-password" className={styles.forgotLink} tabIndex={-1}>
            Quên mật khẩu?
          </Link>
        </div>

        <AuthButton loading={loading}>
          Đăng nhập
        </AuthButton>
      </form>

      <p className={styles.bottomLink}>
        Chưa có tài khoản? <Link href="/auth/register">Đăng ký</Link>
      </p>
    </AuthLayout>
  );
}
