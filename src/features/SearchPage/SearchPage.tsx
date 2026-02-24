import {useAppSelector} from "@/common/hooks";
import {selectSearchData} from "@/app/model/appSlice.ts";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchMoviesSearchQuery} from "@/app/api/moviesApi.ts";
import {Movies} from "@/common/components/Movies";
import s from './SearchPage.module.css'
import {useState} from "react";

export const SearchPage = () => {
    const [page, setPage] = useState(1)

    const searchData = useAppSelector(selectSearchData)

    const queryArgs = searchData ? { ...searchData, page } : skipToken

    const {
        data: searchMovies,
        isFetching,
        isSuccess
    } = useFetchMoviesSearchQuery(queryArgs)

    if (isFetching) {
        return <div className={s.clue}>Loading...</div>
    }

    if (searchMovies?.results.length === 0) {
        return <div className={s.clue}>No matches found
            for {searchData?.query}</div>
    }

    return (
        <div>
            <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Search
                Results</h2>
            {isSuccess && searchMovies.results.length !== 0 ?
                <Movies movies={searchMovies}
                        queryKey={'fetchMoviesSearch'}
                        showAll={true}
                        showButton={false}
                        queryArgs={searchData}
                        page={page}
                        setPage={setPage}
                />
                : (<span className={s.clue}>Enter a movie title to start searching</span>)}
        </div>
    );
};