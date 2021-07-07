import { ADD_NEW_PROJECT, ADD_INITIAL_DATA, REMOVE_PROJECT_FROM_STORE, UPDATE_PROJECT_IN_STORE, SET_LANGUAGE } from "./types";

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

export function updateProjectInStore(project) {
    return {
        type: UPDATE_PROJECT_IN_STORE,
        payload: project
    }
}

export function setLanguage(language) {
    return {
        type: SET_LANGUAGE,
        payload: language
    }
}