import * as React from 'react';

interface SingleOptionProps {
  index: any;
  option: any;
  updateOptionsState: any;
}

const SingleOption: React.FC<SingleOptionProps> = ({
  index,
  option,
  updateOptionsState,
}) => {
  return (
    <div className="space-x-4">
      <input
        type="radio"
        id={option?.question_bank_id + index}
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
