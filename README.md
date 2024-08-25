## Token.io

To run the development server: 

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Design/Architecture

There are two pages:
- `app/page.tsx`
- `app/details/[tokenSymbol]/[chainId]/page.tsx`

I have kept the pages as server components and placed the api fetching within these as I believe this is better practice due to the benefits associated.
[See benefits listed here](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

Actually, it makes sense to try and use server components as much as possible - not just for pages. Ideally, client components should be at 'leaf nodes' i.e they should be as nested as possible. However, in saying this, it also doesn't make sense to create unnecessary nesting just for the sake of delaying the use of 'use client'. A balanced approach should be took, both considering the efficiency and structure of the app. 

The main page houses a `<TokenOverview>` component which is the parent of `<TokenSearch>` and `<TokenGird>`. 

`<TokenSearch>` sets a searchTerm state via react context (`useSearchContext`). Originally, I didn't have a context for searchTerm, nor a seperate component for the search input and was instead using `useState` and 
`<input />` directly in `<TokenOverview>`. I moved the searchInput into its own component and decided to use a simple context setup so that I could extend my user of server components. By removing the need of `useState` within `<TokenOverview>`, `<TokenOverview>` no longer needs to be a client component. Moreover, handling the search term via context seems to have had a significant improvement on the lag when searching the tokens. 

`<TokenGrid>` is in charge of displaying the token data. I opted to use [Ag-grid](https://www.ag-grid.com/react-data-grid/getting-started/) to display the tokens. I am familiar with Ag-grid due to using it in previous roles but also, when I first started coding the app, I was playing around with a simple list and honestly - it looked kinda crap. It was messy to display such a large dataset in a list and didn't make sense from a design perspective.

I am displaying all the available token information on a Token object in the grid [API](https://apidocs.li.fi/reference/get_tokens). 

*NOTE*
The same information is available on a token object whether using the get request to fetch all tokens or just an individual token [Get Individual Token](https://apidocs.li.fi/reference/get_token). Ideally, when using `/token`, more information would be available and so the token details page would actually show more/different information in comparison to what is already being shown on the grid. But, for the purpose of this app, let's just IMAGINE that the token details page has more details... (thanks in advance lol).
 
There are a few things worth mentioning in relation to `<TokenGrid>`: 
- There are two useEffects which manage getting/setting the favourite data in localStorage. I opted to use localStorage for the purpose of favouriting tokens as this covers the use case where a user would want their favourite tokens to persist in their browser without the need to create an account/have authentication. As you can see, in both useEffects there is a check `if (typeof window !== "undefined" && !hasLoadedFromLocalStorage.current)`.

The localStorage object is part of the window object, which is only present in web browsers. This means that if your code is running on the server side, such as during server side rendering, the window object, and consequently the localStorage, will not be defined. From Next.js version 13 onwards, components are server-rendered by default. Components are pre-rendered into HTML on the server before being sent to the client, thus, the window object is not available on the server. This is why we need to check that window is available before we try and use local storage. `hasLoadedFromLocalStorage` stops the overriding of `favouritedTokens` in local storage.

- I am using custom cell renderers for the logo and favourite cell [What are custom cell renderers?](https://www.ag-grid.com/react-data-grid/component-cell-renderer/)

- `pinnedTopRowData` and `nonPinnedTopRowData` use the react `useMemo` hook. This is to increase efficiency. The result of the function call is reused when the dependencies (tokens, favouritedTokens) haven't changed. This is  better than recalculating the value on every render.

- By clicking on any cell in the grid (minus the favourite button cell), you are directed to that cell's associated token. 

`<TokenDetails />` has similar logic to the logic inside `<TokenGrid />` in regards to managing the local storage for favourites. The user is able to manage the favourite status of the token on the details page and this is reflected in the grid. 

## Improvements
- Perhaps some of the logic for localStorage/favourites could become shared util functions as it is used in both `<TokenDetails />` and `<TokenGrid />`. 
- When you favourite a token in the grid, the token gets pinned to the top of the grid however you lose your scroll position at the same time. Ideally, the user should remain in their current scroll position. 


There are also some small comments throughout the code to explain certain things! 🥳
