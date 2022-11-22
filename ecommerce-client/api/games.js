import { BASE_PATH } from "../utils/constants"

export async function getLastGamesApi(limit) {
    try {
        const limitItems = `pagination[limit]=${limit}`
        const sortItem = `sort=createdAt:desc`
        const url = `${BASE_PATH}/api/games?${limitItems}&${sortItem}&populate=*`;
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        return null
    }
}

export async function getGamesPlatformApi(platform, limit, start) {
    try {
        const startItems = `pagination[start]=${start}`
        const limitItems = `pagination[limit]=${limit}`
        const sortItems = `sort=createdAt:desc`
        //get all games, not filtered by platform
        const url = `${BASE_PATH}/api/games?platform.url=${platform}&${sortItems}&${startItems}&${limitItems}&populate=*`
        const response = await fetch(url)
        const result = await response.json()
        let foundResult = result.data.filter((item) => item.attributes.platform.data.attributes.url === platform)
        return foundResult || null
    } catch (error) {
        return null
    }
}

export async function getTotalGamesPlatformApi(platform) {
    try {
        const url = `${BASE_PATH}/api/games/count?platform.url=${platform}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getGameByUrlApi(path) {
    try {
        const url = `${BASE_PATH}/api/games?url_eq=${path}&populate=*`;
        const response = await fetch(url);
        //get all results
        const results = await response.json();
        //find game
        let foundResult = results.data.find(function(result, index) {
            if(result.attributes.url == path)
                return true;
        });
        return foundResult.attributes;
    } catch (error) {
        console.log(error);
        return null;
    }
}