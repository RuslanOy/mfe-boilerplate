import React, { useState } from 'react';
import { Button } from 'shared/ui/Button/Button';

// if its host app use this imports, if not just delete
// const Header = React.lazy(() => import('header/Header'));
// const Footer = React.lazy(() => import('footer/Footer'));

export const Main = (): React.JSX.Element => {
  const [state, setState] = useState<number>(0);
  const handleIncrementCount = () => {
    setState(state + 1);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      Main component
      <span>{state}</span>
      <Button onClick={handleIncrementCount}>hello</Button>
    </div>
  );
};
