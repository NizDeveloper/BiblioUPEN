import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeIcon } from "../../assets/images/icons/home.svg";
import { ReactComponent as BookIcon } from "../../assets/images/icons/book.svg";
import { ReactComponent as StudentIcon } from "../../assets/images/icons/person.svg";
import { ReactComponent as LoanIcon } from "../../assets/images/icons/loan.svg";
import { ReactComponent as ArrowLeftIcon } from "../../assets/images/icons/arrow_left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/images/icons/arrow_right.svg";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem('sidebarExpanded');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/books', label: 'Books', icon: BookIcon },
    { path: '/students', label: 'Students', icon: StudentIcon },
    { path: '/loans', label: 'Loans', icon: LoanIcon }
  ];

  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(isExpanded));

    document.documentElement.style.setProperty(
      '--sidebar-width',
      isExpanded ? '270px' : '80px'
    );
  }, [isExpanded]);

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <button 
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ArrowLeftIcon/> : <ArrowRightIcon/>}
        </button>
      </div>

      <nav className="sidebar-menu">
        <ul>
          {menuItems.map(item => {
            const IconComponent = item.icon;
            return (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  <div className="icon">
                    <IconComponent />
                  </div>
                  {isExpanded && <span className="label">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}