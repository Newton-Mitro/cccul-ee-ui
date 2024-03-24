interface TakenExamsProps {
  previousExams: any;
}

const TakenExams: React.FC<TakenExamsProps> = ({ previousExams }) => {
  return (
    <div className="my-6">
      <h1 className="text-xl font-bold">Previous Taken Exams</h1>
      <div className="flex items-center gap-6 rounded-lg border p-6">
        <table className="table-auto ">
          <thead>
            <tr className="">
              <th className="px-4">Exam Id</th>
              <th className="px-4">Exam Number</th>
              <th className="px-4">Employee Code</th>
              <th className="px-4">Total Question</th>
              <th className="px-4">Correct Answer</th>
              <th className="px-4">Wrong Answer</th>
            </tr>
          </thead>
          <tbody>
            {previousExams?.map((exam: any) => {
              return (
                <tr className="odd:bg-blue-gray-400/20">
                  <td className="px-4">{exam?.exam_id}</td>
                  <td className="px-4">{exam?.exam_num}</td>
                  <td className="px-4">{exam?.employee_code}</td>
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
  );
};

export default TakenExams;
