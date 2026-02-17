import s from './Backdrops.module.css'
import type {MovieResponseWithMovieFavorite} from "@/app/api/typesApi.ts";
import {useRef, useState} from "react";
import {SearchItem} from "@/common/components/SeachItem";

type Props = {
    popularMovies: MovieResponseWithMovieFavorite | undefined
}

export const Backdrops = ({popularMovies}: Props) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const randomMovieIdRef = useRef<number | null>(null)

    if (randomMovieIdRef.current === null && popularMovies?.results.length) {
        const results = popularMovies.results
        randomMovieIdRef.current = results[Math.floor(Math.random() * results.length)].id
    }

    const randomMovie = popularMovies?.results.find(m => m.id === randomMovieIdRef.current)

    return (

        <div className={s.wrapper_backdrops}>
            {!isLoaded && <div className={s.skeleton}/>}

            {randomMovie?.backdrop_path && (
                <div key={randomMovie.id}>
                    <img className={s.size_backdrops}
                         src={`${import.meta.env.VITE_IMAGE_ORIGINAL_URL}${randomMovie.backdrop_path}`}
                         alt={randomMovie.original_title}
                         onLoad={() => {
                             setIsLoaded(true)
                         }}
                         style={{display: isLoaded ? 'block' : 'none'}}
                    />
                    <div className={s.title}>
                        <span>WELCOME</span>
                        <span className={s.span}>Browse highlighted titles from TMDB</span>
                        <SearchItem inputClassName={s.input_backdrops}
                                    buttonClassName={s.button_backdrops}
                                    placeholder={'Search fo a movie'}/>
                    </div>

                </div>)}
        </div>
    );
};