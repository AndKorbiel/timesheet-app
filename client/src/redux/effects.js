import { addInitialData, addNewProject, removeProjectFromStore, updateProjectInStore, handleLogin } from './actions';

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

export const updateProjectEffect = project => {
    return dispatch => {
        fetch('/projects/update', {
            method: "PUT",
            body: JSON.stringify(project),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch(updateProjectInStore(data))
            })
            .catch(err => console.log(err))
    }
}

export const sendTimesheetEffect = project => {
    return dispatch => {
        fetch('/projects/send-ts', {
            method: "PUT",
            body: JSON.stringify(project),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch(updateProjectInStore(data))
            })
            .catch(err => console.log(err))
    }
}

export const updateTimesheetEffect = project => {
    return dispatch => {
        fetch('/projects/update-ts', {
            method: "PUT",
            body: JSON.stringify(project),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch(updateProjectInStore(data))
            })
            .catch(err => console.log(err))
    }
}

export const loginEffect = data => {
    return dispatch => {
        fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.isSuccess) {
                    sessionStorage.setItem("ts-app", "loggedIn");
                }
                dispatch(handleLogin(data))
            })
            .catch(err => console.log(err))
    }
}