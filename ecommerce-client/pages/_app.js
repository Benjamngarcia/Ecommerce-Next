import { useState, useMemo, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import jwtDecode from "jwt-decode"
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { getToken, setToken, removeToken } from "../api/token"
import { getProductsCart, addProductCart, countProductsCart, removeProductCart } from "../api/cart";
import { useRouter } from "next/router"
import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined)
  const [reloadUser, setReloadUser] = useState(false)
  const [totalProductsCart, setTotalProductsCart] = useState(0)
  const [reloadCart, setReloadCart] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id
      })
    } else {
      setAuth(null)
    }
    setReloadUser(false)
  }, [reloadUser])

  useEffect(() => {
    setTotalProductsCart(countProductsCart)
    setReloadCart(false)
  }, [reloadCart, auth])
  


  const login = (token) => {
    setToken(token)
    setAuth({
      token,
      idUser: jwtDecode(token).id
    })
  }

  const logout = () => {
    if (auth) {
      removeToken()
      setAuth(null)
      router.push("/")
    }
  }

  const addProduct = (product) =>{
    if(auth){
      addProductCart(product)
      setReloadCart(true)
    } else {
      toast.warning("Para comprar un juego tienes que inciar sesión")
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

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductCart: getProductsCart,
      removeProductCart: removeProductCart,
      removeAllProductCart: () => null
    }),
    [totalProductsCart, auth]
  )

  if (auth === undefined) return null

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
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
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}

