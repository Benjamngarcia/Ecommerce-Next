import { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout"
import { useRouter } from "next/router"
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import { Icon } from "semantic-ui-react";
import ChangeNameForm from "../components/Account/ChangeNameForm/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal/BasicModal";
import AddressForm from "../components/Account/AddressForm/AddressForm";

export default function account() {

    const [user, setUser] = useState(undefined)
    const { auth, logout, setReloadUser } = useAuth()
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout)
            setUser(response || null)
        })()
    }, [auth])

    if (user === undefined) return null

    if (!auth && !user) {
        router.replace("/")
        return null
    }

    return (
        <BasicLayout className="account">
            <Configuration user={user} logout={logout} setReloadUser={setReloadUser}/>
            <Adresses/>
        </BasicLayout>
    )
}


function Configuration(props) {
    const { user, logout, setReloadUser } = props 

    return (
        <div className="account__configuration">
            <div className="title">Configuración</div>
            <div className="data">
                <ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser}/>
                <ChangeEmailForm user={user} logout={logout} setReloadUser={setReloadUser}/>
                <ChangePasswordForm user={user} logout={logout}/>
            </div>
        </div>
    )
}

function Adresses() {
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [formModal, setFormModal] = useState(null)

    const openModal = (title) => {
        setTitleModal(title)
        setFormModal(<AddressForm setShowModal={setShowModal}/>)
        setShowModal(true)
    }
    return (
        <div className="account__adresses">
            <div className="title">
                <Icon name="plus" link onClick={() => openModal("Nueva dirección")}/>Direcciones
            </div>
            <div className="data">
                Lista de direcciones
            </div>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
                {formModal}
            </BasicModal>
        </div>
    )
}
