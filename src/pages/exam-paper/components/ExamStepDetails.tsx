import Loading from 'common/components/Loading';
import useQuery from 'common/hooks/useQuery';
import * as React from 'react';

import ExamQuestions from './ExamQuestions';

interface ExamStepDetailsProps {
  sections: any;
  sectionLength: number;
  handleNext: any;
  activeStep: number;
  handleSubmit: any;
  submitButtonRef: any;
}

const ExamStepDetails: React.FC<ExamStepDetailsProps> = ({
  sections,
  sectionLength,
  handleNext,
  activeStep,
  handleSubmit,
  submitButtonRef,
}) => {
  const {
    loading: questionsDataLoading,
    data: questionsData,
    setData: setQuestionsData,
    executeQuery: executeGetQuestionsData,
  } = useQuery<any>();
  const [optionsState, setOptionsState] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (activeStep !== 0 && sections.length > 0) {
      executeGetQuestionsData(
        `http://10.77.77.22:8080/api/question-banks/section/${activeStep}/${
          sections[activeStep - 1]?.question_for_section
        }`,
        null
      );
    }
  }, [activeStep, sections]);

  const updateOptionsState = (selectedOption: any, index: number) => {
    optionsState[index] = {
      ...optionsState[index],
      ...selectedOption,
    };
    setOptionsState([...optionsState]);
  };

  return (
    <div className="flex flex-col">
      <Loading isLoading={questionsDataLoading} />

      {questionsData?.map((question: any, index: number) => {
        return (
          <ExamQuestions
            key={index}
            index={index + 1}
            question={question}
            updateOptionsState={updateOptionsState}
          />
        );
      })}
      <div className="mb-10 flex justify-center">
        <button
          ref={submitButtonRef}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-onPrimary hover:bg-primaryVariant hover:shadow"
          onClick={() => {
            if (activeStep === sectionLength) {
              handleSubmit(optionsState);
            } else {
              handleNext();
            }
          }}
        >
          {activeStep === sectionLength ? 'Submit' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default ExamStepDetails;
