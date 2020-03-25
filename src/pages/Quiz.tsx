import React from 'react';
import { QuizConfig } from './QuizConfig';
import { QuizPlayer } from './QuizPlayer';
import { QuizEnd } from './QuizEnd';
import { useSelector } from 'select';

export const Quiz = React.memo(() => {
  const queue = useSelector(s => s.quiz.queue);
  const done = useSelector(s => s.quiz.done);

  if (queue === null) {
    return <QuizConfig />;
  }
  if (done) {
    return <QuizEnd />;
  }
  return <QuizPlayer />;
});
