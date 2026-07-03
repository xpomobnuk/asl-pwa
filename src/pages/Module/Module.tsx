import { useParams, useNavigate } from 'react-router-dom'
import type { ModuleGroup } from '../../types/module'
import { useEffect, useState } from 'react'
import { ROUTES } from '../../routes'
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
import { auth } from '../../firebase'
import {
  getUserProgress,
  calculateLessonStates,
} from '../../services/progress'
import './Module.css'

export const Module = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [openGroup, setOpenGroup] = useState<string>('')
  const [progress, setProgress] = useState<
    Record<string, { accuracy: number }>
  >({})

  const moduleTitle = id === 'alphabet' ? 'Alphabet ABC' : 'Module'

  const groups: ModuleGroup[] = [
    {
      id: 'beginner',

      title: 'Beginner',

      image: '/modules/abc/group-beginner.svg',

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

      image: '/modules/abc/group-intermediate.svg',

      color: 'yellow',

      lessons: [
        intermediate1,
        intermediate2,
      ],
    },

    {
      id: 'pro',

      title: 'Pro',

      image: '/modules/abc/group-pro.svg',

      color: 'orange',

      lessons: [],
    },
  ]

  const allLessonIds = groups.flatMap(group =>
    group.lessons.map(lesson => lesson.id)
  )
  const lessonStates =
    calculateLessonStates(
      allLessonIds,
      progress
    )


  const totalLessons = groups.reduce(
    (total, group) =>
      total + group.lessons.length,
    0
  )

  useEffect(() => {

    const loadProgress = async () => {

      const user = auth.currentUser

      if (!user) {
        return
      }

      const data =
        await getUserProgress(user.uid)

      setProgress(data)

    }

    loadProgress()

  }, [])


  return (
    <div className="container module-page">

      {/* HEADER */}
      <div className="module-header">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(ROUTES.LEARN)}
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

                  const lessonState =
                    lessonStates[lesson.id]

                  return (

                    <div
                      key={lesson.id}
                      className={`lesson-card ${lessonState.status}`}
                      onClick={() => {

                        if (
                          lessonState.status === 'locked'
                        ) {
                          return
                        }

                        navigate(
                          ROUTES.LESSON(lesson.slug),
                          {
                            state: {
                              returnTo: ROUTES.MODULE(id!),
                            },
                          }
                        )

                      }}
                    >

                      <div
                        className={`lesson-card-image ${lessonState.status}`}
                        style={{
                          backgroundImage:
                            `url(${lesson.image})`,
                        }}
                      />

                      {lessonState.status === 'locked' && (

                        <div className="lesson-lock">

                          <img
                            src="/modules/submodules/locked.svg"
                            alt="Locked lesson"
                          />

                        </div>

                      )}

                      {lessonState.status === 'completed' && (

                        <div className="lesson-complete">

                          <img
                            src="/modules/submodules/complete.svg"
                            alt="Completed lesson"
                          />

                        </div>

                      )}

                      <div
                        className="lesson-card-content"
                      >
                        <h4>{lesson.title}</h4>

                        <div className="lesson-title-line" />

                        <p>
                          {lesson.description}
                        </p>

                        <div className="lesson-footer">

                          <div className="lesson-best">

                            {lessonState.bestAccuracy !== null ? (
                              <>
                                <img
                                  src="/modules/submodules/score.svg"
                                  alt=""
                                  className="lesson-best-icon"
                                />

                                <div className="lesson-best-info">

                                  <span>
                                    Best {lessonState.bestAccuracy}%
                                  </span>

                                  {lessonState.status !== 'completed' && (
                                    <small>
                                      Reach 80% to unlock next lesson
                                    </small>
                                  )}

                                </div>
                              </>
                            ) : (
                              <>
                                <img
                                  src="/modules/submodules/new.svg"
                                  alt=""
                                  className="lesson-best-icon"
                                />

                                <div className="lesson-best-info">

                                  <span>
                                    New lesson
                                  </span>

                                  {lessonState.status === 'locked' && (
                                    <small>
                                      Unlock at 80%
                                    </small>
                                  )}

                                </div>
                              </>
                            )}

                          </div>

                          <button
                            className={`lesson-action ${lessonState.status}`}
                            disabled={lessonState.status === 'locked'}
                          >

                            {lessonState.status === 'completed' ? (
                              <>
                                <span>Review</span>
                              </>
                            ) : lessonState.status === 'available' ? (
                              <>
                                <span>Continue</span>
                              </>
                            ) : (
                              <>
                                <span>Locked</span>
                              </>
                            )}

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