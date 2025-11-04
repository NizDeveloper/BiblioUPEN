import logo from '../../assets/images/illustrations/biblioteca-logo2.png'

export default function Header() {
  return (
  <header className="header">
    <div className="limiter-extra-large">
      <div className='header-content'>
        <div className='logo'>
          <a href="/">
            <img src={logo} alt="Logo de BiblioUPEN"/>
          </a>
        </div>

        <button className='btn btn-primary' id="btn-logout">Logout</button>
      </div>
    </div>
  </header>
  );
}
