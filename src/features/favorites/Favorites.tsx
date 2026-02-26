import {useNavigate} from 'react-router'
import s from './Favorites.module.css'
import {noPosterAvailable} from "@/common/constants/constants.ts";
import {getFavoriteMovies} from "@/common/utils/getFavoriteMovies.ts";
import {Button} from "@/common/components/Button";
import {useState} from "react";

export const Favorites = () => {

    const navigate = useNavigate()

    const [favorites, setFavorite] = useState(getFavoriteMovies())

    const removeFavorite = (movieId: number) => {
        localStorage.removeItem(`movieId_${movieId}`)
        setFavorite(getFavoriteMovies())
    }

    if (favorites.length === 0) {
        return <div className={s.empty}>No favorite movies yet</div>
    }

    return (
        <div>
            <h2 className={s.title}>My Favorites</h2>
            <div className={s.wrapper}>

                {favorites.map((movie) => {

                    return (
                        <div className={s.container} key={movie.movieId}>
                            <img className={s.image}
                                 src={movie.posterUrl
                                     ? `${import.meta.env.VITE_IMAGE_URL}${movie.posterUrl}`
                                     : noPosterAvailable
                                 }
                                 alt={movie.title}
                                 onClick={() => navigate(`/details/${movie.movieId}`)}
                            />
                            <div className={s.title_movie}>{movie.title}</div>
                            <span>Rating: {movie.voteAverage.toFixed(1)}</span>
                            <Button
                                onClick={() => removeFavorite(movie.movieId)}
                                title={'Remove'}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}