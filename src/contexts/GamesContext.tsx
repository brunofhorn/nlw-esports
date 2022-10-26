import { Game } from '@interfaces/index';
import { createContext, ReactNode, useState } from 'react';

type GameContextProps = {
  children: ReactNode;
};

type GameContextType = {
  isGamesLoading: boolean;
  setIsGamesLoading: (newState: boolean) => void;
  games: Game[] | [];
  setGames: (newState: Game[]) => void;
  refreshAds: (gameId: string) => void;
};

const initialValue = {
  isGamesLoading: false,
  setIsGamesLoading: () => {},
  games: [],
  setGames: () => {},
  refreshAds: () => {},
};

export const GameContext = createContext<GameContextType>(initialValue);

export const GameProvider = ({ children }: GameContextProps) => {
  const [isGamesLoading, setIsGamesLoading] = useState<boolean>(
    initialValue.isGamesLoading
  );
  const [games, setGames] = useState<Game[]>(initialValue.games);

  const refreshAds = (gameId: string) => {
    const refreshGames: Game[] = games.map((game: Game) => {
      if (game.id === gameId) {
        game._count.ads += 1;
      }

      return game;
    });

    setGames(refreshGames as Game[]);
  };

  return (
    <GameContext.Provider
      value={{ isGamesLoading, setIsGamesLoading, games, setGames, refreshAds }}
    >
      {children}
    </GameContext.Provider>
  );
};
