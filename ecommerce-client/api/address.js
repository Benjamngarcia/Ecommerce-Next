import { BASE_PATH } from "../utils/constants"
import { authFetch } from "../utils/fetch"

export async function createAddressApi(address, logout) {
    try {
        const url = `${BASE_PATH}/api/addresses`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data: address}),
        };
        const result = await authFetch(url, params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getAddressesApi(idUser, logout) {
    try {
        const url = `${BASE_PATH}/api/adresses?user=${idUser}`
    } catch (error) {
        return null;
    }
}