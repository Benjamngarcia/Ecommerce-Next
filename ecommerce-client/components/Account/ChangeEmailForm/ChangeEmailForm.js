import { useState } from "react"
import { Form, Button } from "semantic-ui-react"
import { useFormik } from "formik"
import * as Yup from "Yup"
import { toast } from "react-toastify"
import { updateEmailApi } from "../../../api/user"

export default function ChangeEmailForm(props) {
    const { user, logout, setReloadUser } = props
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formatData) => {
            setLoading(true)
            const response = await updateEmailApi(user.id, formatData.email, logout)

            if (!response) {
                toast.error("Error al actualizar el correo electrónico")
            } 
            else if (response?.error){
                toast.error("Error al actualizar el correo electrónico")
            } 
            else {
                setReloadUser(true)
                toast.success("Correo electrónico actualizado correctamente")
                formik.handleReset()
            }
            setLoading(false)
        }
    })

    return (
        <div className="change-email-form">
            <h4>
                Cambia tu correo electrónico <span>(Tu correo actual: {user.email})</span>
            </h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                        name="email"
                        placeholder="Tu nuevo correo electrónico"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email}
                    />
                    <Form.Input
                        name="repeatEmail"
                        placeholder="Confirma el correo electrónico"
                        onChange={formik.handleChange}
                        value={formik.values.repeatEmail}
                        error={formik.errors.repeatEmail}
                    />
                </Form.Group>
                <Button basic type="submit" loading={loading}>Actualizar</Button>
            </Form>
        </div>
    )
}

function initialValues() {
    return {
        email: "",
        repeatEmail: ""
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true).oneOf([Yup.ref("repeatEmail")], true),
        repeatEmail: Yup.string().email(true).required(true).oneOf([Yup.ref("email")], true)
    }
}