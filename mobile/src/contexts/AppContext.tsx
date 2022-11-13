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

  const refreshAds = (gameId: string) => {
    const refreshGames: IGames[] = games.map((game: IGames) => {
      if (game.id === gameId) {
        game._count.ads += 1;
      }

      return game;
    });

    setGames(refreshGames as IGames[]);
  };

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
        refreshAds,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
