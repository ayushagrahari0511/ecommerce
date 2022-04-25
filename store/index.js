import {configureStore, combineReducers,} from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import user from './userSlice'
import cart from './cartSlice'
import product from './productSlice'

//* create the persist object config that will be stored to the storage:
//* ------------------------
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistCart = {
    key: 'cart',
    version: 1,
    storage,
};

const persistProduct = {
    key: 'product',
    version: 1,
    storage,
};
// * combine the reducers --------
// *------------------
const rootReducer = combineReducers({
    user
})

const cartReducer = combineReducers({cart})

const productReducer = combineReducers({product})

//* Creating a persistent reducer:--------
// *----------------
const persistedReducer = persistReducer(persistConfig, rootReducer);

const pesistedCartReducer = persistReducer(persistCart, cartReducer);

const productStore = persistReducer(persistProduct, productReducer)


// * assinging the persist reducer to reducer 
export const store = configureStore({
    reducer: {persistedReducer, pesistedCartReducer, productStore},
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [
                FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
            ],
        }
    }) 
})

export let persistor = persistStore(store);