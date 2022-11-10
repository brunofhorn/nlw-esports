import { createContext, useState } from 'react';
import {
  IAppContext,
  IAppProvider,
  IGames,
  IGamesFormated,
} from '../interfaces';

export const AppContext = createContext({} as IAppContext);

export function AppContextProvider({ children }: IAppProvider) {
  const [games, setGames] = useState<IGames[]>([]);
  const [gamesFormated, setGamesFormated] = useState<IGamesFormated[]>([]);
  const [isGamesLoading, setIsGamesLoading] = useState(true);
  const [gameSelected, setGameSelected] = useState<IGamesFormated>(
    {} as IGamesFormated
  );

  return (
    <AppContext.Provider
      value={{
        games,
        setGames,
        isGamesLoading,
        setIsGamesLoading,
        gamesFormated,
        setGamesFormated,
        gameSelected,
        setGameSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
