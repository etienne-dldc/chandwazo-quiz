import React from 'react';
import { Layout } from 'components/Layout';
import { ReactComponent as Home } from 'icons/home.svg';
import { useSelector } from 'select';

export const QuizEnd = React.memo(() => {
  const endQuiz = useSelector(s => s.quiz.endQuiz);

  return (
    <Layout noTitle>
      <h2 className="end--congrat">Bravo !</h2>
      <button className="end--home" onClick={endQuiz}>
        <Home />
      </button>
    </Layout>
  );
});
