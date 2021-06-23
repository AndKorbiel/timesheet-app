import { addInitialData } from './actions';

export const getAllProjectsEffect = () => {
    return dispatch => {
        fetch('/projects/getAll')
            .then(res => res.json())
            .then(data => {
                dispatch(addInitialData(data))
            })
            .catch(err => console.log(err))
    }
}