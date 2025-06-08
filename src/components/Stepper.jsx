import React from "react";

const steps = [
  { name: "Postcode", icon: "fas fa-map-pin" },
  { name: "Waste Type", icon: "fas fa-trash" },
  { name: "Select Skip", icon: "fas fa-truck" },
  { name: "Permit Type", icon: "fas fa-file-contract" },
  { name: "Choose Date", icon: "fas fa-calendar-alt" },
  { name: "Payment", icon: "fas fa-credit-card" },
];

const Stepper = ({ currentStep = 2 }) => {
  const totalSteps = steps.length;
  const progressPercent =
    totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="w-full overflow-x-auto px-4 py-10">
      <div className="relative flex justify-between items-center min-w-[700px] md:min-w-full max-w-6xl mx-auto">
        {/* Background Line */}
        <div className="absolute top-[24px] left-6 right-6 h-1 bg-gray-300 z-0" />

        {/* Progress Line */}
        <div
          className="absolute top-[24px] left-6 h-1 bg-blue-600 z-10 transition-all duration-300"
          style={{
            width: `calc(${progressPercent}% - 3rem)`, // 3rem = left padding of 6 + circle radius
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;

          return (
            <div
              key={index}
              className="relative z-20 flex flex-col items-center text-center w-1/6 min-w-[90px]"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 ${
                  isCompleted
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-500 border-gray-300"
                }`}
              >
                <i className={step.icon}></i>
              </div>
              <div
                className={`mt-2 text-sm font-medium ${
                  isCompleted ? "text-blue-700" : "text-gray-500"
                }`}
              >
                {step.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;