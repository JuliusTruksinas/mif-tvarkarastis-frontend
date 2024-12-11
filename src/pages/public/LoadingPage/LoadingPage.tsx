import styles from './LoadingPage.module.scss';

const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
};
export default LoadingPage;
