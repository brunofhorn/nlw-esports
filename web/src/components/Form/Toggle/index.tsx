import { IToggle } from '@interfaces/index';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export function Toggle({ value, weekDays, title, letter }: IToggle) {
  return (
    <ToggleGroup.Item
      value={value}
      title={title}
      aria-label={title}
      className={`text-[10px] md:text-xs w-6 h-6 rounded ${
        weekDays.includes(value) ? 'bg-violet-500' : 'bg-zinc-900'
      }`}
    >
      {letter}
    </ToggleGroup.Item>
  );
}
