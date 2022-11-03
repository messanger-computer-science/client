import React, {FC} from 'react';
import './input.style.css';

type InputProps = {
    value: string,
    inputHandler: () => void,
    submitHandler: () => void,
    placeHolder: string
}


const Input: FC<InputProps> = ({value, inputHandler, submitHandler, placeHolder}) => {
    return (
        <form className='form_container' onSubmit={submitHandler}>
            <input value={value} placeholder={placeHolder} onInput={inputHandler} className='input'/>
            <button className='submit_button'>+</button>
        </form>
    )
}

export default Input;