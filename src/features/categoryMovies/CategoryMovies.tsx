import s from './CategoryMovies.module.css'
import {
    type EndpointKeys,
    useFetchMoviesNowPlayingQuery,
    useFetchMoviesPopularQuery,
    useFetchMoviesTopRatedQuery,
    useFetchMoviesUpcomingQuery
} from "@/app/api/moviesApi.ts";
import {Movies} from "@/common/components/Movies";
import type {MovieResponseWithMovieFavorite} from "@/app/api/typesApi.ts";
import {NavLink, useParams} from "react-router";

export const CategoryMovies = () => {

    const {data: popularMovies} = useFetchMoviesPopularQuery()
    const {data: topRatedMovies} = useFetchMoviesTopRatedQuery()
    const {data: upcomingMovies} = useFetchMoviesUpcomingQuery()
    const {data: nowPlayingMovies} = useFetchMoviesNowPlayingQuery()

    const {category} = useParams()

    const linkItems = [
        {title: 'Popular Movies', category: 'popular'},
        {title: 'Top Rated Movies', category: 'top_rated'},
        {title: 'Upcoming Movies', category: 'upcoming'},
        {title: 'Now Playing Movies', category: 'now_playing'},
    ]

    let moviesData: MovieResponseWithMovieFavorite | undefined;
    let queryKey: EndpointKeys

    switch (category) {
        case 'top_rated':
            moviesData = topRatedMovies;
            queryKey = 'fetchMoviesTopRated'
            break;
        case 'upcoming':
            moviesData = upcomingMovies;
            queryKey = 'fetchMoviesUpcoming'
            break;
        case 'now_playing':
            moviesData = nowPlayingMovies;
            queryKey = 'fetchMoviesNowPlaying'
            break;
        case 'popular':
        default:
            moviesData = popularMovies;
            queryKey = 'fetchMoviesPopular'
    }

    return (
        <div className={s.wrapper_category}>
            <div className={s.wrapper_link}>
                {linkItems.map((linkItem, index) => <NavLink key={index}
                                                             className={({isActive}) => isActive ? `${s.link} ${s.active}` : s.link}
                                                             to={`/category_movies/${linkItem.category}`}>{linkItem.title}</NavLink>)
                }
            </div>
            <div className={s.container_category}>
                <Movies movies={moviesData} queryKey={queryKey}
                        showAll={true} showButton={false}
                        widthImage={'210px'}

                />
            </div>

        </div>
    );
};