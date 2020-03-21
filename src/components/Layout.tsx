import React from 'react';

interface Props {
  noTitle?: boolean;
}

export const Layout: React.FC<Props> = ({ noTitle = false, children }) => {
  return (
    <div className="layout">
      {!noTitle && <h1 className="layout--title">Chandwazo</h1>}
      {children}
    </div>
  );
};
