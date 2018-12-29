import * as React from "react";

import { curry } from "ramda";

type ReactNode = React.ReactNode;

interface IInternalParts {
  headerContentEl?: ReactNode;
  sidebarContentEl?: ReactNode;
  footerContentEl?: ReactNode;
}

interface ILayoutProps {
  wrapperClassName?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
}

export const createLayout = curry(
  (
    { headerContentEl, sidebarContentEl, footerContentEl }: IInternalParts,
    contentEl: ReactNode
  ): React.SFC<ILayoutProps> => {
    const Layout: React.SFC<ILayoutProps> = ({
      wrapperClassName,
      sidebarClassName,
      contentClassName,
      headerClassName,
      footerClassName
    }) => {
      const structure: ReactNode[] = [
        headerContentEl && (
          <header key="header" className={headerClassName}>
            {headerContentEl}
          </header>
        ),

        sidebarContentEl && (
          <div key="sidebar" className={sidebarClassName}>
            {sidebarContentEl}
          </div>
        ),

        <div key="content" className={contentClassName}>
          {contentEl}
        </div>,

        footerContentEl && (
          <footer key="footer" className={footerClassName}>
            {footerContentEl}
          </footer>
        )
      ].filter(Boolean);

      return <div className={wrapperClassName}>{structure}</div>;
    };

    Layout.defaultProps = {
      wrapperClassName: "",
      sidebarClassName: "",
      contentClassName: "",
      headerClassName: "",
      footerClassName: ""
    };

    return Layout;
  }
);
