import { ADD_NEW_PROJECT } from "./types";

export function addNewProject(project) {
    return {
        type: ADD_NEW_PROJECT,
        payload: project
    }
}