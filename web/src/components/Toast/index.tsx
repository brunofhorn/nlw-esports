import { IToast } from '@interfaces/index';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { CheckCircle, Info, WarningCircle, XCircle } from 'phosphor-react';

export function Toast({ open, setOpen, dados }: IToast) {
  const { type, title, message } = dados;

  const Icone = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={45} color={'#5ab220'} />;
      case 'error':
        return <XCircle size={45} color={'#d30808'} />;
      case 'warning':
        return <WarningCircle size={45} color={'#d2d611'} />;
      default:
        return <Info size={45} color={'#1075d3'} />;
    }
  };

  return (
    <ToastPrimitive.Provider swipeDirection='right'>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        asChild
        className='z-50 fixed bottom-4 inset-x-4 w-auto md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm shadow-lg rounded-lg bg-white dark:bg-gray-800 radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-bottom radix-state-closed:animate-toast-hide radix-swipe-end:animate-toast-swipe-out translate-x-radix-toast-swipe-move-x radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease] focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
      >
        <div className='flex'>
          <div className='w-0 flex-1 flex items-center pl-5 py-4 gap-3'>
            <Icone />
            <div className='w-full radix'>
              <ToastPrimitive.Title className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                {title}
              </ToastPrimitive.Title>
              <ToastPrimitive.Description className='mt-1 text-sm text-gray-700 dark:text-gray-400'>
                {message}
              </ToastPrimitive.Description>
            </div>
          </div>
          <div className='flex'>
            <div className='flex flex-col px-3 py-2 space-y-1'>
              <div className='h-0 flex-1 flex'>
                <ToastPrimitive.Close className='w-full border border-transparent rounded-lg px-3 py-2 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                  Ocultar
                </ToastPrimitive.Close>
              </div>
            </div>
          </div>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}
