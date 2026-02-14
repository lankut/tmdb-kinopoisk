import s from './PopularMovies.module.css';
import type {MovieResponse} from "@/app/api/type.ts";
import {useAppDispatch} from "@/common/hooks";
import {useNavigate} from "react-router";
import {setPopularMovies} from "@/app/model/appSlice.ts";
import {Path} from "@/common/routing";
import {useEffect} from "react";


type Props = {
    popularMovies: MovieResponse | undefined;
}

export const PopularMovies = ({popularMovies}: Props) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (popularMovies) {
            dispatch(setPopularMovies(popularMovies))
        }

    }, [popularMovies, dispatch])

    const onViewMore = () => {
        navigate(Path.CategoryMovies)
    }

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Popular Movies</h2>
            <div className={s.wrapper_movies}>
                {popularMovies?.results.slice(0, 6).map((movie) => {
                        return <div key={movie.id}>
                            {movie.id && (
                                <img className={s.size_movies}
                                     src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`
                                     } alt={movie.title}/>
                            )}
                            <div
                                style={{textAlign: 'center'}}>{movie.title}</div>
                            <div
                                style={{textAlign: 'center'}}>{movie.release_date}</div>
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