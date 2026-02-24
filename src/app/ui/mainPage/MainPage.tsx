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

    const {data: popularMovies} = useFetchMoviesPopularQuery(null)
    const {data: topRatedMovies} = useFetchMoviesTopRatedQuery(null)
    const {data: upcomingMovies} = useFetchMoviesUpcomingQuery(null)
    const {data: nowPlayingMovies} = useFetchMoviesNowPlayingQuery(null)

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