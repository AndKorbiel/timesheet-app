import { ADD_NEW_PROJECT } from "./types";

const initialState = {
    projectsList: ['3dsada', 2, 3]
}

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
        default:
            return state
    }
}