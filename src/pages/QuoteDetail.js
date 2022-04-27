import React, { useEffect } from 'react'
import { Route, useParams, Link, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import {getSingleQuote} from '../lib/api'

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const {id} = params;
  
  const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(id);
  },[sendRequest, id]);
  
  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered'>{error}</p>
  }

  if(!loadedQuote.text)
    return <p>No Quote Found!!</p>

  return (
    <div>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.url} exact>
        <Link to={`${match.url}/comments`} className='btn--flat'>Comments</Link>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />  
      </Route>
    </div>
  )
}

export default QuoteDetail