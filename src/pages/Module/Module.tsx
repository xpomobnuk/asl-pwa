import { useParams, useNavigate } from 'react-router-dom'
import type { ModuleGroup } from '../../types/module'
import { useState } from 'react'
import {
  beginner1,
  beginner2,
  beginner3,
  beginner4,
  beginner5,
  beginner6,
  beginner7,
  beginner8,
  intermediate1,
  intermediate2,
} from '../../lessons/alphabet'
import { getLessonProgress } from '../../utils/lessonProgress'
import './Module.css'

export const Module = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [openGroup, setOpenGroup] = useState('beginner')

  const moduleTitle = id === 'alphabet' ? 'Alphabet ABC' : 'Module'

  const groups: ModuleGroup[] = [
    {
      id: 'beginner',

      title: 'Beginner',

      image: '/modules/abc/group-beginner.png',

      color: 'blue',

      lessons: [
        beginner1,
        beginner2,
        beginner3,
        beginner4,
        beginner5,
        beginner6,
        beginner7,
        beginner8,
      ],
    },

    {
      id: 'intermediate',

      title: 'Intermediate',

      image: '/modules/abc/group-intermediate.png',

      color: 'yellow',

      lessons: [
        intermediate1,
        intermediate2,
      ],
    },

    {
      id: 'pro',

      title: 'Pro',

      image: '/modules/abc/group-pro.png',

      color: 'orange',

      lessons: [],
    },
  ]


  const totalLessons = groups.reduce(
    (total, group) =>
      total + group.lessons.length,
    0
  )


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
        {totalLessons} Lessons
      </div>

      {/* LIST */}
      <div className="submodules">

        {groups.map((group) => (
          <div key={group.id} className="group-wrap">

            <div
              className="group-card"
              onClick={() =>
                setOpenGroup(
                  openGroup === group.id
                    ? ''
                    : group.id
                )
              }
            >

              <div
                className="group-image"
                style={{
                  backgroundImage:
                    `url(${group.image})`
                }}
              />

              <div className="group-footer">

                <span className="group-title">
                  {group.title}
                </span>

                <span
                  className={`group-arrow ${openGroup === group.id
                    ? 'open'
                    : ''
                    }`}
                >
                  ›
                </span>

              </div>

            </div>

            {openGroup === group.id && (

              <div className="group-content">

                {group.lessons.map((lesson) => {

                  const progress =
                    getLessonProgress(lesson.id)

                  return (

                    <div
                      key={lesson.id}
                      className={`lesson-card ${progress.status}`}
                      onClick={() => {

                        if (
                          progress.status === 'locked'
                        ) {
                          return
                        }

                        navigate(
                          `/lesson/${lesson.slug}`,
                          {
                            state: {
                              returnTo: `/module/${id}`,
                            },
                          }
                        )

                      }}
                    >

                      <div
                        className={`lesson-card-image ${progress.status}`}
                        style={{
                          backgroundImage:
                            `url(${lesson.image})`,
                        }}
                      />

                      {progress.status === 'locked' && (

                        <div className="lesson-lock">

                          🔒

                        </div>

                      )}

                      <div
                        className="lesson-card-content"
                      >
                        <h4>{lesson.title}</h4>

                        <p>
                          {lesson.description}
                        </p>

                        <div className="lesson-footer">

                          <div className="lesson-best">

                            {
                              progress.bestAccuracy !== null
                                ? `⭐ Best ${progress.bestAccuracy}%`
                                : 'New lesson'
                            }

                          </div>

                          <button
                            className={`lesson-action ${progress.status}`}
                            disabled={progress.status === 'locked'}
                          >

                            {
                              progress.status === 'completed'
                                ? '✓ Review'
                                : progress.status === 'available'
                                  ? 'Continue'
                                  : '🔒 Locked'
                            }

                          </button>

                        </div>
                      </div>

                    </div>

                  )
                })}


              </div>

            )}

          </div>
        ))}

      </div>

    </div>
  )
}