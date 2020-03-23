import React from 'react';
import { Layout } from 'components/Layout';
import { checkAnswer } from 'utils/checkAnswer';
import { useSelectorOrThrow } from 'hooks/useSelectOrThrow';
import { useSelector } from 'select';
import { ReactComponent as Play } from 'icons/play.svg';
import { ReactComponent as Pause } from 'icons/pause.svg';
import { ReactComponent as Loader } from 'icons/loader.svg';

export const QuizPlayer = React.memo(() => {
  const [input, setInput] = React.useState('');
  const answer = useSelectorOrThrow(s => s.quiz.answer);
  const playing = useSelector(s => s.playing);
  const playingIsLoading = useSelector(s => s.playingIsLoading);

  const result = checkAnswer(answer, input);
  const foundSome = result.some(v => v !== null);
  const foundAll = result.every(v => v !== null);
  const isPaused = playing === null;

  return (
    <Layout noTitle>
      <div className="player--controls">
        {playingIsLoading ? (
          <button>
            <Loader />
          </button>
        ) : isPaused ? (
          <button>
            <Play />
          </button>
        ) : (
          <button>
            <Pause />
          </button>
        )}
      </div>
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
