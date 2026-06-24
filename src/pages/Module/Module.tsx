import { useParams, useNavigate } from 'react-router-dom'
import './Module.css'

export const Module = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const moduleTitle = id === 'alphabet' ? 'Alphabet ABC' : 'Module'

  // 🔥 данные подмодулей
  const submodules = [
    {
      id: 'abc-beginner-1',
      title: '🌱 Beginner 1',
      routeType: 'lesson',
      description:
        'Learn your first letters and words.',
      image: '/images/alphabet.jpg',
      active: true,
    },

    {
      id: 'abc-beginner-2',
      title: '🌱 Beginner 2',
      routeType: 'lesson',
      description:
        'Expand your alphabet with new letters and words.',
      image: '/images/alphabet.jpg',
      active: true,
    },
    {
      id: 'abc-beginner-3',
      title: '🌱 Beginner 3',
      routeType: 'lesson',
      description:
        'Build longer words using familiar letters.',
      image: '/images/alphabet.jpg',
      active: true,
    },

    {
      id: 'abc-beginner-4',
      title: '🌱 Beginner 4',
      routeType: 'lesson',
      description:
        'Learn more letters and read bigger words.',
      image: '/images/alphabet.jpg',
      active: true,
    },
    {
      id: 'abc-beginner-5',
      title: '🌱 Beginner 5',
      routeType: 'lesson',
      description:
        'Add useful letters and build everyday words.',
      image: '/images/alphabet.jpg',
      active: true,
    },

    {
      id: 'abc-beginner-6',
      title: '🌱 Beginner 6',
      routeType: 'lesson',
      description:
        'Practice new letters in common short words.',
      image: '/images/alphabet.jpg',
      active: true,
    },
    {
      id: 'abc-beginner-7',
      title: '🌱 Beginner 7',
      routeType: 'lesson',
      description:
        'Learn advanced letters and improve recognition.',
      image: '/images/alphabet.jpg',
      active: true,
    },

    {
      id: 'abc-beginner-8',
      title: '🌱 Beginner 8',
      routeType: 'lesson',
      description:
        'Complete the alphabet and master the final letters.',
      image: '/images/alphabet.jpg',
      active: true,
    },

    {
      id: 'abc-intermediate-1',
      title: '⭐ Intermediate 1',
      routeType: 'lesson',
      description:
        'Practice reading complete everyday words.',
      image: '/images/alphabet.jpg',
      active: true,
    },

    {
      id: 'abc-intermediate-2',
      title: '⭐ Intermediate 2',
      routeType: 'lesson',
      description:
        'Read longer words and improve speed.',
      image: '/images/alphabet.jpg',
      active: true,
    },
    {
      id: 'abc-cards',
      title: 'ABC Cards',
      routeType: 'page',
      description:
        'Practice the complete ASL alphabet.',
      image: '/images/alphabet.jpg',
      active: true,
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
            onClick={() => {

              if (!item.active) return

              if (
                item.routeType === 'lesson'
              ) {
                navigate(
                  `/lesson/${item.id}`,
                  {
                    state: {
                      returnTo: `/module/${id}`,
                    },
                  }
                )

                return
              }

              navigate(`/${item.id}`)
            }}
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