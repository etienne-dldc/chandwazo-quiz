import React from 'react';
import { Layout } from 'components/Layout';
import { checkAnswer, extractMainWords } from 'utils/checkAnswer';
import { useSelectorOrThrow } from 'hooks/useSelectOrThrow';
import { useSelector } from 'select';
import { ReactComponent as Play } from 'icons/play.svg';
import { ReactComponent as Pause } from 'icons/pause.svg';
import { ReactComponent as Loader } from 'icons/loader.svg';
import { ReactComponent as Help } from 'icons/help-circle.svg';
import { ReactComponent as Check } from 'icons/check.svg';
import { ReactComponent as SkipForward } from 'icons/skip-forward.svg';

export const QuizPlayer = React.memo(() => {
  const [input, setInput] = React.useState('');
  const answer = useSelectorOrThrow(s => s.quiz.answer);
  const progress = useSelectorOrThrow(s => s.quiz.progress);
  const playing = useSelector(s => s.playing);
  const playingIsLoading = useSelector(s => s.playingIsLoading);
  const stopPlaying = useSelector(s => s.stopPlaying);
  const playCurrent = useSelector(s => s.quiz.playCurrent);
  const playNextInternal = useSelector(s => s.quiz.playNext);

  const playNext = React.useCallback(() => {
    playNextInternal();
    setInput('');
  }, [playNextInternal]);

  const result = checkAnswer(answer, input);
  const foundSome = result.some(v => v !== null);
  const foundAll = result.every(v => v !== null);
  const isPaused = playing === null;

  return (
    <Layout noTitle>
      <h2 className="player--title">
        {progress.current} / {progress.total}
      </h2>
      <div className="player--controls">
        {playingIsLoading ? (
          <button onClick={stopPlaying} className="player--play-pause">
            <Loader />
          </button>
        ) : isPaused ? (
          <button onClick={playCurrent} className="player--play-pause">
            <Play />
          </button>
        ) : (
          <button onClick={stopPlaying} className="player--play-pause">
            <Pause />
          </button>
        )}
        {foundAll ? (
          <button onClick={playNext} className="player--next">
            <SkipForward />
          </button>
        ) : (
          <button
            onClick={() => {
              if (foundSome) {
                setInput(answer);
              } else {
                // only set the forst part
                setInput(extractMainWords(answer)[0]);
              }
            }}
            className="player--help"
          >
            <Help />
          </button>
        )}
      </div>
      <div className="player--text-container">
        {foundAll ? (
          <p className="player--text player--success">
            <Check />
            {answer}
          </p>
        ) : foundSome ? (
          <p className="player--text player--partial">
            {result.map((v, i) =>
              v === null ? (
                <span key={i} className="player--box">
                  ?
                </span>
              ) : (
                <span key={i} className="player--box">
                  {v}
                </span>
              )
            )}
          </p>
        ) : (
          <p className="player--text">Quel est cet oiseau ?</p>
        )}
      </div>
      <div className="player--answer">
        <input
          value={input}
          placeholder="votre réponse"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && foundAll) {
              playNext();
            }
          }}
        />
      </div>
    </Layout>
  );
});
