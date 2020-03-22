import React from 'react';
import { Layout } from 'components/Layout';
import { ReactComponent as Award } from 'icons/award.svg';
import { ReactComponent as Coffee } from 'icons/coffee.svg';
import { ReactComponent as Book } from 'icons/book.svg';
import { ReactComponent as Settings } from 'icons/settings.svg';
import { useSelector } from 'select';

export const Home: React.FC = () => {
  const setPage = useSelector(s => s.setPage);

  return (
    <Layout>
      <button type="button" className="home--nav-btn" onClick={() => setPage('quiz')}>
        <Award />
        <span>Quiz</span>
      </button>
      <button
        type="button"
        className="home--nav-btn"
        style={{
          backgroundImage: `linear-gradient(315deg, #9fa4c4 0%, #9e768f 74%)`
        }}
      >
        <Coffee />
        <span>Entraînement</span>
      </button>
      <button
        type="button"
        className="home--nav-btn"
        style={{
          backgroundImage: `linear-gradient(45deg, #2a2a72 0%, #009ffd 74%)`
        }}
        onClick={() => setPage('list')}
      >
        <Book />
        <span>Liste des chants</span>
      </button>
      <button
        type="button"
        className="home--nav-btn"
        style={{
          backgroundImage: `linear-gradient(45deg, rgb(155, 151, 197) 0%, rgb(38, 211, 255) 74%)`
        }}
      >
        <Settings />
        <span>Paramètres</span>
      </button>
    </Layout>
  );
};
