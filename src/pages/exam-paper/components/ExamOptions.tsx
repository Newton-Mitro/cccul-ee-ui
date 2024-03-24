import * as React from 'react';

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
          <div className="space-x-4">
            <input
              type="radio"
              id={option?.question_bank_id}
              name={option?.question_bank_id}
              value={option?.question_bank_id}
              onChange={() => {
                updateOptionsState(option, option?.question_bank_id);
                console.log(option);
              }}
            />
            <label htmlFor="Choice1">{option?.option_text}</label>
          </div>
        );
      })}
    </div>
  );
};

export default ExamOptions;
