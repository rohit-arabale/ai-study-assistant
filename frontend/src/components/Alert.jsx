import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import './Alert.css';

const iconMap = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  warning: FiAlertCircle,
  info: FiInfo,
};

export default function Alert({ 
  type = 'info', 
  title, 
  message, 
  onClose,
  dismissible = true,
  className = ''
}) {
  const Icon = iconMap[type];

  return (
    <div className={`alert alert-${type} ${className}`}>
      <div className="alert-content">
        {Icon && <Icon className="alert-icon" />}
        <div className="alert-text">
          {title && <h4 className="alert-title">{title}</h4>}
          {message && <p className="alert-message">{message}</p>}
        </div>
      </div>
      {dismissible && onClose && (
        <button className="alert-close" onClick={onClose}>
          <FiX size={20} />
        </button>
      )}
    </div>
  );
}

export const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}) => (
  <span className={`badge badge-${variant} badge-${size} ${className}`}>
    {children}
  </span>
);
