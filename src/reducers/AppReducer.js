let initialState = {
  sharesInput: 0 // Stupid FB warning about controlled inputs
}

export default(state = initialState, payload) => {
  switch (payload.type) {
    case 'CONNECT_UPORT':
      return {
        ...state,
        uport: payload.data,
        signTransactionPage: true
      }
      
    case 'GET_CURRENT_SHARES_REQUEST':
      return {
        ...state,
        gettingShares: true
      }
    case 'GET_CURRENT_SHARES_SUCCESS':
      return {
        ...state,
        gettingShares: false,
        sharesTotal: payload.data
      }
    case 'GET_CURRENT_SHARES_ERROR':
      return {
        ...state,
        gettingShares: false,
        error: payload.data
      }
    case 'UPDATE_SHARES_INPUT':
      return {
        ...state,
        sharesInput: payload.data
      }

    case 'BUY_SHARES_REQUEST':
      return {
        ...state,
        confirmingInProgress: true
      }
    case 'BUY_SHARES_PENDING':
      return {
        ...state,
        buyingInProgress: true,
        confirmingInProgress: false
      }
    case 'BUY_SHARES_SUCCESS':
      return {
        ...state,
        txHash: payload.tx,
        buyingInProgress: false,
        sharesTotal: payload.data
      }
    case 'BUY_SHARES_ERROR':
      return {
        ...state,
        buyingInProgress: false,
        sharesTotal: payload.data
      }

    case 'BUY_SHARES_DEMO_COMPLETE':
      return {
        ...state,
        collectCredentialsPage: true
      }

    case 'CREDENTIALS_DEMO_COMPLETE':
      return {
        ...state,
        registerYourAppPage: true
      }
    case 'LOGOUT':
      return {
        ...state,
        uport: null,
        logOutPage: true
      }
    default:
      return state
  }
}
