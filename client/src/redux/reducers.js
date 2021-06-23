import {ADD_INITIAL_DATA, ADD_NEW_PROJECT} from "./types";

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
        default:
            return state
    }
}