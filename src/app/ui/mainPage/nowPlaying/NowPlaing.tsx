import type {Movie} from "@/app/api/type.ts";
import s from './NowPlaying.module.css'
import {useFetchMoviesNowPlayingQuery} from "@/app/api/nowPlayingMoviesApi.ts";

export const NowPlaying = () => {

    const {data: nowPlaying} = useFetchMoviesNowPlayingQuery()

    return (
        <div className={s.wrapper}>
            <h2 className={s.header}>Now Playing</h2>
            <div className={s.wrapper_now_playing}>
                {nowPlaying?.results.map((movie: Movie) => {
                    return <div key={movie.id} style={{position: 'relative'}}>
                        <img
                            src={`${import.meta.env.VITE_IMAGE_URL}${movie.backdrop_path}`}
                            alt={movie.title}/>
                        <div className={s.title}>{movie.title}</div>
                    </div>
                })}
            </div>
        </div>
    );
};