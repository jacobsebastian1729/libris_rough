import { followAction } from "../slices/following";
import { AppDispatch } from "../store";

export function fetchUserFollowing(url: string){
    return async (dispatch: AppDispatch) => {
        try {
            
            const response = await fetch(url)
            if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const userFollowing = await response.json()
            dispatch(followAction.getUserFollowingList(userFollowing))


        } catch (error) {
            
        }
    }
}

export function fetchUserFollowers(url: string){
    return async (dispatch: AppDispatch) => {
        try {
            
            const response = await fetch(url)
            if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const userFollowers = await response.json()
            dispatch(followAction.getUserFollwersList(userFollowers))


        } catch (error) {
            
        }
    }
}