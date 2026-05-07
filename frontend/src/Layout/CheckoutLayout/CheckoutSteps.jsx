import "./CheckoutSteps.css";

const steps = ["Checkout", "Payment", "Complete"];

const CheckoutSteps = ({ currentStep }) => {
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
            className={`heading4 step-title ${
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
