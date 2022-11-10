import { ReactNode } from 'react';
import {
  ColorValue,
  ModalProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';

interface IDefaultChildren {
  children?: ReactNode;
}

export interface IAppProvider extends IDefaultChildren {}

export interface IAppContext {
  games: IGames[] | [];
  setGames(games: IGames[]): void;
  isGamesLoading: boolean;
  setIsGamesLoading(newValue: boolean): void;
}

export interface IBackground extends IDefaultChildren {}

export interface IDuoCard {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  onConnect: () => void;
}

export interface IDuoInfo {
  label: string;
  value: string;
  colorValue?: ColorValue;
}

export interface IDuoMatch extends ModalProps {
  discord: string;
  onClose: () => void;
}

export interface IGameCard extends TouchableOpacityProps, IGames {}

export interface IGames {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { ads: number };
}

export interface IHeading extends ViewProps {
  title: JSX.Element | JSX.Element[];
  subtitle: string;
}

export interface IGradientText {
  text: string;
}

export interface IModal {
  visible: boolean;
  setVisible(visible: boolean): void;
  children?: JSX.Element[] | JSX.Element;
}
