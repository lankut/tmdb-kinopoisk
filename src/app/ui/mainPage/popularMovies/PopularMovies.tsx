import s from './PopularMovies.module.css';
import type {
    MovieResponseWithMovieFavorite,
    MovieWithFavorite
} from "@/app/api/type.ts";
import {useNavigate} from "react-router";
import {Path} from "@/common/routing";
import {getPercentAndColor} from "@/common/utils/getPercentAndColor.ts";
import {getDate} from "@/common/utils/getDate.ts";
import {useAppDispatch} from "@/common/hooks";
import {popularMoviesApi} from "@/app/api/popularMoviApi.ts";


type Props = {
    popularMovies: MovieResponseWithMovieFavorite | undefined;
}

export const PopularMovies = ({popularMovies}: Props) => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const onViewMore = () => {
        navigate(Path.CategoryMovies)
    }
    const toggleFavorite = (movieId: number) => {
        dispatch(
            popularMoviesApi.util.updateQueryData('fetchMoviesPopular', undefined, (draft) => {
                const movie = draft.results.find((movie:MovieWithFavorite) => movie.id === movieId);
                if (movie) {
                    movie.isFavorite = !movie.isFavorite;
                }
            })
        );
    }

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Popular Movies</h2>
            <div className={s.wrapper_movies}>
                {popularMovies?.results.slice(0, 6).map((movie:MovieWithFavorite) => {
                        const {
                            percent,
                            backgroundColor
                        } = getPercentAndColor(movie.vote_average)

                        return <div key={movie.id} className={s.image}>
                            {movie.id && (
                                <img className={s.size_movies}
                                     src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`
                                     } alt={movie.title}/>
                            )}
                            <div style={{
                                textAlign: 'center',
                                fontWeight: 'Bold'
                            }}>{movie.title}</div>
                            <div
                                style={{
                                    textAlign: 'center',
                                    opacity: '0.7'
                                }}>{getDate(movie.release_date)}</div>
                            <span
                                style={{backgroundColor: backgroundColor}}
                                className={s.badge}>{percent}%</span>

                            {/*// ДЕЛАЮ*/}
                            <button
                                className={`${s.favButton} ${movie.isFavorite ? s.active : ''}`}
                                onClick={() => toggleFavorite(movie.id)}
                            >
                                <span
                                    className={s.heartIcon}>{movie.isFavorite ? '❤️' : '🤍'}</span>
                            </button>


                        </div>
                    }
                )}
                <button className={s.button}
                        onClick={onViewMore}>View
                    More
                </button>
            </div>
        </div>

    );
};