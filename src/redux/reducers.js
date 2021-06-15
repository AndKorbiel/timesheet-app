import { ADD_NEW_PROJECT } from "./types";

const initialState = {
    projectsList: [{id: 1, title: "Test Project"}, {id: 2, title: "Second project"}]
}

export default function MainReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_PROJECT:
            return {
                ...state,
                projectsList: [
                    ...state.projectsList,
                    {id: 3, title: action.payload}
                ]
            }
        default:
            return state
    }
}