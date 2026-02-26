import {useNavigate, useParams} from "react-router";
import {useFetchMoviesDetailsQuery} from "@/app/api/movieDetailsApi.ts";
import s from './MovieDetails.module.css'
import {getDate} from "@/common/utils/getDate.ts";
import {
    useFetchMoviesCreditsQuery,
    useFetchMoviesSimilarQuery
} from "@/app/api/moviesApi.ts";
import {Movies} from "@/common/components/Movies";
import {Button} from "@/common/components/Button";

export const MovieDetails = () => {
    const {movieId} = useParams()


    const {data} = useFetchMoviesDetailsQuery(movieId ?? '', {
        skip: !movieId,
    });

    const {data: credits} = useFetchMoviesCreditsQuery(movieId ?? '', {
        skip: !movieId,
    })

    const {data: similar} = useFetchMoviesSimilarQuery(movieId ?? '', {
        skip: !movieId,
    })
    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1);
    }

    return (
        <div className={s.wrapper}>

            <div className={s.title}>
                <h2 className={s.h2}>Movie Details</h2>
                <Button title={'Back'} onClick={onClickBack}/>
            </div>


            <div className={s.wrapper_movie}>
                <div>
                    <img
                        src={`${import.meta.env.VITE_IMAGE_URL}${data?.poster_path}`}
                        alt={data?.title}/>
                </div>
                <div>
                    <div className={s.title}>{data?.title}</div>
                    <div><span
                        className={s.bold}>Release:</span> {getDate(data?.release_date ? data.release_date : '')}
                    </div>
                    <div><span
                        className={s.bold}>Rating:</span> {data?.vote_average}
                    </div>
                    <div><span
                        className={s.bold}>Runtime:</span> {data?.runtime} min
                    </div>

                    <div>{data?.overview}</div>

                    <div>{data?.genres.map(e => <span
                        key={e.id}>{e.name} </span>)}</div>

                </div>
            </div>
            <div className={s.cast}>
                <span className={s.bold}> Cast</span>
                {credits?.cast.slice(0, 6).map(el => <div key={el.id}>
                    <img className={s.image}
                         src={`${import.meta.env.VITE_IMAGE_URL}${el.profile_path}`}
                         alt={el.name}
                    />
                    <div>{el.original_name}</div>
                    <div>{el.character}</div>
                </div>)}
            </div>
            <div>
                <div className={s.bold}>Similar Movies</div>
                <Movies movies={similar} queryKey={'fetchMoviesSimilar'}
                        queryArgs={movieId} showButton={false}/>
            </div>
        </div>
    );
};