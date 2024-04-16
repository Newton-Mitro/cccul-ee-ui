import Loading from 'common/components/Loading';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import useCommand2 from 'common/hooks/useCommand2';
import useQuery from 'common/hooks/useQuery';
import React, { useContext, useEffect } from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import ExamCompleted from './components/ExamCompleted';
import ExamStepDetails from './components/ExamStepDetails';

function ExamPaper() {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const submitButtonRef = React.useRef<any>(null);
  const empExamId = Date.now();
  const [activeStep, setActiveStep] = React.useState(1);
  const navigate = useNavigate();

  const handleSubmitClick = React.useCallback(
    () => submitButtonRef.current?.click(),
    []
  );

  const {
    loading: currentExamDataLoading,
    data: currentExamData,
    setData: setCurrentExamData,
    executeQuery: executeGetCurrentExam,
  } = useQuery<any>();

  const {
    loading: sectionDataLoading,
    data: sectionData,
    setData: setSectionData,
    executeQuery: executeGetSectionData,
  } = useQuery<any>();

  const {
    loading: examCountDataLoading,
    data: examCountData,
    setData: setExamCountData,
    executeQuery: executeGetExamCount,
  } = useQuery<any>();

  const { data, setData, loading, executeCommand } = useCommand2<any>();

  console.log(data);

  let question_for_sections = 0;
  if (sectionData) {
    sectionData?.forEach((element: any) => {
      if (element !== undefined) {
        question_for_sections =
          question_for_sections + element.question_for_section;
      }
    });
  }

  useEffect(() => {
    if (currentExamData) {
      executeGetExamCount(
        `http://10.77.77.22:8080/api/employee-exams/count/${authUser?.EmployeeCode}/${currentExamData.id}`,
        null
      );
    }
  }, [currentExamData, authUser]);

  useEffect(() => {
    executeGetCurrentExam('http://10.77.77.22:8080/api/active_exam', null);
    executeGetSectionData(
      'http://10.77.77.22:8080/api/question-sections',
      null
    );
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = (optionsState: any) => {
    console.log(optionsState);

    let totalCorrectAns = 0;
    optionsState?.forEach((element: any) => {
      if (element) {
        if (element.is_correct) {
          totalCorrectAns = totalCorrectAns + 1;
        }
      }
    });

    const mappedValues = optionsState.map((option: any) => {
      if (option !== undefined) {
        return {
          employee_code: authUser?.EmployeeCode,
          employee_exam_id: empExamId,
          exam_id: currentExamData?.id,
          question_bank_id: option?.question_bank_id,
          question_option_id: option?.id,
          option_text: option?.option_text,
          is_correct: option?.is_correct,
        };
      }
    });

    const application = {
      id: empExamId,
      emp_code_exam_id_exam_num: `${authUser?.EmployeeCode}_${currentExamData?.id}_${examCountData?.count}`,
      exam_id: currentExamData?.id,
      name: authUser?.UserName,
      employee_code: authUser?.EmployeeCode,
      exam_num: examCountData?.count,
      total_questions: question_for_sections,
      correct_answers: totalCorrectAns,
      wrong_answers: question_for_sections - totalCorrectAns,
      submitted_answers: mappedValues?.filter(
        (option: any) => option !== undefined
      ),
    };

    console.log(application);

    executeCommand(
      'http://10.77.77.22:8080/api/answer-sheets',
      JSON.stringify(application),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  return (
    <div className="container mx-auto">
      <Loading
        isLoading={
          currentExamDataLoading ||
          sectionDataLoading ||
          examCountDataLoading ||
          loading
        }
      />

      <ExamCompleted
        isOpen={data ? true : false}
        data={data}
        handleClose={() => {
          setData(null);
          navigate('/auth/home');
        }}
      />
      <h1 className="pt-5 text-center text-3xl font-bold">Exam Paper</h1>
      <div className="pb-4 text-center">
        <h1 className="text-center text-xl">
          {sectionData ? sectionData[activeStep - 1]?.section_title : ''}
        </h1>
        {sectionData &&
          (activeStep % 2 === 0 ? (
            <Countdown
              date={Date.now() + sectionData[activeStep - 1]?.time_for_section}
              className="text-2xl font-bold text-red-900"
              onTick={(timeObj) => {
                if (timeObj.total === 1000) {
                  if (activeStep === 2) {
                    handleSubmitClick();
                  } else {
                    handleNext();
                  }
                }
              }}
              onComplete={(obj) => {}}
            />
          ) : (
            <Countdown
              date={Date.now() + sectionData[activeStep - 1]?.time_for_section}
              className="text-2xl font-bold text-red-900"
              onTick={(timeObj) => {
                if (timeObj.total === 1000) {
                  if (activeStep === 2) {
                    handleSubmitClick();
                  } else {
                    handleNext();
                  }
                }
              }}
              onComplete={(obj) => {}}
            />
          ))}
      </div>

      {sectionData && authUser && examCountData && currentExamData && (
        <ExamStepDetails
          handleSubmit={(optionsState: any) => {
            handleSubmit(optionsState);
          }}
          handleNext={handleNext}
          activeStep={activeStep}
          sections={sectionData}
          sectionLength={sectionData?.length}
          submitButtonRef={submitButtonRef}
        />
      )}
    </div>
  );
}

export default ExamPaper;
