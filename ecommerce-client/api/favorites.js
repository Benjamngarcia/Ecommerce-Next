import { BASE_PATH } from "../utils/constants"
import { authFetch } from "../utils/fetch"

export async function isFavoriteApi(idUser, idGame, logout) {
    try {
        const url = `${BASE_PATH}/api/favorites?user=${idUser}&game=${idGame}`;
        return await authFetch(url, null, logout);
    } catch (error) {
        console.log(error);
        return null;
    }
}