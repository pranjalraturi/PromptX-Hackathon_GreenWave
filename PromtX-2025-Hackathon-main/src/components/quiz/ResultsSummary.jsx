import React from 'react';

const ResultsSummary = ({ score, totalQuestions }) => {
  return (
    <div className="results-summary">
      <h2>Quiz Results</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <p>
        {score / totalQuestions >= 0.5
          ? 'Great job! You passed the quiz.'
          : 'Keep trying! You can do it!'}
      </p>
    </div>
  );
};

export default ResultsSummary;