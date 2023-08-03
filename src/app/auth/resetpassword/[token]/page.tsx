'use client'
import { Spinner } from '@/components/Spinner';
import { useState, useEffect } from 'react'
import endPoints from '@/services';
import userService from '@/services/user';
import { InputResetPassword, ResetPasswordForm } from '@/components/ResetPasswordForm';
import Link from 'next/link';

export default function ResetPasswordPage({ params }: {params: {token: string}}) {
  
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showResetPasswordMessage, setShowResetPasswordMessage] = useState(false);

  useEffect(() => {
    userService.confirmResetPasswordToken(endPoints.auth.confirmPassworsToken(params.token))
      .then(res => {
        if(res.error) {
          setIsTokenValid(false);
          setIsLoading(false);
        }else {
          setIsTokenValid(true);
          setIsLoading(false);
          setShowResetPasswordMessage(true)
        }
      })
      .catch(err => console.log(err))
  }, [params.token])

  const onSubmit = (input: InputResetPassword) => {
    userService.resetPassword(endPoints.auth.resetPassword(params.token), input)
      .then(res => {
        if(res.error) {
          setShowError(true)
        }else {

        }
      })
  }

  return (
    <div className='py-10'>
      <h1 className='text-4xl font-extrabold text-center'>
        Bienes 
        <span className='font-normal'>Raices</span>
      </h1>
      {
        (!isTokenValid && !isLoading) && (
          <p className='py-2 px-5 rounded-lg max-w-md mx-auto font-bold text-center text-white bg-red-500'>
            El token no es válido
          </p>
        )
      }
      {
        isTokenValid && (
          <div className='mt-8 mx-auto max-w-md'>
            <ResetPasswordForm onSubmit={onSubmit} />
          </div>
        )
      }
      {
        (!showResetPasswordMessage && !isLoading) && (
          <div className='max-w-md mx-auto'>
            <p className='bg-green-500 text-white py-2 px-4'>
              Contraseña actualizada correctamente. Ir a
              <Link className='font-bold' href='/auth/login'> Login</Link>
            </p>
          </div>
        )
      }
      {
        isLoading && <Spinner />
      }
    </div>
  )
}