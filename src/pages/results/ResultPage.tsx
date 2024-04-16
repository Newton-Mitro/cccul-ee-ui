import Loading from 'common/components/Loading';
import useQuery from 'common/hooks/useQuery';
import { useEffect } from 'react';

function ResultPage() {
  const {
    loading: perviousExamDataLoading,
    data: perviousExamData,
    setData: setPreviousExamData,
    error: perviousExamError,
    setError: setPreviousExamError,
    executeQuery: executeGetPreviousExam,
  } = useQuery<any>();

  useEffect(() => {
    executeGetPreviousExam('http://10.77.77.22:8080/api/employee-exams', null);
  }, []);

  return (
    <div className="container mx-auto">
      <Loading isLoading={perviousExamDataLoading} />
      <div className="my-6">
        <h1 className="mb-6 text-2xl font-bold">Exam Result</h1>
        <div className="flex items-center">
          <table className="table-auto ">
            <thead>
              <tr className="">
                <th className="px-4">Exam Id</th>
                <th className="px-4">Exam Number</th>
                <th className="px-4">Employee Code</th>
                <th className="px-4">Employee Name</th>
                <th className="px-4">Total Question</th>
                <th className="px-4">Correct Answer</th>
                <th className="px-4">Wrong Answer</th>
              </tr>
            </thead>
            <tbody>
              {perviousExamData?.map((exam: any) => {
                return (
                  <tr className="odd:bg-blue-gray-400/20">
                    <td className="px-4">{exam?.exam_id}</td>
                    <td className="px-4">{exam?.exam_num}</td>
                    <td className="px-4">{exam?.employee_code}</td>
                    <td className="px-4">{exam?.name}</td>
                    <td className="px-4">{exam?.total_questions}</td>
                    <td className="px-4">{exam?.correct_answers}</td>
                    <td className="px-4">{exam?.wrong_answers}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
