import { useNavigate } from 'react-router-dom';

interface CurrentExamProps {
  currentExam: any;
  canTakeExam: boolean;
}

const CurrentExam: React.FC<CurrentExamProps> = ({
  currentExam,
  canTakeExam,
}) => {
  const navigate = useNavigate();
  return (
    <div className="my-6">
      <h1 className="text-xl font-bold">Ongoing Exam</h1>
      <div className="flex flex-col gap-6 rounded-lg border p-6">
        <div>
          <h2 className="text-2xl">Exam Instructions:</h2>
          <ul>
            <li>
              Please, Complete current step before going to next step. You won't
              be able to go pervious step.
            </li>
            <li>You must complete the test within given time.</li>
            <li>Please logout the application after completing the exam.</li>
          </ul>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <button
            disabled={canTakeExam}
            className={`inline-block rounded-md bg-primary px-4 py-2 text-onPrimary hover:bg-primaryVariant hover:shadow disabled:bg-blue-gray-400`}
            onClick={() => {
              navigate('/auth/exam-paper');
            }}
          >
            {`Take ${currentExam?.exam_title}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentExam;
