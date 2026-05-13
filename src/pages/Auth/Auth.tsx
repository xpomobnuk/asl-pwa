import './Auth.css'
import { useState } from 'react'
import { auth, db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { legalText } from '../../data/legal'

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [modal, setModal] = useState<'terms' | 'privacy' | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleSubmit = async () => {
    if (!isLogin && !acceptedTerms) {
      alert('You must accept Terms and Privacy Policy')
      return
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          )

        const user = userCredential.user

        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          completedOnboarding: false,
        })
      }
    } catch (e) {
      console.error(e)
      alert('Auth error')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-wrapper">

        {/* LOGO */}
        <div className="auth-logo">
          <img src="/logo.png" alt="logo" />
        </div>

        {/* TITLE */}
        <h2 className="auth-heading">
          {isLogin ? 'Welcome' : 'Create an account'}
        </h2>

        <p className="auth-subtext">
          {isLogin
            ? 'Sign in to continue'
            : 'Fill your information below or register with your social account'}
        </p>

        {/* FORM */}
        <div className="auth-form">

          {!isLogin && (
            <input
              className="auth-input-line"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className="auth-input-line"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input-line"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {isLogin && (
            <p className="auth-forgot">Forgot Password?</p>
          )}

          {!isLogin && (
            <label className="auth-terms">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              I agree to{' '}
              <span className="link" onClick={() => setModal('terms')}>
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="link" onClick={() => setModal('privacy')}>
                Privacy Policy
              </span>
            </label>
          )}

          <button
            className="auth-button"
            onClick={handleSubmit}
            disabled={!isLogin && !acceptedTerms}
          >
            {isLogin ? 'Sign in' : 'Sign Up'}
          </button>

          {!isLogin && (
            <>
              <div className="auth-divider">
                <span>or sign up with</span>
              </div>

              <div className="auth-socials">
                <div className="social-btn google"><img src="/google_icon.png" alt="google-icon" /></div>
                <div className="social-btn apple"><img src="/apple_icon.png" alt="apple-icon" /></div>
              </div>
            </>
          )}

          <p className="auth-switch">
            {isLogin ? 'New user?' : 'Already have an account?'}{' '}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Signup' : 'Login'}
            </span>
          </p>


          {modal && (
            <div className="modal-overlay" onClick={() => setModal(null)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>

                <h3 className="modal-title">
                  {modal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                </h3>

                <div className="modal-content">
                  {modal === 'terms' ? legalText.terms : legalText.privacy}
                </div>

                <button className="btn btn-primary" onClick={() => setModal(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}