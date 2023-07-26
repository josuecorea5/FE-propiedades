'use client'

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

type Inputs = {
  email: string,
  password: string
}

const loginSchema = z.object({
  email: z.string().email({ message: 'Debes ingresar un email válido' }),
  password: z.string().nonempty({ message: 'Debes ingresar tu contraseña' })
})

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({resolver: zodResolver(loginSchema), mode: 'onBlur'});

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }

  return (
    <div className="bg-white py-8 px-4 shadow">
      <form onSubmit={handleSubmit(onSubmit)}     className="space-y-5">
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

        <div>
          <label htmlFor="password" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Password</label>
          <input 
            {...register("password")}
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
            id="password" 
            name="password" 
            placeholder="Escribe tu password" />
          <span className='text-red-700 text-xs font-medium'>{errors.password?.message}</span>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 cursor-pointer">Iniciar Sesion</button>
      </form>
    </div>
  )
};