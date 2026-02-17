import {useAppSelector} from "@/common/hooks";
import {selectSearchData} from "@/app/model/appSlice.ts";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchMoviesSearchQuery} from "@/app/api/moviesApi.ts";
import {Movies} from "@/common/components/Movies";

export const SearchPage = () => {

    const searchData = useAppSelector(selectSearchData)

    const {
        data: searchMovies,
        isFetching,
        isSuccess
    } = useFetchMoviesSearchQuery(searchData ?? skipToken)

    if (isFetching) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Search</h2>
            {isSuccess && searchMovies.results.length !== 0 ?
                <Movies movies={searchMovies} queryKey={'fetchMoviesSearch'}
                        showAll={true} showButton={false}/>
                : ('Введите название для поиска...')}
        </div>
    );
};