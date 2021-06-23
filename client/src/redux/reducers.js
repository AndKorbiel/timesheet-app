import {ADD_INITIAL_DATA, ADD_NEW_PROJECT, REMOVE_PROJECT_FROM_STORE} from "./types";

const initialState = {}

export default function MainReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_PROJECT:
            return {
                ...state,
                projectsList: [
                    ...state.projectsList,
                    action.payload
                ]
            }
        case ADD_INITIAL_DATA:
            return {
                ...state,
                projectsList: action.payload
            }
        case REMOVE_PROJECT_FROM_STORE:
            return {
                ...state,
                projectsList: [
                    ...state.projectsList.filter(el => el._id !== action.payload)
                ]
            }
        default:
            return state
    }
}