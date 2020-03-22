import React from 'react';
import { Layout } from './Layout';
import { Home } from 'pages/Home';
import { List } from 'pages/List';
import { Quiz } from 'pages/Quiz';
import { useSelector } from 'select';
import { Page } from 'store/AppStore';

const PAGES: { [K in Page]: React.ComponentType } = {
  home: Home,
  list: List,
  quiz: Quiz
};

export const App: React.FC = () => {
  const page = useSelector(s => s.page);
  const birds = useSelector(s => s.birds);

  if (!birds) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  const Comp = PAGES[page];

  return <Comp />;
};

// console.log(sound);

// sound.play();
