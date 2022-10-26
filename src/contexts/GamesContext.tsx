import { IGame } from '@interfaces/index';
import { createContext, ReactNode, useState } from 'react';

type GameContextProps = {
  children: ReactNode;
};

type GameContextType = {
  isGamesLoading: boolean;
  setIsGamesLoading: (newState: boolean) => void;
  games: IGame[] | [];
  setGames: (newState: IGame[]) => void;
  refreshAds: (newState: string) => void;
  gameSelected: IGame | null;
  setGameSelected: (newState: IGame) => void;
  isPageLoading: boolean;
  setIsPageLoading: (newState: boolean) => void;
};

const initialValue = {
  isGamesLoading: false,
  setIsGamesLoading: () => {},
  games: [],
  setGames: () => {},
  refreshAds: () => {},
  gameSelected: null,
  setGameSelected: () => {},
  isPageLoading: false,
  setIsPageLoading: () => {},
};

export const GameContext = createContext<GameContextType>(initialValue);

export const GameProvider = ({ children }: GameContextProps) => {
  const [isGamesLoading, setIsGamesLoading] = useState<boolean>(
    initialValue.isGamesLoading
  );
  const [isPageLoading, setIsPageLoading] = useState<boolean>(
    initialValue.isPageLoading
  );
  const [games, setGames] = useState<IGame[]>(initialValue.games);
  const [gameSelected, setGameSelected] = useState<IGame | null>(
    initialValue.gameSelected
  );

  const refreshAds = (gameId: string) => {
    const refreshGames: IGame[] = games.map((game: IGame) => {
      if (game.id === gameId) {
        game._count.ads += 1;
      }

      return game;
    });

    setGames(refreshGames as IGame[]);
  };

  return (
    <GameContext.Provider
      value={{
        isGamesLoading,
        setIsGamesLoading,
        games,
        setGames,
        refreshAds,
        gameSelected,
        setGameSelected,
        isPageLoading,
        setIsPageLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
