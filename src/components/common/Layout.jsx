import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />

      <div className="layout-container">
        <Sidebar />

        <main className="main-content limiter-large">
          {children}
        </main>
      </div>
    </div>
  );
}
