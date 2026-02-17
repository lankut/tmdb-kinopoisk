import s from './SearchItem.module.css'
import {type SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import type {FormDataSearch} from '../../types/types.ts'
import {setSearchData} from "@/app/model/appSlice.ts";
import {useAppDispatch} from "@/common/hooks";


type Props = {
    inputClassName?: string,
    buttonClassName?: string,
    placeholder?: string,
}

export const SearchItem = ({
                               inputClassName,
                               buttonClassName,
                               placeholder,
                           }: Props) => {

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

        dispatch(setSearchData(data))
        navigate('/SearchPage')
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.searchItem}>
            <input
                className={inputClassName ? inputClassName : s.input} {...register('query')}
                placeholder={placeholder ? placeholder : 'Найти фильм, сериал, персону...'}/>
            <button type={"submit"} disabled={!queryValue}
                    className={buttonClassName ? buttonClassName : ''}>Search
            </button>
        </form>
    );
};