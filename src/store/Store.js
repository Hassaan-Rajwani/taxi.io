import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import reducer from './rootReducer'
import storage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {
    store,
    persistor
}