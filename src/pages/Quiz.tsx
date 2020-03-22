import React from 'react';
import { Layout } from 'components/Layout';
import { ReactComponent as ChevronLeft } from 'icons/chevron-left.svg';
import { useSelector } from 'select';

export const Quiz = React.memo(() => {
  const setPage = useSelector(s => s.setPage);

  return (
    <Layout noTitle>
      <button
        className="list--back"
        style={{
          backgroundImage: `linear-gradient(315deg, #9fa4c4 0%, #9e768f 74%)`
        }}
        onClick={() => setPage('home')}
      >
        <ChevronLeft />
        <span>Retour</span>
      </button>
      <p>Todo</p>
    </Layout>
  );
});
