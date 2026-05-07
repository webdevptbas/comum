import useMediaQuery from "../../Util/useMediaQuery";
import "./CheckoutSteps.css";

const steps = ["Checkout", "Payment", "Complete"];

const CheckoutSteps = ({ currentStep }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="custom-steps">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`step ${
            index === currentStep
              ? "active"
              : index < currentStep
                ? "completed"
                : ""
          }`}
        >
          <div className="step-circle"></div>
          <h4
            className={`step-title ${isMobile ? "text-l-medium" : "heading4"} ${
              index === currentStep
                ? "active"
                : index < currentStep
                  ? "completed"
                  : ""
            }`}
          >
            {step}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
