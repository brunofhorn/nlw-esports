import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { IAppContext } from '../interfaces';

export function useApp(): IAppContext {
  const context = useContext(AppContext);

  return context;
}
