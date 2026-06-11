import { FiBookOpen } from "react-icons/fi";
import "./BrandLogo.css";

export default function BrandLogo({
  title = "Study Assistant",
  size = "md",
  align = "left",
  className = "",
}) {
  const [firstWord, ...restWords] = title.split(" ");
  const secondPart = restWords.join(" ");

  return (
    <div className={`brand-logo brand-logo-${size} brand-logo-${align} ${className}`}>
      <span className="brand-mark" aria-hidden="true">
        <FiBookOpen className="brand-mark-icon" />
      </span>
      <span className="brand-wordmark">
        <span className="brand-wordmark-primary">{firstWord}</span>
        {secondPart && (
          <span className="brand-wordmark-accent">{secondPart}</span>
        )}
      </span>
    </div>
  );
}
