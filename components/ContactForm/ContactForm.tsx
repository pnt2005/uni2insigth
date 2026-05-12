'use client';

import { useState, useRef } from 'react';
import styles from './ContactForm.module.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const SUBJECTS = [
  { value: '', label: '-- Chọn chủ đề --' },
  { value: 'support', label: 'Hỗ trợ kỹ thuật' },
  { value: 'business', label: 'Hợp tác kinh doanh' },
  { value: 'bug', label: 'Báo lỗi' },
  { value: 'other', label: 'Khác' },
];

function validateField(name: keyof FormData, value: string): string {
  switch (name) {
    case 'name':
      return value.trim().length < 2 ? 'Vui lòng nhập họ và tên (tối thiểu 2 ký tự).' : '';
    case 'email':
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Địa chỉ email không hợp lệ.' : '';
    case 'subject':
      return !value ? 'Vui lòng chọn chủ đề.' : '';
    case 'message':
      return value.trim().length < 10 ? 'Nội dung tối thiểu 10 ký tự.' : '';
    default:
      return '';
  }
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error khi user bắt đầu nhập lại
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate tất cả fields trước khi gửi
    const allErrors: FormErrors = {};
    let hasError = false;
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) { allErrors[key] = err; hasError = true; }
    });

    if (hasError) { setErrors(allErrors); return; }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.successMessage} role="alert" aria-live="polite">
        <span className={styles.successIcon} aria-hidden="true">✓</span>
        <h3>Gửi thành công!</h3>
        <p>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng <strong>24 giờ làm việc</strong>.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Họ và tên */}
      <div className={styles.fieldGroup}>
        <label htmlFor="cf-name" className={styles.label}>
          Họ và tên <span className={styles.required} aria-hidden="true">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder="Nguyễn Văn A"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="name"
          aria-describedby={errors.name ? 'cf-name-error' : undefined}
        />
        {errors.name && (
          <p id="cf-name-error" className={styles.error} role="alert">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className={styles.fieldGroup}>
        <label htmlFor="cf-email" className={styles.label}>
          Email <span className={styles.required} aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="email"
          aria-describedby={errors.email ? 'cf-email-error' : undefined}
        />
        {errors.email && (
          <p id="cf-email-error" className={styles.error} role="alert">{errors.email}</p>
        )}
      </div>

      {/* Chủ đề */}
      <div className={styles.fieldGroup}>
        <label htmlFor="cf-subject" className={styles.label}>
          Chủ đề <span className={styles.required} aria-hidden="true">*</span>
        </label>
        <select
          id="cf-subject"
          name="subject"
          className={`${styles.select} ${errors.subject ? styles.inputError : ''}`}
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-describedby={errors.subject ? 'cf-subject-error' : undefined}
        >
          {SUBJECTS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={!opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="cf-subject-error" className={styles.error} role="alert">{errors.subject}</p>
        )}
      </div>

      {/* Nội dung */}
      <div className={styles.fieldGroup}>
        <label htmlFor="cf-message" className={styles.label}>
          Nội dung <span className={styles.required} aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          placeholder="Mô tả vấn đề hoặc câu hỏi của bạn..."
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
        />
        {errors.message && (
          <p id="cf-message-error" className={styles.error} role="alert">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <><span className={styles.spinner} aria-hidden="true" /> Đang gửi…</>
        ) : 'Gửi tin nhắn'}
      </button>
    </form>
  );
}
