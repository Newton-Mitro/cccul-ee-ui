import Loading from 'common/components/Loading';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import useQuery from 'common/hooks/useQuery';
import { useContext, useEffect } from 'react';
import ExamStepDetails from './components/ExamStepDetails';

function ExamPaper() {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const empExamId = Date.now();

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

  const {
    loading: examCountDataLoading,
    data: examCountData,
    setData: setExamCountData,
    error: examcountError,
    setError: setExamCountError,
    executeQuery: executeGetExamCount,
  } = useQuery<any>();

  useEffect(() => {
    if (currentExamData) {
      executeGetExamCount(
        `http://localhost:8000/api/employee-exams/count/${authUser?.EmployeeCode}/${currentExamData.id}`,
        null
      );
    }
  }, [currentExamData, authUser]);

  useEffect(() => {
    executeGetCurrentExam('http://localhost:8000/api/active_exam', null);
    executeGetSectionData('http://localhost:8000/api/question-sections', null);
  }, []);

  return (
    <div className="container mx-auto">
      <Loading
        isLoading={
          currentExamDataLoading || sectionDataLoading || examCountDataLoading
        }
      />
      <h1 className="pt-5 text-center text-3xl font-bold">Exam Paper</h1>
      {sectionData && authUser && examCountData && currentExamData && (
        <ExamStepDetails
          section={sectionData}
          sectionLength={sectionData?.length}
          employee_exam_id={empExamId}
          emp_code_exam_id_exam_num={`${authUser?.EmployeeCode}_${currentExamData?.id}_${examCountData?.count}`}
          exam_id={currentExamData?.id}
          employee_code={authUser?.EmployeeCode}
          exam_num={examCountData?.count}
          total_questions={10}
        />
      )}
    </div>
  );
}

export default ExamPaper;
