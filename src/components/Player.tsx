import React from 'react';
import { Howl } from 'howler';
import { checkAnswer } from 'utils/checkAnswer';

interface Props {
  songId: string;
  answer: string;
}

export const Player: React.FC<Props> = ({ answer, songId }) => {
  const [input, setInput] = React.useState('');

  const result = checkAnswer(answer, input);

  console.log(result);

  const [howl] = React.useState(() => {
    const song = new Howl({
      src: [`http://birds.etiennedeladonchamps.fr/${songId}.webm`]
    });
    // song.play();
    return song;
  });

  React.useEffect(() => {
    return () => {
      howl.unload();
    };
  }, [howl]);

  return (
    <>
      <div className="answer">
        <input value={input} placeholder="votre réponse" onChange={e => setInput(e.target.value)} />
      </div>
      <p>{answer}</p>
      <p>{result.map(v => (v === null ? '?' : v)).join(' ')}</p>
    </>
  );
};
