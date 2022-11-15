import { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import * as SelectUI from '@radix-ui/react-select';

export interface IGame extends IGameSelect {
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export interface IGameSelect {
  id: string;
  title: string;
}

export interface IGameCard {
  game: IGame;
}

export interface IAds {
  id: string;
  discordImage: string;
  username: string;
  discordId: string;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

export interface IModal {
  open: boolean;
  setOpen(open: boolean): void;
  title?: string;
  close?: boolean;
  centered?: boolean;
  children: ReactNode;
}

export interface IUserDiscordModal {
  discordId: string | null;
}

export interface IToast {
  open: boolean;
  setOpen(open: boolean): void;
  dados: IToastData;
}

export interface IToastData {
  type: string;
  title: string;
  message: string;
}

export interface ITooltip {
  description: string;
  delayDuration?: number;
  children: ReactNode;
}

export interface IDuoCard {
  id: string;
  discordImage: string;
  username: string;
  discordId: string;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
  onConnect?: () => void;
}

export interface IErrorMessage extends HTMLAttributes<HTMLSpanElement> {
  message: string | undefined | null;
}

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  registerName?: string | undefined;
}

export interface ILabel {
  htmlFor: string;
  text: string;
}

export interface ISelect extends SelectUI.SelectTriggerProps {
  options: IGameSelect[];
  label: string;
  placeholder: string;
  name: string;
  onSelectedChange: (option: string) => void;
}

export interface IToggle {
  value: string;
  weekDays: string[];
  title: string;
  letter: string;
}

export interface ILoading {
  load: boolean;
  size?: number;
}

export interface IDiscordProfile {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    discriminator?: string | null;
    avatar?: string | null;
    image_url?: string | null;
    username?: string | null;
    id?: string | null;
  };
  expires: ISODateString;
}

export declare type ISODateString = string;

export interface IAppContext {
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
}

export interface IAppProvider {
  children: ReactNode;
}
