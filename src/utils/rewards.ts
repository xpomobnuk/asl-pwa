import { auth, db } from '../firebase'
import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'

export const saveReward = async (
  reward: number
) => {
  const user = auth.currentUser

  if (!user) return

  const ref = doc(db, 'users', user.uid)

  const snap = await getDoc(ref)

  if (!snap.exists()) return

  const data = snap.data()

  await updateDoc(ref, {
    xp: (data.xp ?? 0) + reward,
    energy: (data.energy ?? 5) - 1,
  })
}