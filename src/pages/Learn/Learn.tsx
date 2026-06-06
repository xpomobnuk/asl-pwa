import { useNavigate } from 'react-router-dom'
import { modules } from '../../data/modules'
import './Learn.css'

export const Learn = () => {
  const navigate = useNavigate()

  return (
    <div className="container learn-page">

      <div className="learn-header">
        <h1 className="learn-title">
          Learning Modules
        </h1>

        <p className="learn-subtitle">
          Choose a module and continue learning ASL
        </p>
      </div>

      {modules.map((section, i) => (
        <div
          key={i}
          className="dashboard-section"
        >
          <h2 className="section-title">
            {section.title}
          </h2>

          <div className="module-row">

            {section.items.map((item) => (
              <div
                key={item.id}
                className="module-card"
                onClick={() =>
                  navigate(`/module/${item.id}`)
                }
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
    </div>
  )
}