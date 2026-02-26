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
import {useEffect, useState} from "react";
import {setLoading} from "@/app/model/appSlice.ts";
import {useAppDispatch} from "@/common/hooks";

export const CategoryMovies = () => {

    const [page, setPage] = useState(1);
    const {category} = useParams()

const dispatch = useAppDispatch();

    const {data: popularMovies, isFetching: isFetchingPopular} = useFetchMoviesPopularQuery(page.toString(), {skip: category !== 'popular'});
    const {data: topRatedMovies, isFetching: isFetchingTopRated} = useFetchMoviesTopRatedQuery(page.toString(), {skip: category !== 'top_rated'})
    const {data: upcomingMovies, isFetching: isFetchingUpcoming} = useFetchMoviesUpcomingQuery(page.toString(), {skip: category !== 'upcoming'});
    const {data: nowPlayingMovies, isFetching: isFetchingNowPlaying} = useFetchMoviesNowPlayingQuery(page.toString(), {skip: category !== 'now_playing'});

    const isFetchingAny = isFetchingPopular || isFetchingTopRated || isFetchingUpcoming || isFetchingNowPlaying

    useEffect(() => {
        dispatch(setLoading(isFetchingAny))
    }, [isFetchingAny, dispatch]);

    const linkItems = [
        {title: 'Popular Movies', category: 'popular'},
        {title: 'Top Rated Movies', category: 'top_rated'},
        {title: 'Upcoming Movies', category: 'upcoming'},
        {title: 'Now Playing Movies', category: 'now_playing'},
    ]

    let moviesData: MovieResponseWithMovieFavorite | undefined;
    let queryKey: EndpointKeys
    const titleCategory = linkItems.find(el => el.category === category)

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
                        widthImage={'210px'} setPage={setPage}
                        page={page} title={titleCategory?.title}
                        queryArgs={page.toString()}
                />
            </div>
        </div>
    );
};