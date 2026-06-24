import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './BottomNav.css'

export const BottomNav = () => {
  const location = useLocation()
  const hideBottomNav =
    location.pathname.startsWith('/onboarding') ||
    location.pathname.startsWith('/welcome') ||
    location.pathname.startsWith('/module/') ||
    location.pathname.startsWith('/abc') ||
    location.pathname === '/auth'

  if (hideBottomNav) {
    return null
  }
  return (
    <nav className="bottom-nav">

      <NavLink
        to="/"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? 'active' : ''
          }`
        }
      >
        <img
          src="/menu/home.svg"
          alt="Home"
          className="bottom-nav-icon"
        />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/learn"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? 'active' : ''
          }`
        }
      >
        <img
          src="/menu/learn.svg"
          alt="Learn"
          className="bottom-nav-icon"
        />
        <span>Learn</span>
      </NavLink>

      <NavLink
        to="/alphabet"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? 'active' : ''
          }`
        }
      >
        <img
          src="/menu/alphabet.svg"
          alt="Alphabet"
          className="bottom-nav-icon"
        />
        <span>Alphabet</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? 'active' : ''
          }`
        }
      >
        <img
          src="/menu/profile.svg"
          alt="Profile"
          className="bottom-nav-icon"
        />
        <span>Profile</span>
      </NavLink>

    </nav>
  )
}