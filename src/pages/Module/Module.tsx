import { useParams, useNavigate } from 'react-router-dom'
import './Module.css'

export const Module = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const moduleTitle = id === 'alphabet' ? 'Alphabet ABC' : 'Module'

  // 🔥 данные подмодулей
  const submodules = [
    {
      id: 'abc-cards',
      title: 'ABC Cards',
      description: 'Learn the individual letters from the finger alphabet.',
      image: '/images/alphabet.jpg',
      active: true,
    },
    {
      id: 'abc-exercises',
      title: 'ABC exercises',
      description: 'Learn the individual letters from the finger alphabet.',
      image: '/images/alphabet.jpg',
      active: false,
    },
    {
      id: 'abc-quiz',
      title: 'ABC Quiz',
      description: 'Test your knowledge of the alphabet.',
      image: '/images/alphabet.jpg',
      active: false,
    },
  ]

  return (
    <div className="container module-page">

      {/* HEADER */}
      <div className="module-header">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      {/* TITLE */}
      <h1 className="module-title">{moduleTitle}</h1>

      {/* COUNT */}
      <div className="submodule-lessons">
        {submodules.length} Lessons
      </div>

      {/* LIST */}
      <div className="submodules">
        {submodules.map((item) => (
          <div
            key={item.id}
            className={`submodule-row ${item.active ? 'active' : 'locked'}`}
            onClick={() => item.active && navigate(`/${item.id}`)}
          >
            {/* IMAGE */}
            <div
              className="submodule-image"
              style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* CONTENT */}
            <div className="submodule-content">
              <h3 className="submodule-title">{item.title}</h3>

              <div className="submodule-line" />

              <p className="submodule-description">
                {item.description}
              </p>
            </div>

            {/* ARROW */}
            <div className={`submodule-arrow ${!item.active ? 'disabled' : ''}`}>
              →
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}