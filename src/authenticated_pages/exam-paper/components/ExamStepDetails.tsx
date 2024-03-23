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
      <h1>{section?.section_title}</h1>
      <button
        className="rounded-md bg-primary px-4 py-2 text-onPrimary hover:bg-primaryVariant hover:shadow"
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
