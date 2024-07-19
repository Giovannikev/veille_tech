
import { combineReducers, configureStore } from 'redux'

const Store = configureStore(
    combineReducers({
        todos: TodoReducer,
        filter: (state = 0, action) => state
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default Store; 