import axios from 'axios';

const initState = {
  userInfo: {},
  contactIsOpen: false,
  chatIsOpen: false,
  userCart: [],
  allItems: [],
  searchKeyWord: ''
}

const GET_USER_INFO = "GET_USER_INFO";
const GET_USER_CART = "GET_USER_CART";
const CONTACT_IS_OPEN = "CONTACT_IS_OPEN";
const TOGGLE_CHAT = "TOGGLE_CHAT";
const GET_ALL_ITEMS = "GET_ALL_ITEMS";
const GET_SEARCH_KEYWORD = "GET_SEARCH_KEYWORD";

export default (state = initState, action) => {
  switch (action.type) {
    case GET_USER_INFO + '_FULFILLED':
      return { ...state, userInfo: action.payload }
    case GET_USER_CART + '_FULFILLED':
      return Object.assign({}, state, {userCart: action.payload});
    case CONTACT_IS_OPEN:
      return Object.assign({}, state, {contactIsOpen: !state.contactIsOpen});
    case TOGGLE_CHAT:
      return {...state, chatIsOpen: !state.chatIsOpen};
    case GET_ALL_ITEMS + '_FULFILLED':
      return {...state, allItems: action.payload}
    default:
      return state;
    case GET_SEARCH_KEYWORD:
      return {...state, searchKeyWord: action.payload};
  }
}

export const openCloseContact = () => {
  return {
    type: CONTACT_IS_OPEN
  }
}

export const toggleChat = () => {
  return {
    type: TOGGLE_CHAT
  }
}

export const getUserCart = () => {
  const promise = axios.get('/cart').then(res => res.data)

  return {
    type: GET_USER_CART,
    payload: promise
  }
}

export const getUserInfo = () => {
  const userInfo = axios.get('/api/userinfo').then(res => {
    return res.data[0]
  });

  return {
    type: GET_USER_INFO,
    payload: userInfo
  }
}

export const getAllItems = () => {
  let allItems = axios.get(`/api/all`).then(res => {
    return res.data;
  })
  
  return {
    type: GET_ALL_ITEMS,
    payload: allItems
  }
}

export const getSearchKeyWord = (keyword) => {
  return {
    type: GET_SEARCH_KEYWORD,
    payload: keyword
  }
}

