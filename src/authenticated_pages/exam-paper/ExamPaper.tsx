import Loading from 'common/components/Loading';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import useQuery from 'common/hooks/useQuery';
import React, { useContext, useEffect } from 'react';
import ExamStepDetails from './components/ExamStepDetails';

function ExamPaper() {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = () => {};

  const {
    loading: currentExamDataLoading,
    data: currentExamData,
    setData: setCurrentExamData,
    error: currentExamError,
    setError: setCurrentExamError,
    executeQuery: executeGetCurrentExam,
  } = useQuery<any>();

  const {
    loading: sectionDataLoading,
    data: sectionData,
    setData: setSectionData,
    error: sectionError,
    setError: setSectionError,
    executeQuery: executeGetSectionData,
  } = useQuery<any>();

  useEffect(() => {
    executeGetCurrentExam('http://localhost:8000/api/active_exam', null);
    executeGetSectionData('http://localhost:8000/api/question-sections', null);
  }, []);

  return (
    <div className="container mx-auto">
      <Loading isLoading={currentExamDataLoading || sectionDataLoading} />
      <h1 className="p-5 text-center text-lg font-bold">Exam Paper</h1>

      <ExamStepDetails
        activeStep={activeStep}
        section={sectionData && sectionData[activeStep - 1]}
        sectionLength={sectionData?.length}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default ExamPaper;
