import React from 'react';
import { Layout } from './Layout';
import { App, BirdsFiles } from './App';
// import { checkAnswer } from '../utils/checkAnswer';

export const Root: React.FC = () => {
  const [birds, setBirds] = React.useState<null | BirdsFiles>(null);

  React.useEffect(() => {
    fetch('/birds.json')
      .then(res => res.json())
      .then(data => {
        // Object.values<string>(data).forEach(name => checkAnswer(name, ''));
        setBirds(data);
      });
  }, []);

  if (birds === null) {
    return (
      <Layout title="Chandwazo">
        <p>Loading...</p>
      </Layout>
    );
  }

  return <App birds={birds} />;
};
