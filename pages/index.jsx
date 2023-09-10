// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })
import { useState, useEffect } from 'react';

const apiKey = process.env.OMDB_API_KEY;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [films, setFilms] = useState([]);

  useEffect(() => {
    getInfo();
  }, [searchTerm]);

  const getInfo = () => {
    if (searchTerm.trim() === '') {
      // Если поле ввода пустое, не делать запрос
      setFilms([]);
    } else {
      fetch(`https://www.omdbapi.com/?apikey=a2b07930&s=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          setFilms(data.Search);
        });
    }
  };

  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search"
        placeholder="Введите название фильма..."
      />
      <div className="result">
        {films && films.length > 0 ? (
          films.map((film) => (
            <a
              href={`https://www.imdb.com/title/${film.imdbID}`}
              target="_blank"
              key={film.imdbID}
            >
              <div className="film">
                <h2>
                  {film.Title} ({film.Year})
                </h2>
                <img src={film.Poster} alt={film.Title} />
              </div>
            </a>
          ))
        ) : (
          <p>No films found</p>
        )}
      </div>
    </div>
  );
}