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
};

const initialValue = {
  isGamesLoading: false,
  setIsGamesLoading: () => {},
  games: [],
  setGames: () => {},
};

export const GameContext = createContext<GameContextType>(initialValue);

export const GameProvider = ({ children }: GameContextProps) => {
  const [isGamesLoading, setIsGamesLoading] = useState<boolean>(
    initialValue.isGamesLoading
  );
  const [games, setGames] = useState<Game[]>(initialValue.games);

  const refreshAds = (gameId: string) => {};

  return (
    <GameContext.Provider
      value={{ isGamesLoading, setIsGamesLoading, games, setGames }}
    >
      {children}
    </GameContext.Provider>
  );
};
