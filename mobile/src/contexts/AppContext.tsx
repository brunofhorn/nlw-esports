import { createContext, useState } from 'react';
import { IAppContext, IAppProvider, IGames } from '../interfaces';

export const AppContext = createContext({} as IAppContext);

export function AppContextProvider({ children }: IAppProvider) {
  const [games, setGames] = useState<IGames[]>([]);
  const [isGamesLoading, setIsGamesLoading] = useState(true);

  return (
    <AppContext.Provider
      value={{ games, setGames, isGamesLoading, setIsGamesLoading }}
    >
      {children}
    </AppContext.Provider>
  );
}
