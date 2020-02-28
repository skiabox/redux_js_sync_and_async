const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore; //method
const combineReducers = redux.combineReducers; //function
const applyMiddleware = redux.applyMiddleware; //function
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

//action creator for cakes
function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First redux action'
  };
}

//action creator for icecreams
function buyIceCream() {
  return {
    type: BUY_ICECREAM
  };
}

// (previousState, action) => newState

const initialCakeState = {
  numOfCakes: 10
};

const initialIceCreamState = {
  numOfIceCreams: 20
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      };

    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state', store.getState());

//subscribe function returns a function that unsubscribes the change listener
const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
