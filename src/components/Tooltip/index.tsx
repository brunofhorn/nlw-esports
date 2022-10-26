import { ITooltip } from '@interfaces/index';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export function Tooltip({
  description,
  delayDuration = 0,
  children,
}: ITooltip) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={delayDuration}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className='radix-side-top:animate-slide-down-fade radix-side-right:animate-slide-left-fade radix-side-bottom:animate-slide-up-fade radix-side-left:animate-slide-right-fade inline-flex items-center rounded-md px-4 py-2.5 bg-white dark:bg-gray-800'
        >
          <TooltipPrimitive.Arrow className='mb-8 fill-current text-white dark:text-gray-800' />
          <span className='block text-xs leading-none text-gray-700 dark:text-gray-100'>
            {description}
          </span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
