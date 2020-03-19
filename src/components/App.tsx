import React from 'react';

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
  });

  if (birds === null) {
    return null;
  }

  console.log(birds);
  s;

  return <div>Hello React</div>;
};
