export function reducer(state, action) {
    switch (action.type) {
        case 'ADD_RESPONSE':
            return {
                ...state,
                response: action.payload,
                loading: state.loading - 1
            }
        case 'ADD_SYMBOL':
            return {
                ...state,
                loading: 5,
                symbol: action.payload,
                response: false,
                latestNews: [],
                chartData: [],
                companyOverview: false,
                topPeers: [],
            }
        case 'ADD_COMPANIES':
            return {
                ...state,
                companies: action.payload
            }
        case 'ADD_COMPANY_OVERVIEW':
            return {
                ...state,
                companyOverview: action.payload,
                loading: state.loading - 1
            }
        case 'ADD_CHARTDATA':
            return {
                ...state,
                chartData: action.payload,
                loading: state.loading - 1
            }
        case 'ADD_NEWS':
            return {
                ...state,
                latestNews: action.payload,
                loading: state.loading - 1
            }
        case 'ADD_CHARTTIME':
            return {
                ...state,
                chartTime: action.payload
            }
        case 'ADD_TOP_PEERS':
            return {
                ...state,
                topPeers: action.payload,
                loading: state.loading - 1
            }
        case 'ADD_SEARCH_INPUT':
            return {
                ...state,
                searchInput: action.payload
            }
        case 'ADD_SUGGESTIONS':
            return {
                ...state,
                suggestions: action.payload
            }
        default:
            return state
    }
}