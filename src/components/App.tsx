import React from 'react';
import { Howl } from 'howler';

interface BirdsFiles {
  [key: string]: string;
}

export const App: React.FC = () => {
  const [birds, setBirds] = React.useState<null | BirdsFiles>(null);

  React.useEffect(() => {
    fetch('/birds.json')
      .then(res => res.json())
      .then(data => {
        setBirds(data);
      });
  }, []);

  if (birds === null) {
    return null;
  }

  console.log(birds);

  return <div>Hello React</div>;
};

const sound = new Howl({
  src: ['http://birds.etiennedeladonchamps.fr/01_01.webm']
});

console.log(sound);

sound.play();
