import s from './Button.module.css'

type Props = {
    title: string,
    onClick: () => void
    active?: boolean
}

export const Button = ({title, onClick, active = false}: Props) => {
    return (
        <button
            style={active ? {backgroundColor: 'var(--selected-color)'} : undefined}
            className={s.button} onClick={onClick}>
            {title}
        </button>
    );
};