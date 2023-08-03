'use client'


import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

export type InputEmail = {
  email: string
}

type Props = {
  onSubmit: (data: InputEmail) => void
}

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Debes ingresar un email válido' })
})

export const ForgotPasswordForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<InputEmail>({resolver: zodResolver(forgotPasswordSchema), mode: 'onBlur'});

  const sendEmailRecoveryPassword: SubmitHandler<InputEmail> = (data) => {
    onSubmit(data);
  }

  return (
    <div className="bg-white py-8 px-4 shadow">
      <form onSubmit={handleSubmit(sendEmailRecoveryPassword)}     className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Email</label>
          <input 
            {...register("email")}
            type="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
            id="email" name="email" 
            placeholder="Escribe tu email" />
          <span className='text-red-700 text-xs font-medium'>{errors.email?.message}</span>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 cursor-pointer">Recuperar mi contraseña</button>
      </form>
    </div>
  )
};