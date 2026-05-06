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
          <div className="step-circle">{index + 1}</div>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
