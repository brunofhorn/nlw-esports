import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useTransition, animated, config } from 'react-spring';

function Teste() {
  const [open, setOpen] = useState(false);
  const transitions = useTransition(open, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
    config: config.stiff,
  });
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      {transitions((styles: any, item: any) =>
        item ? (
          <>
            <Dialog.Overlay forceMount asChild>
              <animated.div
                style={{
                  opacity: styles.opacity,
                }}
              />
            </Dialog.Overlay>
            <Dialog.Content forceMount asChild>
              <animated.div style={styles}>
                <h1>Hello from inside the Dialog!</h1>
                <Dialog.Close>close</Dialog.Close>
              </animated.div>
            </Dialog.Content>
          </>
        ) : null
      )}
    </Dialog.Root>
  );
}

export default Teste;
