import {Route, Routes} from "react-router";
import {MainPage} from "@/app/ui/mainPage/MainPage.tsx";
import {PageNotFound} from "@/common/components";
import {CategoryMovies} from "@/features/categoryMovies";
import {FilteredMovies} from "@/features/filteredMovies";
import {SearchPage} from "@/common/components/SearchPage";
import {Favorites} from "@/features/favorites";

export const Path = {
    MainPage: '/',
    NotFound: '*',
    CategoryMovies: '/category_movies',
    FilteredMovies: '/filtered_movies',
    Search: '/SearchPage',
    Favorites: '/favorites',
} as const


export const Routing = () => {
    return (
        <Routes>
            <Route path={Path.MainPage} element={<MainPage/>}/>
            <Route path={Path.NotFound} element={<PageNotFound/>}/>
            <Route path={Path.CategoryMovies} element={<CategoryMovies/>}/>
            <Route path={Path.FilteredMovies} element={<FilteredMovies/>}/>
            <Route path={Path.Search} element={<SearchPage/>}/>
            <Route path={Path.Favorites} element={<Favorites/>}/>
        </Routes>
    );
};