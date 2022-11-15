import { IInput } from '@interfaces/index';
import { useFormContext } from 'react-hook-form';

export function Input({ registerName = undefined, ...rest }: IInput) {
  const { register } = useFormContext();

  return (
    <>
      {registerName ? (
        <input
          className='bg-zinc-900 py-2 px-4 rounded text-[10px] md:text-sm placeholder:text-zinc-500'
          {...register(registerName)}
          {...rest}
        />
      ) : (
        <input
          className='bg-zinc-900 py-2 px-4 rounded text-[10px] md:text-sm placeholder:text-zinc-500'
          {...rest}
        />
      )}
    </>
  );
}
