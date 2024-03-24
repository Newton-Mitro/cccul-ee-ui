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
          <div className="">
            <SingleOption
              key={option?.question_bank_id}
              option={option}
              updateOptionsState={updateOptionsState}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ExamOptions;
