import React, { useState, useEffect }  from "react";
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken : new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p => p.name))
    })

    return ()=> cancel(); 
  }, [currentPageUrl])

  const gotoNext = () => {
    setCurrentPageUrl(nextPageUrl);
  }

  const gotoPrev = () => {
    setCurrentPageUrl(prevPageUrl)
  }

  if(loading) return "Loading...";

  return (
    <>
      <PokemonList pokemon={pokemon}/>
      <Pagination 
        gotoNext = {nextPageUrl ? gotoNext : null}
        gotoPrev = {prevPageUrl ? gotoPrev : null}
      />
    </>
  );

}

export default App;
