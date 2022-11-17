import { useState } from "react"
import { Form, Button } from "semantic-ui-react"
import { useFormik } from "formik"
import * as Yup from "Yup"
import useAuth from "../../../hooks/useAuth"
import { createAddressApi } from "../../../api/address"
import { toast } from "react-toastify"

export default function AddressForm(props) {
    const { setShowModal } = props
    const [loading, setLoading] = useState(false)
    const { auth, logout } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            createAddress(formData, logout)
        }
    })

    const createAddress = async(formData, logout) =>{
        setLoading(true)
        const formDataTemp = {
            ...formData,
            user: auth.idUser
        }
        const response = await createAddressApi(formDataTemp, logout)

        if (!response){
            toast.warning("Error al crear la dirección")
            setLoading(false)
        } else {
            formik.resetForm()
            setLoading(false)
            setShowModal(false)
        }
    }

    return (
        <Form className="address-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                name="title"
                type="text"
                label="Titulo de la dirección"
                placeholder="Casa"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title}
            />
            <Form.Group widths="equal">
                <Form.Input
                    name="name"
                    type="text"
                    label="Nombre y apellidos"
                    placeholder="Juanito Pérez Hernández"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                />
                <Form.Input
                    name="address"
                    type="text"
                    label="Dirección"
                    placeholder="Calle ejemplo 32-3"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    error={formik.errors.address}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="city"
                    type="text"
                    label="Ciudad"
                    placeholder="Mexico City"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    error={formik.errors.city}
                />
                <Form.Input
                    name="state"
                    type="text"
                    label="Estado/Provincia/Región"
                    placeholder="CDMX"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                    error={formik.errors.state}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="postalCode"
                    type="text"
                    label="Código postal/Zip"
                    placeholder="000000"
                    onChange={formik.handleChange}
                    value={formik.values.postalCode}
                    error={formik.errors.postalCode}
                />
                <Form.Input
                    name="phone"
                    type="text"
                    label="Teléfono"
                    placeholder="55 55555555"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                />
            </Form.Group>
            <div className="actions">
                <Button basic type="submit" loading={loading}>Guardar dirección</Button>
            </div>
        </Form>
    )
}

function initialValues() {
    return {
        title: "",
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
    }
}

function validationSchema() {
    return {
        title: Yup.string().required(true),
        name: Yup.string().required(true),
        address: Yup.string().required(true),
        city: Yup.string().required(true),
        state: Yup.string().required(true),
        postalCode: Yup.string().required(true),
        phone: Yup.string().required(true),
    }
}