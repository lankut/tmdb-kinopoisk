import s from './SearchItem.module.css'
import {type SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import type {FormDataSearch} from './../../../types/types.ts'
import {setSearchResult} from "@/app/model/appSlice.ts";
import {useAppDispatch} from "@/common/hooks";


export const SearchItem = () => {

    const {
        register,
        handleSubmit,
        reset,
        watch
    } = useForm<FormDataSearch>()
    const navigate = useNavigate()

    const queryValue = watch('query');

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<FormDataSearch> = data => {
        dispatch(setSearchResult(data))
        navigate('/SearchPage')
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.searchItem}>
            <input className={s.input} {...register('query')}
                   placeholder={'Найти фильм, сериал, персону...'}/>
            <button type={"submit"} disabled={!queryValue}>Search</button>
        </form>
    );
};