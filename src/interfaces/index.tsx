import { ReactNode } from 'react';

export type Game = {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
};

export type AdModal = {
  open: boolean;
};
