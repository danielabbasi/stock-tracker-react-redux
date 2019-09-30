export const addResponseAction = (response) => ({
    type: 'ADD_RESPONSE',
    payload: response
})

export const addSymbolAction = (symbol) => ({
    type: 'ADD_SYMBOL',
    payload: symbol
})

export const addCompaniesAction = (companies) => ({
    type: 'ADD_SYMBOL',
    payload: companies
})

export const addChartDataAction = (chartData) => ({
    type: 'ADD_CHARTDATA',
    payload: chartData
})

export const addLatestNewsAction = (latestNews) => ({
    type: 'ADD_NEWS',
    payload: latestNews
})
export const addChartTimeAction = (chartTime) => ({
    type: 'ADD_CHARTTIME',
    payload: chartTime
})