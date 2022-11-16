import { useState, useMemo, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import jwtDecode from "jwt-decode"
import AuthContext from "../context/AuthContext";
import { getToken, setToken, removeToken } from "../api/token"
import { useRouter } from "next/router"
import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined)
  const [reloadUser, setReloadUser] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if(token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id
      })
    } else {
      setAuth(null)
    }
    setReloadUser(false)
  }, [reloadUser])
  

  const login = (token) => {
    setToken(token)
    setAuth({
      token,
      idUser: jwtDecode(token).id
    })
  }

  const logout = () => {
    if(auth){
      removeToken()
      setAuth(null)
      router.push("/")
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }), 
    [auth]
  )

  if(auth === undefined) return null

  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthContext.Provider>
  )
}

