import s from './FilteredMovies.module.css'
import {RangeSlider} from "@/common/components/RangeSlider";
import {useFetchMoviesFilteredQuery} from "@/app/api/moviesApi.ts";



export const FilteredMovies = () => {

    const {data}= useFetchMoviesFilteredQuery({with_genres: [28,12] , sort_by: 'original_title.asc'})

    return (
        <div className={s.wrapper_filtered}>
            <div className={s.filter}>
                <h2>Filters / Sort </h2>
                <div>
                    Sort by <select>
                    <option>Popularity ⭡</option>
                    <option>Popularity ⭣</option>
                    <option>Rating ⭡</option>
                    <option>Rating ⭣</option>
                    <option>Release date ⭡</option>
                    <option>Release date ⭣</option>
                    <option>Title A-Z ⭡</option>
                    <option>Title A-Z ⭣</option>
                </select>
                    <div>
                        <span>Rating</span>
                        <span>0-10</span>
                        <RangeSlider/>
                    </div>
                    <div>
                        <button></button>
                    </div>
                </div>
            </div>
            <div>2</div>
        </div>
    );
};