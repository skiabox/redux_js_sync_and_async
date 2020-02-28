const redux = require('redux');
const createStore = redux.createStore; //function that returns an object
const applyMiddleware = redux.applyMiddleware; //function
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const initialState = {
  loading: false,
  users: [],
  error: ''
};

//action types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//action creators
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
};

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
};

// async action creator
// with redux-thunk, action creator can return a function instead of an action
const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // response.data is the array of users
        const users = response.data.map(user => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch(error => {
        // error.message is the error description
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

//reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: 'action.payload'
      };

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware)); //returns an object
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
