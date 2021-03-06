import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from './Reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: any) {
	const composeEnhancer: typeof compose =
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(
		rootReducer(history),
		preloadedState,
		composeEnhancer(applyMiddleware(routerMiddleware(history)))
	);

	// Hot reloading
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./Reducers', () => {
			store.replaceReducer(rootReducer(history));
		});
	}

	return store;
}
