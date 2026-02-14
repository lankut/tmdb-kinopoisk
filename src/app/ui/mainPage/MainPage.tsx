import s from './MainPage.module.css'
import {useMemo} from "react";
import {Backdrops} from "@/app/ui/mainPage/backdrops";
import {PopularMovies} from "@/app/ui/mainPage/popularMovies";
import {getRandomSubset} from "@/common/utils/getRandomSubset.ts";
import {Upcoming} from "@/app/ui/mainPage/upcoming";
import {NowPlaying} from "@/app/ui/mainPage/nowPlaying";
import {TopRated} from "@/app/ui/mainPage/topRated";
import {useFetchMoviesPopularQuery} from "@/app/api/popularMoviApi.ts";


export const MainPage = () => {

    const {data: popularMovies} = useFetchMoviesPopularQuery()

    const fiveMovies = useMemo(() => {
        const allFilms = popularMovies?.results || [];
        return getRandomSubset(allFilms, 5);
    }, [popularMovies]);

    return (
        <div className={s.wrapper}>
            <Backdrops fiveMovies={fiveMovies}/>
            <PopularMovies popularMovies={popularMovies}/>
            <TopRated/>
            <Upcoming/>
            <NowPlaying/>
        </div>
    );
};