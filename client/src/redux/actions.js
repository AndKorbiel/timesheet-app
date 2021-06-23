import { ADD_NEW_PROJECT, ADD_INITIAL_DATA, REMOVE_PROJECT_FROM_STORE } from "./types";

export function addNewProject(project) {
    return {
        type: ADD_NEW_PROJECT,
        payload: project
    }
}

export function addInitialData(payload) {
    return {
        type: ADD_INITIAL_DATA,
        payload
    }
}

export function removeProjectFromStore(project) {
    return {
        type: REMOVE_PROJECT_FROM_STORE,
        payload: project
    }
}