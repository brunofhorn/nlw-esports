import PacmanLoader from 'react-spinners/PacmanLoader';

interface LoadingProps {
  load: boolean;
  size?: number;
}

export function Loading({ load, size = 20 }: LoadingProps) {
  return (
    <div className={load ? `mt-10 mb-10` : 'm-0'}>
      <PacmanLoader color={'rgb(139 92 246)'} loading={load} size={size} />
    </div>
  );
}
