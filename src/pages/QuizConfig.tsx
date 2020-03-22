import React from 'react';
import { Layout } from 'components/Layout';
import { ReactComponent as ChevronLeft } from 'icons/chevron-left.svg';
import { ReactComponent as Play } from 'icons/play.svg';
import { ReactComponent as PlusCircle } from 'icons/plus-circle.svg';
import { ReactComponent as MinusCircle } from 'icons/minus-circle.svg';
import { useSelector } from 'select';
import { useSelectorOrThrow } from 'hooks/useSelectOrThrow';

export const QuizConfig = React.memo(() => {
  const setPage = useSelector(s => s.setPage);
  const quiz = useSelectorOrThrow(s => s.quiz);
  const selectedSize = useSelectorOrThrow(s => s.selected.length);

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
      {selectedSize === 0 ? (
        <div className="quiz--empty">
          <p>Aucuns chants sélectionnés</p>
        </div>
      ) : (
        <>
          <p className="quiz--label">Nombre de chants</p>
          <div className="quiz--control">
            <button className="quiz--plus-minus" onClick={quiz.decrementSize}>
              <MinusCircle />
            </button>
            <span className="quiz--size">{quiz.size}</span>
            <button className="quiz--plus-minus" onClick={quiz.incrementSize}>
              <PlusCircle />
            </button>
            <span className="quiz--space"></span>
            {quiz.size !== selectedSize && (
              <button className="quiz--max-size" onClick={() => quiz.setSize(selectedSize)}>
                Tous ({selectedSize})
              </button>
            )}
          </div>
          <button onClick={quiz.start} className="quiz--start">
            <Play />
          </button>
        </>
      )}
    </Layout>
  );
});
