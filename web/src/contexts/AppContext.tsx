import { IGame } from '@interfaces/index';
import { createContext, ReactNode, useState } from 'react';

type AppContextProps = {
  children: ReactNode;
};

type AppContextType = {
  isAdsModalOpen: boolean;
  setIsAdsModalOpen: (open: boolean) => void;
  isGamesLoading: boolean;
  setIsGamesLoading: (newState: boolean) => void;
  games: IGame[] | [];
  setGames: (newState: IGame[]) => void;
  refreshAds: (newState: string) => void;
  gameSelected: IGame;
  setGameSelected: (newState: IGame) => void;
  isPageLoading: boolean;
  setIsPageLoading: (newState: boolean) => void;
};

const initialValue = {
  isAdsModalOpen: false,
  setIsAdsModalOpen: () => {},
  isGamesLoading: false,
  setIsGamesLoading: () => {},
  games: [],
  setGames: () => {},
  refreshAds: () => {},
  gameSelected: {
    id: '',
    title: '',
    bannerUrl: '',
    _count: {
      ads: 0,
    },
  },
  setGameSelected: () => {},
  isPageLoading: false,
  setIsPageLoading: () => {},
};

export const AppContext = createContext<AppContextType>(initialValue);

export const AppProvider = ({ children }: AppContextProps) => {
  const [isAdsModalOpen, setIsAdsModalOpen] = useState(
    initialValue.isAdsModalOpen
  );
  const [isGamesLoading, setIsGamesLoading] = useState<boolean>(
    initialValue.isGamesLoading
  );
  const [isPageLoading, setIsPageLoading] = useState<boolean>(
    initialValue.isPageLoading
  );
  const [games, setGames] = useState<IGame[]>(initialValue.games);
  const [gameSelected, setGameSelected] = useState<IGame>(
    initialValue.gameSelected
  );

  console.log(isAdsModalOpen);

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
    <AppContext.Provider
      value={{
        isAdsModalOpen,
        setIsAdsModalOpen,
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
    </AppContext.Provider>
  );
};
