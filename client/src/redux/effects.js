import { addInitialData, addNewProject, removeProjectFromStore } from './actions';

export const getAllProjectsEffect = () => {
    return dispatch => {
        fetch('/projects/get')
            .then(res => res.json())
            .then(data => {
                dispatch(addInitialData(data))
            })
            .catch(err => console.log(err))
    }
}

export const addNewProjectEffect = newProject => {
    return dispatch => {
        fetch('/projects/add', {
            method: 'POST',
            body: JSON.stringify(newProject),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch(addNewProject(data))
            })
            .catch(err => console.log(err))
    }
}

export const removeProjectEffect = project => {
    return dispatch => {
        fetch('/projects/remove?' + new URLSearchParams({
            id: project._id
        }))
            .then(res => res.json())
            .then(data => {
                dispatch(removeProjectFromStore(data))
            })
            .catch(err => console.log(err))
    }
}