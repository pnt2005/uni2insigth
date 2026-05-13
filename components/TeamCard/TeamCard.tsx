import styles from './TeamCard.module.css';

interface TeamCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
  initials: string;
}

export default function TeamCard({ name, role, avatarUrl, initials }: TeamCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.avatar} aria-hidden="true">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} width={80} height={80} />
        ) : (
          <span className={styles.initials}>{initials}</span>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>

      </div>
    </article>
  );
}
