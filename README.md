# stock-tracker-react-redux
Application allows you to select a specific stock and see information pertaining to it.

## Requirements
### Functional Requirements

- Must have a header with:
  - Adaptive Logo
  - Navigation bar:
    - Quotes
    - Markets
    - Watchlists
  
- Must have a search bar which allows the user to search for a specific stock
- To the right of that search bar have:
  - Real Time Price
  - How much price has increased or decreased
  - % of increase of decrease

- Must Display the following Key Stats of a specific stock:
    - Previous Close
    - Day Range
    - Volume
    - Market Cap
    - P/E Ratio
    - Open
    - 52 Week Range
    - Total Avg Volume
    - Earnings Per Share
    - Dividend & Yield

- Must Display a line Graph showing (X: Time ) against (Y: Real Time Price) of a specific stock
  - Top price(or current) must be highlighted
  - Graph has options to change time view to:
      - 1D
      - 5D
      - 1M
      - 1Y
      - 5Y
      - Max

- To the right of graph, must have Latest News of specific stock or stocks in general
- Under Latest News, must have Company Overview of that specific stock
- Under Company Overview, must have section for TOP PEERS
- At the footer:
  - Have US Market Stock Exchange Stats (e.g NASDAQ, DJIA, S&P)
  - Have a favourites section with user's favourite stocks

### Non-Functional Requirements

- Stock change in price must be:
  - Red if a decrease in price
  - Green if an increase in price
- Stock % change in price must be:
  - Red if a decrease in price
  - Green if an increase in price