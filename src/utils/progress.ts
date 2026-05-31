import { auth, db } from '../firebase'
import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'

export const completeSubmodule = async (
  submoduleId: string
) => {
  const user = auth.currentUser

  if (!user) return

  const ref = doc(db, 'users', user.uid)

  const snap = await getDoc(ref)

  if (!snap.exists()) return

  const data = snap.data()

  const completed =
    data.completedSubmodules ?? []

  if (completed.includes(submoduleId)) {
    return
  }

  await updateDoc(ref, {
    completedSubmodules: [
      ...completed,
      submoduleId,
    ],
  })
}