import { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  size = 'md',
  fullWidth = true,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`input-wrapper ${fullWidth ? 'full-width' : ''}`}>
      {label && <label className="input-label">{label}</label>}
      <div className={`input-container input-${size}`}>
        {Icon && <Icon className="input-icon" />}
        <input
          ref={ref}
          className={`input-field ${error ? 'error' : ''} ${Icon ? 'with-icon' : ''} ${className}`}
          disabled={disabled}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p className={`input-helper ${error ? 'error' : ''}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
