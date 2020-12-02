import React from 'react'
import {GraphiQL} from 'graphiql'
import 'graphiql/graphiql.css'

/**
 * Fetcher for GraphiQL
 * @param query
 * @param variables
 * @returns {Promise<never>|Promise<Response | *>}
 */
const gqlFetcher = params => {
  if (!params.query || typeof params.query === 'undefined') return Promise.reject('No query.')

  return fetch(`https://countries.trevorblades.com/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .catch(response => response.text)
}


/**
 * Default query to fill form with.
 * @type {string}
 */
const defaultQuery = `
  query getCountries {
    countries{
      code
      name
      continent{
        name
      }
    }
  }
  
  query getLanguages {
    languages {
      code
      name
      native
      rtl
    }
  }
`

/**
 * Display GraphiQL
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  return (
    <div style={{height:'100vh'}}>
      <GraphiQL fetcher={gqlFetcher} defaultQuery={defaultQuery} />
    </div>
  );
}

export default App;
