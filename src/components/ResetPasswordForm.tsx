import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

export type InputResetPassword = {
  password: string;
  confirmPassword: string
}

type Props = {
  onSubmit: (data: InputResetPassword) => void
}

const resetPasswordSchema = z.object({
  password: z.string().min(6, {message: 'La contraseña debe tener al menos 6 caracteres'}),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {message: 'Las contraseñas no coinciden', path: ['confirmPassword']})

export const ResetPasswordForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, formState: {errors} } = useForm<InputResetPassword>({resolver: zodResolver(resetPasswordSchema), mode: 'onBlur'});

  const resetPassword: SubmitHandler<InputResetPassword> = (data) => {
    onSubmit(data)
  }

  return (
    <div className='bg-white py-8 px-4 shadow'>
      <form onSubmit={handleSubmit(resetPassword)}>
        <div>
            <label htmlFor="password" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Password</label>
            <input 
              {...register("password")}
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="password" 
              name="password" 
              placeholder="Escribe tu nueva contraseña" />
            <span className='text-red-700 text-xs font-medium'>{errors.password?.message}</span>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Confirmar contraseña</label>
          <input 
            {...register("confirmPassword")}
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Confirmar contraseña" />
          <span className='text-red-700 text-xs font-medium'>{errors.confirmPassword?.message}</span>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 cursor-pointer">
          Cambiar contraseña
        </button>
      </form>
    </div>
  )
}