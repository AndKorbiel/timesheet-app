import { ADD_NEW_PROJECT, ADD_INITIAL_DATA } from "./types";

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