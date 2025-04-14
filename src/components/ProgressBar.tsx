
import React from 'react';

interface ProgressBarProps {
  progress: number;
  currentQuestion?: number;
  totalQuestions?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  currentQuestion, 
  totalQuestions 
}) => {
  const showCounter = currentQuestion !== undefined && totalQuestions !== undefined;
  
  return (
    <div className="flex flex-col w-full">
      {showCounter && (
        <div className="flex justify-between text-sm mb-1 px-1">
          <span className="text-muted-foreground">Pytanie {currentQuestion} z {totalQuestions}</span>
          <span className="text-primary font-medium">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="progress-bar w-full">
        <div 
          className="progress-bar-inner" 
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
