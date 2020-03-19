import React from 'react';
import { Layout } from './Layout';
import { App, BirdsFiles } from './App';

export const Root: React.FC = () => {
  const [birds, setBirds] = React.useState<null | BirdsFiles>(null);

  React.useEffect(() => {
    fetch('/birds.json')
      .then(res => res.json())
      .then(data => {
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
