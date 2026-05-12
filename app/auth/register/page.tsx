'use client';
import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '../../../components/AuthLayout/AuthLayout';
import AuthField from '../../../components/AuthField/AuthField';
import AuthButton from '../../../components/AuthButton/AuthButton';
import AuthDivider from '../../../components/AuthDivider/AuthDivider';
import GoogleButton from '../../../components/GoogleButton/GoogleButton';
import PasswordStrength from '../../../components/PasswordStrength/PasswordStrength';
import styles from './register.module.css';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [agreed, setAgreed] = useState(false);

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
      alert('Đăng ký thành công! (UI Demo)');
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className={styles.header}>
        <h1 className={styles.title}>Tạo tài khoản</h1>
        <p className={styles.subtitle}>Miễn phí, không cần thẻ tín dụng</p>
      </div>

      <GoogleButton onClick={() => console.log('Google register')} />
      <AuthDivider />

      <form onSubmit={handleSubmit} className={styles.form}>
        <AuthField
          label="Họ và tên *"
          type="text"
          name="name"
          required
          disabled={loading}
        />
        
        <AuthField
          label="Email *"
          type="email"
          name="email"
          required
          disabled={loading}
        />

        <div className={styles.passwordGroup}>
          <AuthField
            label="Mật khẩu *"
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
          label="Xác nhận mật khẩu *"
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

        <label className={styles.checkboxLabel}>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
            disabled={loading}
          />
          <span className={styles.checkboxText}>
            Tôi đồng ý với <Link href="/terms" target="_blank">Điều khoản dịch vụ</Link> và <Link href="/privacy" target="_blank">Chính sách bảo mật</Link>
          </span>
        </label>

        <AuthButton loading={loading} disabled={!agreed}>
          Tạo tài khoản
        </AuthButton>
      </form>

      <p className={styles.bottomLink}>
        Đã có tài khoản? <Link href="/auth/login">Đăng nhập</Link>
      </p>
    </AuthLayout>
  );
}
