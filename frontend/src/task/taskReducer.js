const INITIAL_STATE = { title: '', description: '', list: [], taskEdit: {} }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TITLE_CHANGED':
            return{ ...state, title: action.payload}
        case 'DESCRIPTION_CHANGED':
            return{ ...state, description: action.payload}
        case 'TASK_SEARCHED':
            return { ...state, list: action.payload}
        case 'EDIT_CHANGED':
            return { ...state, taskEdit: action.payload}
        case 'TASK_CLEAR':
            return{ ...state, title: '', description: '', taskEdit: {}}
        default:
            return state
    }
}