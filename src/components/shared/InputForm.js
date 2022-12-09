import React from 'react';

const InputForm = ({type, placeholder, register, name}) => {
    return (
        <input
          type={type}
          placeholder={placeholder}
          className="input input-bordered w-full max-w-xs"
          {...register(`${name}`, { required: true })}
        />
    );
};

export default InputForm;