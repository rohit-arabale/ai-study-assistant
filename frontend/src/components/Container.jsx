import './Container.css';

export const Container = ({ children, size = 'md', className = '', ...props }) => (
  <div className={`container container-${size} ${className}`} {...props}>
    {children}
  </div>
);

export const Row = ({ children, gap = 16, className = '', ...props }) => (
  <div className={`row ${className}`} style={{ gap: `${gap}px` }} {...props}>
    {children}
  </div>
);

export const Col = ({ children, span = 1, gap = 16, className = '', ...props }) => (
  <div className={`col col-${span} ${className}`} {...props}>
    {children}
  </div>
);

export const Grid = ({ children, cols = 3, gap = 24, className = '', ...props }) => (
  <div 
    className={`grid ${className}`} 
    style={{ 
      gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
      gap: `${gap}px`
    }} 
    {...props}
  >
    {children}
  </div>
);
