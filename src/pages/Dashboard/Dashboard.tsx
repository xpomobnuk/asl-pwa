import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import { modules } from '../../data/modules'
import { signOut } from 'firebase/auth'


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

      {/* ===== FIRST TIME ===== */}
      {!hasCompletedOnboarding && (
        <div className="welcome-card">

          <h1 className="welcome-title">
            Start. Learn. Improve!
          </h1>

          <div className="welcome-line" />

          <p className="welcome-text">
            Start with vocabulary, move to sentences and
            then practice with mixed exercises.
          </p>

          {/* IMAGE */}
          <div className="welcome-image">
            <img src="/images/Amy.png" alt="welcome" />
          </div>

          {/* BUTTON */}
          <button
            className="welcome-button"
            onClick={() => navigate('/onboarding')}
          >
            Get Started
          </button>
        </div>
      )}

      {/* ===== NORMAL DASHBOARD ===== */}
      {hasCompletedOnboarding && (
        <>

          {/* GREETING */}
          <div className="dashboard-greeting">
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
              Continue your ASL learning journey
            </p>
          </div>

          {/* PLAYER STATS */}
          <div className="player-stats">

            <div className="player-stat">

              <div className="player-stat-icon">
                ⚡
              </div>

              <div className="player-stat-label">
                Energy
              </div>

              <div className="player-stat-value">
                {energy}
              </div>

            </div>

            <div className="player-stat">

              <div className="player-stat-icon">
                🏆
              </div>

              <div className="player-stat-label">
                Level
              </div>

              <div className="player-stat-value">
                {level}
              </div>

            </div>

            <div className="player-stat">

              <div className="player-stat-icon">
                ⭐
              </div>

              <div className="player-stat-label">
                XP
              </div>

              <div className="player-stat-value">
                {xp}
              </div>

            </div>

          </div>

          <div className="level-progress">

            <div className="level-progress-top">

              <span>
                Level {level}
              </span>

              <span>
                {currentLevelXp}/100 XP
              </span>

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


          {/* MODULE STATS */}
          <div className="stats-card">

            <div className="stats-label">
              Modules completed
            </div>

            <div className="stats-value">
              {completedModules} / 12
            </div>

            <p className="stats-text">
              Keep learning to unlock more lessons.
            </p>

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




          {/* MODULES */}
          {modules.map((section, i) => (
            <div key={i} className="dashboard-section">

              <h2 className="section-title">
                {section.title}
              </h2>

              <div className="module-row">

                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="module-card"
                    onClick={() => navigate(`/module/${item.id}`)}
                  >
                    <div
                      className="module-image"
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    />

                    <div className="module-content">

                      <div className="module-name">
                        {item.title}
                      </div>

                      <div className="module-status">
                        {item.status}
                      </div>

                    </div>
                  </div>
                ))}

              </div>

            </div>
          ))}

        </>
      )}
    </div>
  )
}