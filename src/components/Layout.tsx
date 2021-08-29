import React from 'react';
import { ComponentProps } from 'react';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = ComponentProps<'div'>;

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children }, ref) => {
    return (
      <Container ref={ref}>
        <Header />
        {children}
        <Footer />
      </Container>
    );
  }
);

Layout.displayName = 'Layout';

export default Layout;
