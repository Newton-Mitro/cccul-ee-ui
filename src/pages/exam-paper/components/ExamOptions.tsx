import * as React from 'react';
import SingleOption from './SingleOption';

interface ExamOptionsProps {
  options: any;
  updateOptionsState: any;
}

const ExamOptions: React.FC<ExamOptionsProps> = ({
  options,
  updateOptionsState,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {options?.map((option: any, index: number) => {
        return (
          <SingleOption
            key={option?.question_bank_id + index}
            index={index}
            option={option}
            updateOptionsState={updateOptionsState}
          />
        );
      })}
    </div>
  );
};

export default ExamOptions;
