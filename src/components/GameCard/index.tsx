import { useRouter } from 'next/router';
interface GameCardProps {
  id: string;
  className?: string;
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameCard({ id, adsCount, bannerUrl, title }: GameCardProps) {
  const router = useRouter();

  function handleRedirectToGame() {
    router.push(
      {
        pathname: '/game/[id]',
        query: { id, title, bannerUrl },
      },
      `/game/${id}`
    );
  }

  return (
    <button
      className='relative rounded-lg overflow-hidden w-[100%] h-[100%]'
      onClick={handleRedirectToGame}
    >
      <img
        src={bannerUrl}
        alt={title}
        title={title}
        className='w-[100%] h-[100%] rounded-lg '
      />

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 flex flex-col items-start'>
        <strong className='font-bold text-white block text-left'>
          {title}
        </strong>
        <span className='text-zinc-300 text-sm block'>
          {adsCount} anúncio(s)
        </span>
      </div>
    </button>
  );
}
