import { ADD_NEW_PROJECT } from "./types";

const initialState = {
    projectsList: [{id: 1, title: "Test Project", desc: "adsad ss"}, {id: 2, title: "Second project"}]
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