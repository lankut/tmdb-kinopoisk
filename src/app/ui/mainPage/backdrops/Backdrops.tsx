import s from './Backdrops.module.css'
import type {Movie} from "@/app/api/type.ts";

type Props = {
    fiveMovies: Movie[]
}

export const Backdrops = ({fiveMovies}: Props) => {

    return (
        <div className={s.wrapper_backdrops}>
            {fiveMovies.map((movie) => (movie.poster_path && (
                <div key={movie.id}>
                    <img className={s.size_backdrops}
                         src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
                         alt={movie.original_title}/>
                </div>)))}
        </div>
    );
};