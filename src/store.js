
import { createStore } from 'redux';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle'; 

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState                    // Load the persisted state as the initial state.
);

store.subscribe(throttle(() => {    // Use lodash's throttle to limit saving to once per second
  saveState({
    todos: store.getState().todos   // Only save the todos part if your state includes more data
  });
}, 1000));

export default store;
