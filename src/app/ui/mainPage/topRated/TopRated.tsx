import {useFetchMoviesTopRatedQuery} from "@/app/api/baseApi.ts";
import type {Movie} from "@/app/api/type.ts";
import s from './TopRated.module.css'

export const TopRated = () => {

    const {data: topRatedMovies} = useFetchMoviesTopRatedQuery()

    //Обернуть картину в div и добавить название на картинку CSS посмотри

    return (
        <div className={s.wrapper}>
            <h2>Top Rated</h2>
            <div className={s.wrapper_topRated}>
                {topRatedMovies?.results.map((ratedMovie: Movie) => {
                    return <div>
                        <img className={s.img}
                            src={`${import.meta.env.VITE_IMAGE_URL}${ratedMovie.backdrop_path}`}
                            alt=""/>
                        <div className={s.title}>{ratedMovie.title}</div>

                    </div>
                })}
            </div>
        </div>

    );
};