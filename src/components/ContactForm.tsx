import React, { useState } from "react";

type Props = {
  onSubmit: (message: string) => void;
  errorMessage?: string;
}

export const ContactForm = ({ onSubmit, errorMessage }: Props) => {
  const [message, setMessage] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!message.trim()) return;
    onSubmit(message);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <p className="text-2xl text-center">Contacta al vendedor</p>
        <label htmlFor="message">Mensaje</label>
        <textarea 
          name="message" 
          id="message" 
          onChange={handleOnChange}
          className="w-full py-2 px-1 border border-gray-300 rounded-lg shadow placeholder-gray-400" 
          placeholder="Escribe tu mensaje"></textarea>
        {errorMessage && <span className='text-red-700 text-xs'>{errorMessage}</span>}
        <button 
          className={`${message.trim().length === 0 ? 'pointer-events-none' : ''} bg-indigo-600 text-white font-bold text-sm w-full p-2 cursor-pointer`}
        >
          Enviar mensaje
        </button>
      </div>
    </form>
  )
}
