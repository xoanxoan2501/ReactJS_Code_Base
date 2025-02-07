import { auth, db } from '@/config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import store from '@/core/store/redux'
import {
  fetchProfile,
  loginAPI,
  logOut
} from '@/modules/authentication/profileStore'
import UserEntity from '@/modules/user/entity'
import { toast } from 'react-toastify'
import { ILogin } from '@/modules/authentication/interface'

const getProfile = async () => {
  auth.onAuthStateChanged(async (user) => {
    if (!user) return

    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      store.dispatch(fetchProfile({ user: new UserEntity(docSnap.data()) }))
    } else {
      toast.error('User not found!')
    }
  })
}

const login = async (data: ILogin) => {
  return await store.dispatch(loginAPI(data)).unwrap()
}

const logOutAuth = async () => {
  await auth.signOut()
  store.dispatch(logOut())
}

export default {
  getProfile,
  login,
  logOutAuth
}
