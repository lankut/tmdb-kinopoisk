import s from './MainPage.module.css'
import {Backdrops} from "@/app/ui/mainPage/backdrops";
import {Movies} from "@/common/components/Movies";
import {
    useFetchMoviesNowPlayingQuery,
    useFetchMoviesPopularQuery,
    useFetchMoviesTopRatedQuery,
    useFetchMoviesUpcomingQuery
} from "@/app/api/moviesApi.ts";
import {useEffect} from "react";
import {setLoading} from "@/app/model/appSlice.ts";
import {useAppDispatch} from "@/common/hooks";

export const MainPage = () => {

    const dispatch = useAppDispatch();

    const {
        data: popularMovies,
        isFetching: isFetchingPopular
    } = useFetchMoviesPopularQuery(null)
    const {
        data: topRatedMovies,
        isFetching: isFetchingTopRated
    } = useFetchMoviesTopRatedQuery(null)
    const {
        data: upcomingMovies,
        isFetching: isFetchingUpcoming
    } = useFetchMoviesUpcomingQuery(null)
    const {
        data: nowPlayingMovies,
        isFetching: isFetchingNowPlaying
    } = useFetchMoviesNowPlayingQuery(null)

    const isFetchingAny = isFetchingPopular || isFetchingTopRated || isFetchingUpcoming || isFetchingNowPlaying

    useEffect(() => {
        dispatch(setLoading(isFetchingAny))
    }, [isFetchingAny, dispatch]);

    return (
        <div className={s.wrapper}>
            <Backdrops popularMovies={popularMovies}/>
            <div className={s.container_movies}>
                <Movies movies={popularMovies} queryKey={'fetchMoviesPopular'}
                        title={'Popular Movies'} route={'popular'}
                        queryArgs={null}
                />
                <Movies movies={topRatedMovies} queryKey={'fetchMoviesTopRated'}
                        title={'Top Rated Movies'} route={'top_rated'}
                        queryArgs={null}
                />
                <Movies movies={upcomingMovies} queryKey={'fetchMoviesUpcoming'}
                        title={'Upcoming Movies'} route={'upcoming'}
                        queryArgs={null}
                />
                <Movies movies={nowPlayingMovies}
                        queryKey={'fetchMoviesNowPlaying'}
                        title={'Now Playing Movies'} route={'now_playing'}
                        queryArgs={null}
                />
            </div>

        </div>
    );
};