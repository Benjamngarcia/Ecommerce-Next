import { useState } from "react"
import { Form, Button } from "semantic-ui-react"
import { useFormik } from "formik"
import * as Yup from "Yup"
import { toast } from "react-toastify"
import { updatePasswordApi } from "../../../api/user"

export default function ChangePasswordForm(props) {
    const { user, logout } = props

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(user.password),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            const response = await updatePasswordApi(user.id, formData.password, logout)
            if(!response){
                toast.error("Error al actualizar nombre y apellidos")
            } else {
                logout()
            }
            setLoading(false)
        }
    })


    return (
        <div className="change-password-form">
            <h4>Cambiar tu contraseña</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                        name="password"
                        type="password"
                        placeholder="Nueva contraseña"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password}
                    />
                    <Form.Input
                        name="repeatPassword"
                        type="password"
                        placeholder="Confirme la nueva contraseña"
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                        error={formik.errors.repeatPassword}
                    />
                </Form.Group>
                <Button basic type="submit" loading={loading}>Actualizar</Button>
            </Form>
        </div>
    )
}

function initialValues() {
    return {
        password: "",
        repeatPassword: ""
    }
}

function validationSchema() {
    return {
        password: Yup.string().required(true).oneOf([Yup.ref("repeatPassword")], true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], true),
    }
}
