import React from 'react';

interface Props {
  title?: string;
}

export const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="App">
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
};
