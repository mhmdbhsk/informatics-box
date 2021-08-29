import React, { ComponentProps } from 'react';

type ContainerProps = ComponentProps<'div'>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children }, ref) => {
    return (
      <div className='container mx-auto px-4 max-w-xl min-h-screen' ref={ref}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
