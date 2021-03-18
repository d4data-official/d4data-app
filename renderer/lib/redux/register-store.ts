import { createStore, Store } from 'redux';
import { on } from 'lib/ipc';
import { mainReducer } from 'lib/redux';

function registerStore(chanel: string, callback: (store: Store) => void) {
  const store = createStore(mainReducer);
  on<[string, any]>(chanel, (e, ...args) => {
    const [dataName, data] = args;
    if (!dataName) { return; }
    const action = {
      type: 'SET',
      dataName,
      data,
    };
    store.dispatch(action);
  });
  callback(store);
}

export default registerStore;
