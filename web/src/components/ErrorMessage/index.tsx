import { IErrorMessage } from '@interfaces/index';
import { WarningCircle } from 'phosphor-react';

export function ErrorMessage({ message = '', ...rest }: IErrorMessage) {
  return (
    <span
      className='text-[10px] md:text-xs text-red-700 flex items-center gap-1 ml-2'
      {...rest}
    >
      <WarningCircle size={14} />
      {message}
    </span>
  );
}
