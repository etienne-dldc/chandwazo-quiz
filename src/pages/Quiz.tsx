import React from 'react';
import { QuizConfig } from './QuizConfig';
import { QuizPlayer } from './QuizPlayer';
import { useSelector } from 'select';

export const Quiz = React.memo(() => {
  const queue = useSelector(s => s.quiz.queue);

  if (queue === null) {
    return <QuizConfig />;
  }
  return <QuizPlayer />;
});
