'use client'

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

type Inputs = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

const registerSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  email: z.string().email({ message: 'Debes ingresar un email válido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, { message: 'Las contraseñas no coinciden', path: ['confirmPassword'] })

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({resolver: zodResolver(registerSchema), mode: 'onBlur'});

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }

  return (
    <div className="bg-white py-8 px-4 shadow">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Nombre completo</label>
          <input 
            {...register("name")}
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" id="name" name="name" 
            placeholder="Escribe tu nombre" />
          <span className='text-red-700 text-xs font-medium'>{errors.name?.message}</span>
        </div>

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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Confirmar password</label>
          <input 
            {...register("confirmPassword")}
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Confirmar password" />
          <span className='text-red-700 text-xs font-medium'>{errors.confirmPassword?.message}</span>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 cursor-pointer">Crear cuenta</button>
      </form>
    </div>
  )
}