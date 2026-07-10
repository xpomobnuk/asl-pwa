import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import { signOut } from 'firebase/auth'
import { ROUTES } from '../../routes'
import { modules } from '../../data/modules'


import { doc, getDoc } from 'firebase/firestore'
import './Dashboard.css'

export const Dashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [userName, setUserName] = useState('')
  const [energy, setEnergy] = useState(5)
  const [xp, setXp] = useState(0)
  const level = Math.floor(xp / 100) + 1
  const currentLevelXp = xp % 100
  const [completedModules, setCompletedModules] =
    useState(0)

  const totalModules = modules.length

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser

      if (!user) return

      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        const data = snap.data()

        setUserName(data.name || '')

        setEnergy(data.energy ?? 5)
        setXp(data.xp ?? 0)

        const completed =
          data.completedSubmodules ?? []

        setCompletedModules(completed.length)

        setHasCompletedOnboarding(
          data.completedOnboarding || false
        )
        if (!data.completedOnboarding) {
          navigate('/welcome')
          return
        }
      }

      setLoading(false)
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="app-loading">

        <div className="app-loading-content">

          <img
            src="/logo.png"
            alt="logo"
            className="app-loading-logo"
          />

          <p className="app-loading-text">
            Loading...
          </p>

        </div>

      </div>
    )
  }

  return (
    <div className="container dashboard">

      {/* ===== NORMAL DASHBOARD ===== */}
      {hasCompletedOnboarding && (
        <>

          {/* HEADER */}

          <div className="dashboard-header">

            <div className="dashboard-user">

              <button
                className="logout-button"
                onClick={async () => {
                  await signOut(auth)
                }}
              >
                Log out
              </button>

              <h1 className="dashboard-title">
                Hi{userName ? `, ${userName}` : ''} 👋
              </h1>

              <p className="dashboard-subtitle">
                Lets keep learning ASL
              </p>

            </div>

            <div className="dashboard-avatar">

              <img
                src="/avatar-placeholder.png"
                alt="Avatar"
              />

              <div className="dashboard-level-badge">
                {level}
              </div>

            </div>

          </div>




          <div className="dashboard-progress">

            <div className="dashboard-progress-top">

              <div>

                <span className="progress-label">

                  Level {level}

                </span>

                <h2>

                  Sign Explorer

                </h2>

              </div>

              <div className="progress-xp">

                {currentLevelXp}/100 XP

              </div>

            </div>

            <div className="level-track">

              <div
                className="level-fill"
                style={{
                  width: `${currentLevelXp}%`,
                }}
              />

            </div>

          </div>

          {/* PLAYER STATS */}
          <div className="dashboard-stats">

            <div className="dashboard-stat">

              <div className="dashboard-stat-icon">
                <img
                  src="/statistic-icons/Energy.svg"
                  alt="Learn"
                  className="bottom-nav-icon"
                />
              </div>

              <div className="dashboard-stat-label">
                Energy
              </div>

              <div className="dashboard-stat-value">
                {energy}
              </div>

            </div>

            <div className="dashboard-stat">

              <div className="dashboard-stat-icon">
                <img
                  src="/statistic-icons/Level.svg"
                  alt="Learn"
                  className="bottom-nav-icon"
                />
              </div>

              <div className="dashboard-stat-label">
                Level
              </div>

              <div className="dashboard-stat-value">
                {level}
              </div>

            </div>

            <div className="dashboard-stat">

              <div className="dashboard-stat-icon">
                <img
                  src="/statistic-icons/Xp.svg"
                  alt="Learn"
                  className="bottom-nav-icon"
                />
              </div>

              <div className="dashboard-stat-label">
                Xp
              </div>

              <div className="dashboard-stat-value">
                {xp}
              </div>

            </div>

          </div>


          {/* KEEP LEARNING */}

          <div
            className="continue-card"
            onClick={() => navigate(ROUTES.MODULE('alphabet'))}
          >

            <div className="continue-info">

              <div className="continue-progress">

                <span>
                  Modules <strong>{totalModules}</strong>
                </span>

                <span>
                  Completed <strong>{completedModules}</strong>
                </span>

              </div>

              <h2>

                Keep learning

              </h2>

              <p>

                to unlock more lessons

              </p>

            </div>

            <div className="continue-image">

              <img
                src="/dashboard/continue.svg"
                alt=""
              />

            </div>

            <button className="continue-button">

              ›

            </button>

          </div>


          {/* QUICK ACCESS */}
          <div className="dashboard-section">

            <h2 className="section-title">
              Quick Access
            </h2>

            <div
              className="quick-card"
              onClick={() => navigate('/alphabet')}
            >
              <img src="/images/alphabet.jpg" alt="" />
              <div className="quick-card-content">

                <div>
                  <h3 className="quick-card-title">
                    ASL Alphabet
                  </h3>

                  <p className="quick-card-text">
                    Review all letters anytime
                  </p>
                </div>

                <div className="quick-card-arrow">
                  →
                </div>

              </div>
            </div>

          </div>

        </>
      )}
    </div>
  )
}