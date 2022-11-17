import { Form, Button } from "semantic-ui-react"

export default function AddressForm() {
    return (
        <Form className="address-form">
            <Form.Input
                name="title"
                type="text"
                label="Titulo de la dirección"
                placeholder="Casa"
            />
            <Form.Group widths="equal">
                <Form.Input
                    name="name"
                    type="text"
                    label="Nombre y apellidos"
                    placeholder="Juanito Pérez Hernández"
                />
                <Form.Input
                    name="address"
                    type="text"
                    label="Dirección"
                    placeholder="Calle ejemplo 32-3"
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="city"
                    type="text"
                    label="Ciudad"
                    placeholder="Mexico City"
                />
                <Form.Input
                    name="state"
                    type="text"
                    label="Estado/Provincia/Región"
                    placeholder="CDMX"
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="postalCode"
                    type="text"
                    label="Código postal/Zip"
                    placeholder="000000"
                />
                <Form.Input
                    name="phone"
                    type="text"
                    label="Teléfono"
                    placeholder="55 55555555"
                />
            </Form.Group>
            <div className="actions">
                <Button basic type="submit">Guardar dirección</Button>
            </div>
        </Form>
    )
}
