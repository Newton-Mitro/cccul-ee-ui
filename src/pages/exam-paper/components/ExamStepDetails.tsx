import Loading from 'common/components/Loading';
import useCommand2 from 'common/hooks/useCommand2';
import useQuery from 'common/hooks/useQuery';
import * as React from 'react';
import ExamCompleted from './ExamCompleted';
import ExamQuestions from './ExamQuestions';

interface ExamStepDetailsProps {
  section: any;
  sectionLength: number;
  employee_exam_id: number;
  emp_code_exam_id_exam_num: any;
  exam_id: number;
  employee_code: any;
  exam_num: number;
  total_questions: number;
  optionsState: any;
  updateOptionsState: any;
}

const ExamStepDetails: React.FC<ExamStepDetailsProps> = ({
  section,
  sectionLength,
  employee_exam_id,
  emp_code_exam_id_exam_num,
  exam_id,
  employee_code,
  exam_num,
  total_questions,
  optionsState,
  updateOptionsState,
}) => {
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const { data, status, setData, loading, error, setError, executeCommand } =
    useCommand2<any>();

  console.log(status);
  console.log(data);

  const handleSubmit = () => {
    const mappedValues = optionsState.map((option: any) => {
      if (option !== undefined) {
        return {
          employee_code: employee_code,
          employee_exam_id: employee_exam_id,
          exam_id: exam_id,
          question_bank_id: option?.question_bank_id,
          question_option_id: option?.id,
          option_text: option?.option_text,
          is_correct: true,
        };
      }
    });
    const application = {
      employee_exam_id: employee_exam_id,
      emp_code_exam_id_exam_num: emp_code_exam_id_exam_num,
      exam_id: exam_id,
      employee_code: employee_code,
      exam_num: exam_num,
      total_questions: total_questions,
      correct_answers: 1,
      wrong_answers: 9,
      submitted_answers: mappedValues.filter(
        (option: any) => option !== undefined
      ),
    };

    executeCommand(
      'http://172.16.0.3:8080/api/answer-sheets',
      JSON.stringify(application),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const {
    loading: questionsDataLoading,
    data: questionsData,
    setData: setQuestionsData,
    error: questionsError,
    setError: setQuestionsError,
    executeQuery: executeGetQuestionsData,
  } = useQuery<any>();

  React.useEffect(() => {
    if (activeStep !== 0) {
      executeGetQuestionsData(
        `http://172.16.0.3:8080/api/question-banks/section/${activeStep}/5`,
        null
      );
    }
  }, [activeStep]);

  return (
    <div className="flex flex-col">
      <Loading isLoading={loading || questionsDataLoading} />
      <ExamCompleted
        isOpen={data ? true : false}
        data={data}
        handleClose={() => {
          setData(null);
        }}
      />
      <h1 className="pb-4 text-center text-xl">{section?.section_title}</h1>
      {questionsData?.map((question: any, index: number) => {
        return (
          <div className="" key={index}>
            <ExamQuestions
              index={index + 1}
              question={question}
              updateOptionsState={updateOptionsState}
            />
          </div>
        );
      })}
      <div className="mb-10 flex justify-center">
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
    </div>
  );
};

export default ExamStepDetails;
