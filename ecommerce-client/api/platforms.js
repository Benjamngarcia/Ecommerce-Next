import { BASE_PATH } from "../utils/constants"

export async function getPlatformsApi(){
    try {
        const url = `${BASE_PATH}/api/platforms?sort=position:asc`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        return null
    }
}