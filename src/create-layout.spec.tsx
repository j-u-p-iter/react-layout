import * as React from 'react';
import { render } from 'react-testing-library';

import { createLayout } from '.';


describe('create-layout', () => {
  describe('result component', () => {
    it('renders properly with all possible internal parts', () => {
      const headerContentEl = <>Header</>;
      const sidebarContentEl = <>Sidebar</>;
      const footerContentEl = <>Footer</>;
      const contentEl = <>Main Content</>;

      const Layout = createLayout({
        headerContentEl,
        sidebarContentEl,
        footerContentEl,
      }, contentEl);

      const { container } = render(
        <Layout 
          wrapperClassName='wrapper'
          sidebarClassName='sidebar'
          contentClassName='content'
          headerClassName='header'
          footerClassName='footer'
        />
      );
      const layoutEl = container.firstChild;

      expect(layoutEl).toMatchSnapshot();
    });

    it('renders properly without some internal parts and without classNames', () => {
      const sidebarContentEl = <>Sidebar</>;
      const contentEl = <>Main Content</>;

      const Layout = createLayout({
        sidebarContentEl,
      }, contentEl);

      const { container } = render(<Layout />);

      const layoutEl = container.firstChild;

      expect(layoutEl).toMatchSnapshot();
    });
  });

  describe('currying', () => {
    it('works properly', () => {
      const headerContentEl = <>Header</>;
      const sidebarContentEl = <>Sidebar</>;
      const footerContentEl = <>Footer</>;
      const contentEl = <>Main Content</>;

      const createLayoutWithInternalParts = createLayout({
        headerContentEl,
        sidebarContentEl,
        footerContentEl,
      });

      const Layout = createLayoutWithInternalParts(contentEl);

      const { container } = render(<Layout />);

      const layoutEl = container.firstChild;

      expect(layoutEl).toMatchSnapshot();
    })
  });
});
