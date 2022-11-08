import { Loading } from '@components/Loading';
import { AppContext } from '@contexts/AppContext';
import { IModal } from '@interfaces/index';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useContext } from 'react';
import { useTransition, animated, config } from 'react-spring';

export function Modal({
  open,
  setOpen,
  title,
  close,
  centered,
  children,
}: IModal) {
  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  });

  return (
    <Dialog.Root modal open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        {transitions((styles: any, item: any) =>
          item ? (
            <>
              <Dialog.Overlay
                forceMount
                asChild
                className='bg-black/60 inset-0 fixed'
              >
                <animated.div
                  style={{
                    opacity: styles.opacity,
                  }}
                />
              </Dialog.Overlay>
              <Dialog.Content
                forceMount
                asChild
                className='fixed bg-[#2A2634] py-8 px-10 text-white mt-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[440px] md:w-[480px] shadow-lg shadow-black/25'
              >
                <animated.div style={styles}>
                  {close && (
                    <Dialog.Close className='top-5 right-5 absolute'>
                      <X
                        size={24}
                        className='text-zinc-500 hover:text-red-900'
                        weight='regular'
                      />
                    </Dialog.Close>
                  )}
                  <Dialog.Title
                    className={`text-2xl font-black ${
                      centered && 'text-center'
                    }`}
                  >
                    {title}
                  </Dialog.Title>
                  {centered ? (
                    <div className='flex justify-center -ml-10'>{children}</div>
                  ) : (
                    children
                  )}
                </animated.div>
              </Dialog.Content>
            </>
          ) : null
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
