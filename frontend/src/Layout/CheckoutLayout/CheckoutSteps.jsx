import { CheckOutlined } from "@ant-design/icons";
import useMediaQuery from "../../Util/useMediaQuery";
import "./CheckoutSteps.css";

const steps = ["Checkout", "Payment", "Complete"];

const getState = (index, currentStep) => {
  if (index === currentStep) return "active";
  if (index < currentStep) return "completed";
  return "";
};

const CheckoutSteps = ({ currentStep }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="custom-steps">
      <div className="steps-row">
        <div className="steps-line"></div>
        {steps.map((step, index) => (
          <div
            key={step}
            className={`step-circle ${getState(index, currentStep)}`}
          >
            <CheckOutlined className="step-check" />
          </div>
        ))}
      </div>

      <div className="steps-titles-row">
        {steps.map((step, index) => (
          <h4
            key={step}
            className={`step-title ${
              isMobile ? "text-l-medium" : "heading4"
            } ${getState(index, currentStep)}`}
          >
            {step}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
