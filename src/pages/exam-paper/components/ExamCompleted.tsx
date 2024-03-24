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
      <div className="">{data}</div>,
      document.getElementById('portal')!
    );
  } else {
    return null;
  }
};
export default ExamCompleted;
