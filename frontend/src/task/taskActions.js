import axios from 'axios'

const URL = 'http://localhost:8080/TaskListApi/task'

const axiosConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export const changetitle = event => ({
    type: 'TITLE_CHANGED',
    payload: event.target.value
})

export const changedescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const openEdit = task => ({
    type: 'EDIT_CHANGED',
    payload: {task}
})

export const search = (deleted = false) => {
    return (dispatch, getState) => {
        const title = getState().task.title
        let search = title ? title : '*'
        search += deleted ? 'deleted' : ''

        const request = axios.get(`${URL}/list/${search}`)
            .then(resp => dispatch({type: 'TASK_SEARCHED', payload: resp.data}))
    }
}

export const add = (title, descripton) => {
    return dispatch => {
        axios.post(`${URL}/insert`, `${+new Date()},${title},${descripton}`, axiosConfig)
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }
}

export const remove = task => {
    return dispatch => {
        axios.put(`${URL}/update`,
                { ...task, status: 'deleted', editAt: `${+new Date()}`, doneAt: `${task.doneAt}` }, axiosConfig)
            .then(resp => dispatch(search()))
    }
}

export const markAsDone = task => {
    return dispatch => {
        axios.put(`${URL}/update`,
                { ...task, status: 'done', doneAt: `${+new Date().getTime()}`, editAt: `${+new Date().getTime()}` }, axiosConfig)
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = (task, deleted) => {
    return dispatch => {
        axios.put(`${URL}/update`,
                { ...task, status: 'pending', editAt: `${+new Date().getTime()}`, doneAt: `${task.doneAt}` }, axiosConfig)
            .then(resp => dispatch(search(deleted)))
    }
}

export const edit = (task, title, descripton) => {
    return dispatch => {
        axios.put(`${URL}/update`,
                { ...task, editAt: `${+new Date().getTime()}`, title, descripton}, axiosConfig)
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    return [{ type: 'TASK_CLEAR' }, search()]
}