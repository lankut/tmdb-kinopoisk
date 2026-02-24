import {useParams} from "react-router";
import {useFetchMoviesDetailsQuery} from "@/app/api/movieDetailsApi.ts";
import s from './MovieDetails.module.css'

export const MovieDetails = () => {
    const {movieId} = useParams()

    const {data} = useFetchMoviesDetailsQuery(movieId ?? '', {
        skip: !movieId,
    });

    return (
        <div className={s.wrapper}>
            <h2 className={s.h2}>Movie Details</h2>
            <div className={s.wrapper_movie}>
                <div>
                    <img
                        src={`${import.meta.env.VITE_IMAGE_URL}${data?.poster_path}`}
                        alt={data?.title}/>
                </div>
                <div>
                    <div className={s.title}>{data?.title}</div>
                    <div>{data?.overview}</div>
                    <div>{data?.genres.map(e => <span
                        key={e.id}>{e.name}</span>)}</div>
                </div>


            </div>
        </div>
    );
};