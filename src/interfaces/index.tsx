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
  setOpen(open: boolean): void;
};

export type Toast = {
  open: boolean;
  setOpen(open: boolean): void;
  dados: ToastData;
};

export type ToastData = {
  type: string;
  title: string;
  message: string;
};
