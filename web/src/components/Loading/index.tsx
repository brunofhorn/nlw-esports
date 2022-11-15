import { ILoading } from '@interfaces/index';
import PacmanLoader from 'react-spinners/PacmanLoader';

export function Loading({ load, size = 20 }: ILoading) {
  return (
    <div className={load ? `mt-10 mb-10` : 'm-0'}>
      <PacmanLoader color={'rgb(139 92 246)'} loading={load} size={size} />
    </div>
  );
}
