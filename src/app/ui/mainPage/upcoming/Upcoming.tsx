import type {Movie} from "@/app/api/type.ts";
import s from './Upcoming.module.css'
import {useFetchMoviesUpcomingQuery} from "@/app/api/upcomingMoviesApi.ts";

export const Upcoming = () => {

    const {data: upcoming} = useFetchMoviesUpcomingQuery()

    return (
        <div className={s.wrapper}>
            <h2 className={s.header}>Upcoming</h2>
            <div className={s.wrapper_upcoming}>
                {upcoming?.results.map((ratedMovie: Movie) => {
                    return <div key={ratedMovie.id} style={{position: 'relative'}}>
                        <img
                            src={`${import.meta.env.VITE_IMAGE_URL}${ratedMovie.backdrop_path}`}
                            alt=""/>
                        <div className={s.title}>{ratedMovie.title}</div>
                    </div>
                })}
            </div>
        </div>
    );
};