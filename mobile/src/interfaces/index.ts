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
  gamesFormated: IGamesFormated[] | [];
  setGamesFormated(games: IGamesFormated[]): void;
  gameSelected: IGamesFormated;
  setGameSelected(newValue: IGamesFormated): void;
  refreshAds: (newState: string) => void;
  discordUser: IDiscordUser;
  setDiscordUser(newValue: IDiscordUser): void;
}

export interface IDiscordUser {
  discordId: string;
  discordAvatar: string;
  discordUsername: string;
  discordDiscriminator: string;
}

export interface IBackground extends IDefaultChildren {}

export interface IDuoCard {
  id: string;
  discordImage?: string;
  username: string;
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
  visible: boolean;
  setVisible(visible: boolean): void;
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

export interface IGamesFormated {
  Id: string;
  Name: string;
  Value: string;
}

export interface IHeading extends ViewProps {
  title: JSX.Element | JSX.Element[];
  subtitle: string;
}

export interface IGradientText {
  text: string;
}

export interface IModal extends ModalProps {
  visible: boolean;
  setVisible(visible: boolean): void;
  children?: JSX.Element[] | JSX.Element;
}

export interface IModalImage {
  visible: boolean;
  setVisible(visible: boolean): void;
  title: string;
  bannerUrl: string;
}

export interface ILabel {
  text: string;
}

export interface IInput {
  control: any;
  name: string;
  placeholder: string;
}

export interface IToggle {
  weekDayText: string;
  weekDayNumber: string;
  weekDays: string[];
  handleSelectWeekDay(newValue: string): void;
}
