import Loading from 'common/components/Loading';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import useCommand2 from 'common/hooks/useCommand2';
import useQuery from 'common/hooks/useQuery';
import * as React from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import ExamCompleted from './ExamCompleted';
import ExamQuestions from './ExamQuestions';

interface ExamStepDetailsProps {
  sections: any;
  sectionLength: number;
  employee_exam_id: number;
  emp_code_exam_id_exam_num: any;
  exam_id: number;
  employee_code: any;
  exam_num: number;
  total_questions: number;
}

const ExamStepDetails: React.FC<ExamStepDetailsProps> = ({
  sections,
  sectionLength,
  employee_exam_id,
  emp_code_exam_id_exam_num,
  exam_id,
  employee_code,
  exam_num,
  total_questions,
}) => {
  const [activeStep, setActiveStep] = React.useState(1);
  const navigate = useNavigate();
  const { authUser } = React.useContext(AuthUserContext) as AuthUserContextType;
  const [optionsState, setOptionsState] = React.useState<any[]>([]);

  const updateOptionsState = (selectedOption: any, index: number) => {
    optionsState[index] = {
      ...optionsState[index],
      ...selectedOption,
    };
    setOptionsState([...optionsState]);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const { data, status, setData, loading, error, setError, executeCommand } =
    useCommand2<any>();

  const handleSubmit = () => {
    let totalCorrectAns = 0;
    optionsState?.forEach((element: any) => {
      if (element !== undefined) {
        if (element?.is_correct) {
          totalCorrectAns = totalCorrectAns + 1;
        }
      }
    });

    const mappedValues = optionsState.map((option: any) => {
      if (option !== undefined) {
        return {
          employee_code: employee_code,
          employee_exam_id: employee_exam_id,
          exam_id: exam_id,
          question_bank_id: option?.question_bank_id,
          question_option_id: option?.id,
          option_text: option?.option_text,
          is_correct: option?.is_correct,
        };
      }
    });

    const application = {
      id: employee_exam_id,
      emp_code_exam_id_exam_num: emp_code_exam_id_exam_num,
      exam_id: exam_id,
      name: authUser?.UserName,
      employee_code: employee_code,
      exam_num: exam_num,
      total_questions: total_questions,
      correct_answers: totalCorrectAns,
      wrong_answers: total_questions - totalCorrectAns,
      submitted_answers: mappedValues.filter(
        (option: any) => option !== undefined
      ),
    };

    executeCommand(
      'http://localhost:8000/api/answer-sheets',
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
    if (activeStep !== 0 && sections.length > 0) {
      executeGetQuestionsData(
        `http://localhost:8000/api/question-banks/section/${activeStep}/${
          sections[activeStep - 1]?.question_for_section
        }`,
        null
      );
    }
  }, [activeStep, sections]);

  return (
    <div className="flex flex-col">
      <Loading isLoading={loading || questionsDataLoading} />
      <ExamCompleted
        isOpen={data ? true : false}
        data={data}
        handleClose={() => {
          setData(null);
          navigate('/auth/home');
        }}
      />
      <div className="pb-4 text-center">
        <h1 className="text-center text-xl">
          {sections[activeStep - 1].section_title}
        </h1>

        {activeStep % 2 === 0 ? (
          <Countdown
            date={Date.now() + sections[activeStep - 1].time_for_section}
            className="text-2xl font-bold text-red-900"
            onTick={(timeObj) => {
              if (timeObj.seconds === 1) {
                if (activeStep === sectionLength) {
                  handleSubmit();
                } else {
                  handleNext();
                }
              }
            }}
            onComplete={(obj) => {}}
          />
        ) : (
          <Countdown
            date={Date.now() + sections[activeStep - 1].time_for_section}
            className="text-2xl font-bold text-red-900"
            onTick={(timeObj) => {
              if (timeObj.seconds === 1) {
                if (activeStep === sectionLength) {
                  handleSubmit();
                } else {
                  handleNext();
                }
              }
            }}
            onComplete={(obj) => {}}
          />
        )}
      </div>

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
