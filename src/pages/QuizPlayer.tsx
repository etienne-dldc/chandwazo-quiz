import React from 'react';
import { Layout } from 'components/Layout';
import { checkAnswer } from 'utils/checkAnswer';
import { useSelectorOrThrow } from 'hooks/useSelectOrThrow';

export const QuizPlayer = React.memo(() => {
  const [input, setInput] = React.useState('');
  const answer = useSelectorOrThrow(s => s.quiz.answer);

  const result = checkAnswer(answer, input);
  const foundSome = result.some(v => v !== null);
  const foundAll = result.every(v => v !== null);

  return (
    <Layout noTitle>
      <div className="player--answer">
        <input value={input} placeholder="votre réponse" onChange={e => setInput(e.target.value)} />
      </div>
      {foundAll ? (
        <p>{answer}</p>
      ) : foundSome ? (
        <p>{result.map(v => (v === null ? '?' : v)).join(' ')}</p>
      ) : null}
      {}
    </Layout>
  );
});
