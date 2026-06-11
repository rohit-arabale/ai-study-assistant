import { forwardRef } from 'react';
import './Button.css';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'full-width' : ''} ${loading ? 'loading' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="btn-icon" />}
      {!loading && children}
      {loading && <span className="spinner"></span>}
      {Icon && iconPosition === 'right' && <Icon className="btn-icon" />}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
