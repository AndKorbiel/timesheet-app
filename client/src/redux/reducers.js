import {ADD_INITIAL_DATA, ADD_NEW_PROJECT, REMOVE_PROJECT_FROM_STORE, UPDATE_PROJECT_IN_STORE, SET_LANGUAGE} from "./types";

const initialState = {
    translations: {
        English: {
            home_page_title: 'Welcome in timesheet app',
            home_page_subtitle: 'Please insert your work data:'
        },
        Polski: {
            home_page_title: 'Witamy w aplikacji do Timesheetów',
            home_page_subtitle: 'Wprowadź swoje dane:'
        }
    },
    selectedLanguage: 'English'
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
        case UPDATE_PROJECT_IN_STORE:
            return {
                ...state,
                projectsList: [
                    ...state.projectsList.map(el => {
                        if (el._id === action.payload._id) {
                            return action.payload
                        } else {
                            return el
                        }
                    })
                ]
            }
        case SET_LANGUAGE:
            return {
                ...state,
                selectedLanguage: action.payload
            }
        default:
            return state
    }
}