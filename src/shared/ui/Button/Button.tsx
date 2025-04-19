import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      style={{
        color: 'whitesmoke',
        backgroundColor: 'cadetblue',
        padding: '8px 8px',
        borderRadius: '8px',
      }}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
