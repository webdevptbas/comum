import { parseSpecification } from "../../Util/parseSpecification";
import "./ProductSpecification.css";

const ProductSpecification = ({ specification }) => {
  const sections = parseSpecification(specification);

  if (sections.length === 0) return null;

  return (
    <div className="spec-container">
      {sections.map((section, i) => (
        <div key={i} className="spec-section">
          {section.title && (
            <h4 className="spec-section-title">{section.title}</h4>
          )}
          <div className="spec-items">
            {section.items.map((item, j) =>
              item.bullet ? (
                <div key={j} className="spec-bullet-row">
                  <span className="spec-bullet-dot">•</span>
                  <span className="spec-bullet-text">
                    {item.label ? `${item.label}: ${item.value}` : item.value}
                  </span>
                </div>
              ) : (
                <div key={j} className="spec-row">
                  <span className="spec-label">{item.label}</span>
                  <span className="spec-value">{item.value}</span>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSpecification;
