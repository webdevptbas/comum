import { useSearchParams } from "react-router";
import "./BrandFilter.css";

const BrandFilter = ({ activeType }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log({ activeType });

  const setType = (type) => {
    setSearchParams({ type });
  };

  return (
    <div className="brand-filter">
      <button
        className={
          activeType === "cycling"
            ? "brand-active-button text-button-small"
            : "brand-button text-button-small"
        }
        onClick={() => setType("cycling")}
      >
        Cycling
      </button>

      <button
        className={
          activeType === "padel"
            ? "brand-active-button text-button-small"
            : "brand-button text-button-small"
        }
        onClick={() => setType("padel")}
      >
        Padel
      </button>
    </div>
  );
};

export default BrandFilter;
