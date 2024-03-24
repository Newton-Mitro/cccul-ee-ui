import * as React from 'react';
import ExamOptions from './ExamOptions';

interface ExamQuestionsProps {
  index: number;
  question: any;
  updateOptionsState: any;
}

const ExamQuestions: React.FC<ExamQuestionsProps> = ({
  index,
  question,
  updateOptionsState,
}) => {
  return (
    <div className="flex flex-col ">
      <div className="py-4">
        <p>{`${index}. ${question.question_text}`}</p>

        <ExamOptions
          options={question?.question_options}
          updateOptionsState={updateOptionsState}
        />
      </div>
    </div>
  );
};

export default ExamQuestions;
