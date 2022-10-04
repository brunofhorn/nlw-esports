import * as Select from '@radix-ui/react-select';

interface Game {
  id: string;
  title: string;
}

interface SelectInputProps {
  gameSelected: string;
  setGameSelected: (value: string) => void;
  games: Game[];
}
export function SelectInput({
  gameSelected,
  setGameSelected,
  games,
}: SelectInputProps) {
  return (
    <Select.Root
      name='game'
      value={gameSelected}
      onValueChange={setGameSelected}
    >
      <Select.Trigger className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 flex items-start justify-between unset'>
        <Select.Value placeholder='Selecione o game que deseja jogar' />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className=' bg-zinc-900 text-white rounded  overflow-auto'>
          <Select.ScrollUpButton className='flex items-center justify-center h-6 bg-white' />
          <Select.Viewport>
            <Select.Group>
              <Select.Label className='px-4 py-3 flex text-zinc-500 italic'>
                Games
              </Select.Label>
              {games.map((game) => (
                <Select.Item
                  value={game.id}
                  key={game.id}
                  className={
                    'px-4 py-3 hover:cursor-pointer hover:bg-violet-700 hover:text-zinc-900 userSelect-none'
                  }
                >
                  <Select.ItemText>{game.title}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
