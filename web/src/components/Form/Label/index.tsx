import { ILabel } from '@interfaces/index';

export function Label({ text, htmlFor }: ILabel) {
  return (
    <label className='font-semibold text-[10px] md:text-xs' htmlFor={htmlFor}>
      {text}
    </label>
  );
}
