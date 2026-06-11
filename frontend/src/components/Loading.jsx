import './Loading.css';

export const Spinner = ({ size = 'md', color = 'accent' }) => (
  <div className={`spinner spinner-${size} spinner-${color}`}></div>
);

export const Skeleton = ({ width = '100%', height = '20px', className = '' }) => (
  <div 
    className={`skeleton ${className}`}
    style={{ width, height }}
  ></div>
);

export const LoadingContainer = ({ children, loading = false }) => (
  <div className={`loading-container ${loading ? 'loading' : ''}`}>
    {loading && <Spinner size="lg" />}
    <div className={loading ? 'blurred' : ''}>
      {children}
    </div>
  </div>
);
