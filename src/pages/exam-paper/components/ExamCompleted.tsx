import { FC } from 'react';
import ReactDOM from 'react-dom';

interface LoadingProps {
  isOpen: boolean;
  data: any;
  handleClose: any;
}
const ExamCompleted: FC<LoadingProps> = ({ isOpen, data, handleClose }) => {
  if (isOpen) {
    return ReactDOM.createPortal(
      <div
        className={`fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gray-900 bg-opacity-50 text-onSurface backdrop-blur-sm`}
      >
        <div className="w-6/12 rounded-md bg-white px-5 py-10">
          <div className="flex justify-between">
            <div className=""></div>
            <h1 className="text-2xl font-bold">Exam Result</h1>
            <button
              className="w-6  hover:scale-150 hover:text-error"
              onClick={() => handleClose()}
            >
              <i className="fa-solid fa-xmark text-3xl"></i>
            </button>
          </div>
          <div className="text-center">
            <p>Employee Code: {data?.employee_code}</p>
            <p>Total Question: {data?.total_questions}</p>
            <p>Correct Answer: {data?.correct_answers}</p>
            <p>Wrong Answer: {data?.wrong_answers}</p>
          </div>
        </div>
      </div>,
      document.getElementById('portal')!
    );
  } else {
    return null;
  }
};
export default ExamCompleted;
