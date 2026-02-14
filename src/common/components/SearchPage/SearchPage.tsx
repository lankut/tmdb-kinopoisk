import {useFetchMoviesSearchQuery} from "@/app/api/baseApi.ts";
import {useAppSelector} from "@/common/hooks";
import {selectResultSearch} from "@/app/model/appSlice.ts";
import type {FormDataSearch} from "@/common/types/types.ts";
import s from './SearchPage.module.css'

export const SearchPage = () => {

    const querySearch = useAppSelector(selectResultSearch)
    const {
        data,
        isFetching,
        isSuccess
    } = useFetchMoviesSearchQuery(querySearch as FormDataSearch)

    const isValidQuery = querySearch !== undefined && typeof querySearch !== "string";

    if (isFetching) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Search</h2>
            {isValidQuery && isSuccess && data.results.length !== 0 ?
                (data.results.map((movie) => (
                        <div key={movie.id} className={s.wrapper}>
                            <img className={s.poster}
                                src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
                                alt={movie.title}/>
                            <div className={s.description}>
                                <div style={{fontWeight: 'bold'}}> {movie.title}</div>
                                <div > {movie.overview}</div>

                            </div>

                        </div>
                    )
                )) : ('Введите название для поиска...')}
        </div>
    );
};