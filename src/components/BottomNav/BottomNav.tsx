import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './BottomNav.css'

export const BottomNav = () => {
const location = useLocation()
console.log(location.pathname)
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
          `bottom-nav-item ${
            isActive ? 'active' : ''
          }`
        }
      >
        <span>🏠</span>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/learn"
        className={({ isActive }) =>
          `bottom-nav-item ${
            isActive ? 'active' : ''
          }`
        }
      >
        <span>📚</span>
        <span>Learn</span>
      </NavLink>

      <NavLink
        to="/alphabet"
        className={({ isActive }) =>
          `bottom-nav-item ${
            isActive ? 'active' : ''
          }`
        }
      >
        <span>🔤</span>
        <span>Alphabet</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `bottom-nav-item ${
            isActive ? 'active' : ''
          }`
        }
      >
        <span>👤</span>
        <span>Profile</span>
      </NavLink>

    </nav>
  )
}