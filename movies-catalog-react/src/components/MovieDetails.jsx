// En MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: '4cf8e3af67a501aff96025ff92c0f395',
            append_to_response: 'credits,videos',
          },
        });

        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Error al cargar los detalles de la película. Inténtalo de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='movie-details-container'>
      <div className='movie-details-image-container'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className='movie-details-image'
        />
      </div>
      <div className='movie-details-info'>
        <h2>{movieDetails.title}</h2>
        {movieDetails.overview && <p>{movieDetails.overview}</p>}
        <p>
          <strong>Rating:</strong> {movieDetails.vote_average}
        </p>
        <p>
          <strong>Classification:</strong> {movieDetails.adult ? 'Adult' : 'For all audiences'}
        </p>
        <p>
          <strong>Duration:</strong> {movieDetails.runtime} minutes
        </p>
        <p>
          <strong>Genres:</strong>{' '}
          {movieDetails.genres.map((genre) => genre.name).join(', ')}
        </p>
        <p>
          <strong>Director:</strong> {getDirector(movieDetails.credits)}
        </p>
        {movieDetails.videos?.results.length > 0 && (
          <p>
            <strong>Play Trailer:</strong>{' '}
            <a
              href={`https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Watch Trailer
            </a>
          </p>
        )}
        {movieDetails.credits?.cast && movieDetails.credits.cast.length > 0 ? (
          <div className='cast-carousel'>
            <h3>Main Cast</h3>
            <Slider
              dots
              infinite
              speed={500}
              slidesToShow={4}
              slidesToScroll={4}
              prevArrow={<button className='slick-prev'>‹</button>}
              nextArrow={<button className='slick-next'>›</button>}
            >
              {movieDetails.credits.cast.map((actor) => (
                <div key={actor.id} className='actor-item'>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <p>{actor.name}</p>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
    </div>
  );
};

const getDirector = (credits) => {
  const director = credits?.crew.find((person) => person.job === 'Director');
  return director?.name || 'Not available';
};

export default MovieDetails;
