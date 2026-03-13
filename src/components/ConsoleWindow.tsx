import React from 'react';

interface ConsoleWindowProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

export const ConsoleWindow: React.FC<ConsoleWindowProps> = ({ title, children, id }) => {
  return (
    <div id={id} className="console-window">
      <div className="console-window-titlebar">
        <div className="console-window-dots">
          <span className="console-window-dot console-window-dot-red" />
          <span className="console-window-dot console-window-dot-yellow" />
          <span className="console-window-dot console-window-dot-green" />
        </div>
        <span className="console-window-title" style={{ fontFamily: 'var(--font-mono)' }}>
          {title}
        </span>
      </div>
      <div className="console-window-content">{children}</div>
    </div>
  );
};
