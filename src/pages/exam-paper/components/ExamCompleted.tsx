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
      <div className="">
        <h1 className="text-2xl font-bold">Exam Result</h1>
        <p>{data?.employee_code}</p>
        <p>{data?.total_questions}</p>
        <p>{data?.correct_answers}</p>
        <p>{data?.wrong_answers}</p>
      </div>,
      document.getElementById('portal')!
    );
  } else {
    return null;
  }
};
export default ExamCompleted;
