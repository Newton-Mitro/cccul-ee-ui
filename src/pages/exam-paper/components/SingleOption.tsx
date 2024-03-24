import * as React from 'react';

interface SingleOptionProps {
  option: any;
  updateOptionsState: any;
}

const SingleOption: React.FC<SingleOptionProps> = ({
  option,
  updateOptionsState,
}) => {
  return (
    <div className="space-x-4">
      <input
        type="radio"
        id={option?.question_bank_id}
        name={option?.question_bank_id}
        onChange={() => {
          updateOptionsState(option, option?.question_bank_id);
          console.log(option);
        }}
      />
      <label htmlFor="Choice1">{option?.option_text}</label>
    </div>
  );
};

export default SingleOption;
