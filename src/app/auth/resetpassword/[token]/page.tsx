'use client'
import { Spinner } from '@/components/Spinner';
import { useState, useEffect } from 'react'
import endPoints from '@/services';
import userService from '@/services/user';

export default function ResetPasswordPage({ params }: {params: {token: string}}) {
  
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userService.confirmResetPasswordToken(endPoints.auth.confirmPassworsToken(params.token))
      .then(res => {
        if(res.error) {
          setIsTokenValid(false);
          setIsLoading(false);
        }else {
          setIsTokenValid(true);
          setIsLoading(false);
        }
      })
      .catch(err => console.log(err))
  }, [params.token])

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
          <div>FORM PASSWORD</div>
        )
      }
      {
        isLoading && <Spinner />
      }
    </div>
  )
}