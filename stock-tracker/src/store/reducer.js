export function reducer(state, action) {
    switch (action.type) {
        case 'ADD_RESPONSE':
            return {
                ...state,
                response: action.payload
            }
        case 'ADD_SYMBOL':
            return {
                ...state,
                symbol: action.payload,
            }
        case 'ADD_COMPANIES':
            return {
                ...state,
                companies: action.payload
            }
        case 'ADD_COMPANY_OVERVIEW':
            return {
                ...state,
                companyOverview: action.payload
            }
        case 'ADD_CHARTDATA':
            return {
                ...state,
                chartData: action.payload
            }
        case 'ADD_NEWS':
            return {
                ...state,
                latestNews: action.payload
            }
        case 'ADD_CHARTTIME':
            return {
                ...state,
                chartTime: action.payload
            }
        case 'ADD_TOP_PEERS':
            return {
                ...state,
                topPeers: action.payload
            }
        default:
            return state
    }
}