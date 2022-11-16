import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function Auth(props) {

    const { onCloseModal, setTitleModal } = props
    const [showLogin, setShowLogin] = useState(true)

    const showLoginForm = () => {
        setShowLogin(true)
        setTitleModal("Iniciar sesión")
    }
    const showRegisterForm = () => {
        setShowLogin(false)
        setTitleModal("Crea una cuenta")
    }
    
    return showLogin ? (
        <LoginForm showRegisterForm={showRegisterForm} onCloseModal={onCloseModal}/> 
        ):(
        <RegisterForm showLoginForm={showLoginForm}/>
        )
}
