export function todosReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO_ACTION:
            return [...state, { id: ++id, completed: false, ...action.payload }];
        default:
            return state;
    }
};
