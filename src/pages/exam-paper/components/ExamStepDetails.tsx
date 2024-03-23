import * as React from 'react';

interface ExamStepDetailsProps {
  activeStep: number;
  section: any;
  sectionLength: number;
  handleNext: any;
  handleSubmit: any;
}

const ExamStepDetails: React.FC<ExamStepDetailsProps> = ({
  activeStep,
  section,
  sectionLength,
  handleNext,
  handleSubmit,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="py-4 text-xl">{section?.section_title}</h1>
      <div className="py-4">
        <p>1. Please select your preferred contact method?</p>
        <div className="flex flex-col gap-2">
          <div className="space-x-4">
            <input
              type="radio"
              id="contactChoice1"
              name="contact"
              value="email"
            />
            <label htmlFor="Choice1">Email</label>
          </div>
          <div className="space-x-4">
            <input
              type="radio"
              id="contactChoice2"
              name="contact"
              value="phone"
            />
            <label htmlFor="Choice2">Phone</label>
          </div>
          <div className="space-x-4">
            <input
              type="radio"
              id="contactChoice3"
              name="contact"
              value="mail"
            />
            <label htmlFor="Choice3">Mail</label>
          </div>

          <div className="space-x-4">
            <input
              type="radio"
              id="contactChoice3"
              name="contact"
              value="mail"
            />
            <label htmlFor="Choice3">Mail</label>
          </div>
        </div>
      </div>
      <button
        className="mt-4 rounded-md bg-primary px-4 py-2 text-onPrimary hover:bg-primaryVariant hover:shadow"
        onClick={() => {
          if (activeStep === sectionLength) {
            handleSubmit();
          } else {
            handleNext();
          }
        }}
      >
        {activeStep === sectionLength ? 'Submit' : 'Continue'}
      </button>
    </div>
  );
};

export default ExamStepDetails;
