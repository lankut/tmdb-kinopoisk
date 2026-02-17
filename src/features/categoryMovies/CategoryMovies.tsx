import s from './CategoryMovies.module.css'
import {useFetchMoviesPopularQuery} from "@/app/api/moviesApi.ts";

export const CategoryMovies = () => {

    const {data: popularMovies} = useFetchMoviesPopularQuery()

    return (
        <div className={s.container}>
            <h2 className={s.title}>Category Movies</h2>
            <div className={s.wrapper_movies}>
                {popularMovies?.results && popularMovies.results.length > 0 ? (
                    popularMovies.results.map((movie) => (
                        <div key={movie.id} className={s.item}>
                            {movie.poster_path && (
                                <img
                                    className={s.size_movies}
                                    src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            )}
                            <div className={s.description}>
                                <div
                                    style={{fontWeight: 'bold'}}>{movie.title}</div>
                                <div>{movie.release_date}</div>
                                <div>{movie.overview}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span>Загрузка фильмов или данных нет</span>
                )}
            </div>
        </div>
    );
};