import { IGames } from '../interfaces';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      game: IGames;
    }
  }
}
