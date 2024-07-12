// * styles
import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className='flex items-center justify-center fixed inset-0 z-50 bg-primary-dark'>
      <div className={styles.loader}>
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
      </div>
    </div>
  );
};

export default Loading;
