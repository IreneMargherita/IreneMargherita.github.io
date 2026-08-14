import type { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

/** macOS-style terminal chrome: three dots, a title, and a mono body. */
export default function TerminalWindow({ title = 'bash — 80×24', children, className = '' }: Props) {
  return (
    <div className={`terminal ${className}`}>
      <div className="terminal-bar">
        <span className="terminal-dot bg-[#FF5F57]" aria-hidden="true" />
        <span className="terminal-dot bg-[#FEBC2E]" aria-hidden="true" />
        <span className="terminal-dot bg-[#28C840]" aria-hidden="true" />
        <span className="ml-2 truncate font-mono text-xs text-fg-faint">{title}</span>
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
}
