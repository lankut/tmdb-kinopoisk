import s from './MainPage.module.css'
import {Backdrops} from "@/app/ui/mainPage/backdrops";
import {Movies} from "@/common/components/Movies";
import {
    useFetchMoviesNowPlayingQuery,
    useFetchMoviesPopularQuery,
    useFetchMoviesTopRatedQuery,
    useFetchMoviesUpcomingQuery
} from "@/app/api/moviesApi.ts";

export const MainPage = () => {

    const {data: popularMovies} = useFetchMoviesPopularQuery()
    const {data: topRatedMovies} = useFetchMoviesTopRatedQuery()
    const {data: upcomingMovies} = useFetchMoviesUpcomingQuery()
    const {data: nowPlayingMovies} = useFetchMoviesNowPlayingQuery()

    return (
        <div className={s.wrapper}>
            <Backdrops popularMovies={popularMovies}/>
            <Movies movies={popularMovies} queryKey={'fetchMoviesPopular'}
                    title={'Popular Movies'}/>
            <Movies movies={topRatedMovies} queryKey={'fetchMoviesTopRated'}
                    title={'Top Rated Movies'}/>
            <Movies movies={upcomingMovies} queryKey={'fetchMoviesUpcoming'}
                    title={'Upcoming Movies'}/>
            <Movies movies={nowPlayingMovies} queryKey={'fetchMoviesNowPlaying'}
                    title={'Now Playing Movies'}/>
        </div>
    );
};