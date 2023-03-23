import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';


function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState('');

  const addFavouriteMovie = (movie) => {
    const newFavourite = [...favourites, movie];
    setFavourites(newFavourite);
  }

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=70f12d2c`;
    
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
    
  }

  useEffect(() => {
    getMovieRequest();
  }, [searchValue]);

  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList 
          handleFavouritesClick={addFavouriteMovie} 
          movies={movies} 
          favouriteComponent={AddFavourites} 
        />
      </div>
      <div className='row'>
        <MovieList 
          handleFavouritesClick={addFavouriteMovie}
          movies={favourites} 
          favouriteComponent={AddFavourites}
        />
      </div>
    </div>
  );
}

export default App;
