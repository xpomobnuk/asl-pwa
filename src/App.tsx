import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { Auth } from './pages/Auth/Auth'
import { Alphabet } from './pages/Alphabet'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Onboarding } from './pages/Onboarding/Onboarding'
import { WordDemo } from './pages/WordDemo/WordDemo'
import { Module } from './pages/Module/Module'
import { ABCCards } from './pages/Submodule/ABCCards'
import { ABCBeginner } from './pages/Submodule/ABCBeginner'
import { ScrollToTop } from './components/shared/ScrollToTop'
import { Learn } from './pages/Learn/Learn'
import { BottomNav } from './components/BottomNav/BottomNav'
import { Welcome } from './pages/Welcome/Welcome'
import { Lesson }from './pages/Lesson/Lesson'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // пока Firebase проверяет пользователя
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

  // если НЕ залогинен → показываем Auth
  if (!user) {
    return <Auth />
  }

  // если залогинен → приложение
  return (
     <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/module/:id" element={<Module />} />
        <Route path="/abc-cards" element={<ABCCards />} />
        <Route path="/alphabet" element={<Alphabet />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/word-demo"element={<WordDemo />} />
        <Route path="/abc-beginner" element={<ABCBeginner />} />
        <Route path="/lesson/:lessonId" element={<Lesson />}/>
      </Routes>
      <BottomNav />
    </>
  )
}

export default App