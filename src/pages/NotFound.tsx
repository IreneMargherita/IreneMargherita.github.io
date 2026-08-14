import { Link, useLocation } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import TerminalWindow from '../components/TerminalWindow';

export default function NotFound() {
  usePageTitle('404');
  const { pathname } = useLocation();

  return (
    <section className="section">
      <div className="container-content flex min-h-[55vh] items-center justify-center">
        <div className="w-full max-w-xl">
          <TerminalWindow title="error — 404">
            <p>
              <span className="text-data">➜</span>{' '}
              <span className="text-fg">cd {pathname}</span>
            </p>
            <p className="mt-1 text-syntax-red">bash: cd: {pathname}: No such file or directory</p>
            <p className="mt-4 text-fg-faint">
              The page you're looking for doesn't exist (yet).
            </p>
            <p className="mt-4">
              <Link to="/" className="link font-mono">
                cd ~/home →
              </Link>
            </p>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
