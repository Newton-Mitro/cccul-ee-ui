import Loading from 'common/components/Loading';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import useQuery from 'common/hooks/useQuery';
import { useContext, useEffect } from 'react';
import CurrentExam from './components/CurrentExam';
import TakenExams from './components/TakenExams';
import UserProfile from './components/UserProfile';

function HomePage() {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

  const {
    loading: currentExamDataLoading,
    data: currentExamData,
    setData: setCurrentExamData,
    error: currentExamError,
    setError: setCurrentExamError,
    executeQuery: executeGetCurrentExam,
  } = useQuery<any>();

  const {
    loading: perviousExamDataLoading,
    data: perviousExamData,
    setData: setPreviousExamData,
    error: perviousExamError,
    setError: setPreviousExamError,
    executeQuery: executeGetPreviousExam,
  } = useQuery<any>();

  const {
    loading: examCountDataLoading,
    data: examCountData,
    setData: setExamCountData,
    error: examcountError,
    setError: setExamCountError,
    executeQuery: executeGetExamCount,
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

  useEffect(() => {
    if (currentExamData) {
      executeGetExamCount(
        `http://localhost:8000/api/employee-exams/count/${authUser?.EmployeeCode}/${currentExamData.id}`,
        null
      );

      executeGetPreviousExam(
        `http://localhost:8000/api/employee-exams/${authUser?.EmployeeCode}`,
        null
      );
    }
  }, [currentExamData, authUser]);

  return (
    <div className="container mx-auto">
      <Loading
        isLoading={
          currentExamDataLoading ||
          sectionDataLoading ||
          examCountDataLoading ||
          perviousExamDataLoading
        }
      />
      <UserProfile user={authUser} />
      {perviousExamData && perviousExamData.length > 0 && (
        <TakenExams previousExams={perviousExamData} />
      )}

      <CurrentExam
        currentExam={currentExamData}
        canTakeExam={
          examCountData?.count <= currentExamData?.max_exam_can_take
            ? false
            : true
        }
      />
    </div>
  );
}

export default HomePage;
