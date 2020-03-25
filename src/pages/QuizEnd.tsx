import React from 'react';
import { Layout } from 'components/Layout';
import { ReactComponent as Home } from 'icons/home.svg';
import { useSelector } from 'select';

export const QuizEnd = React.memo(() => {
  const setPage = useSelector(s => s.setPage);

  return (
    <Layout noTitle>
      <h2 className="end--congrat">Bravo !</h2>
      <button className="end--home" onClick={() => setPage('home')}>
        <Home />
      </button>
    </Layout>
  );
});
