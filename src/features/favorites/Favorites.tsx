import {useNavigate} from 'react-router'
import s from './Favorites.module.css'
import {getPercentAndColor} from "@/common/utils/getPercentAndColor.ts";
import {noPosterAvailable} from "@/common/constants/constants.ts";
import {getFavoriteMovies} from "@/common/utils/getFavoriteMovies.ts";

export const Favorites = () => {
    const favorites = getFavoriteMovies();
    const navigate = useNavigate()


    const removeFavorite = (movieId: number) => {
        localStorage.removeItem(`movieId_${movieId}`)
        window.location.reload()
    }

    if (favorites.length === 0) {
        return <div className={s.empty}>No favorite movies yet</div>
    }

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>My Favorites</h2>
            <div className={s.grid}>
                {favorites.map((movie) => {
                    const {
                        percent,
                        backgroundColor
                    } = getPercentAndColor(movie.voteAverage)

                    return (
                        <div key={movie.movieId} className={s.card}>
                            <img
                                className={s.poster}
                                src={movie.posterUrl
                                    ? `${import.meta.env.VITE_IMAGE_URL}${movie.posterUrl}`
                                    : noPosterAvailable
                                }
                                alt={movie.title}
                                onClick={() => navigate(`/details/${movie.movieId}`)}
                            />
                            <div className={s.title_movie}>{movie.title}</div>
                            <span
                                style={{backgroundColor}}
                                className={s.badge}
                            >
                                {percent}%
                            </span>
                            <button
                                className={s.removeButton}
                                onClick={() => removeFavorite(movie.movieId)}
                            >
                                ❌
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}