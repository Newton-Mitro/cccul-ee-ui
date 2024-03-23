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
      <div className="flex items-center gap-6 rounded-lg border p-6">
        <button
          disabled={canTakeExam}
          className={`rounded-md bg-primary px-4 py-2 text-onPrimary hover:bg-primaryVariant hover:shadow disabled:bg-blue-gray-400`}
          onClick={() => {
            navigate('/auth/exam-paper');
          }}
        >
          {`Take ${currentExam?.exam_title}`}
        </button>
      </div>
    </div>
  );
};

export default CurrentExam;
