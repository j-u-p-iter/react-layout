import * as React from 'react';

import { curry } from 'ramda';


type ReactNode = React.ReactNode;

interface internalParts {
  headerContentEl?: ReactNode;
  sidebarContentEl?: ReactNode;
  footerContentEl?: ReactNode;
}

interface LayoutProps {
  wrapperClassName?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
}

export const createLayout = curry(({ headerContentEl, sidebarContentEl, footerContentEl }: internalParts, contentEl: ReactNode): React.SFC<LayoutProps> => {
  const Layout: React.SFC<LayoutProps> = ({ 
    wrapperClassName, 
    sidebarClassName,
    contentClassName, 
    headerClassName, 
    footerClassName,
  }) => {
    const structure: ReactNode[] = [
      headerContentEl && <header key='header' className={headerClassName}>{headerContentEl}</header>,

      sidebarContentEl && <div key='sidebar' className={sidebarClassName}>{sidebarContentEl}</div>,

      <div key='content' className={contentClassName}>{contentEl}</div>,

      footerContentEl && <footer key='footer' className={footerClassName}>{footerContentEl}</footer>,
    ].filter(Boolean);

    return <div className={wrapperClassName}>{structure}</div>;
  };

  Layout.defaultProps = {
    wrapperClassName: '',
    sidebarClassName: '',
    contentClassName: '',
    headerClassName: '',
    footerClassName: '',
  };

  return Layout;
});
