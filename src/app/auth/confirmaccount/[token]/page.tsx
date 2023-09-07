'use client'

import { Metadata } from "next"
import { useEffect, useState } from 'react'
import endpoints from '../../../../services'
import UserService from "@/services/user";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bienes Raices | Confirmar Cuenta",
  description: "Generated by create next app",
};


export default function ConfirmAccountPage({ params }: { params: { token: string } }) {

  const [isTokenValid, setIsTokenValid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    UserService.confirmUser(endpoints.auth.confirm(params.token))
      .then(res => {
        if(!res.error) {
          setIsTokenValid(true)
          setIsLoading(false)
        }else {
          setIsTokenValid(false)
          setIsLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
      
  }, [params.token])

  return (
    <div className="py-10">
      <h1 className="text-4xl font-extrabold text-center">
        Bienes
        <span className="font-normal">Raices</span>
      </h1>
        {
          (!isTokenValid && !isLoading) && (
            <p className="py-2 px-5 rounded-lg max-w-md mx-auto font-bold text-center text-white bg-red-500">
              El token no es válido
            </p>
          )
        }
        {
          isTokenValid && (
            <>
              <p className="py-2 px-5 rounded-lg max-w-md mx-auto font-bold text-center text-white bg-green-500">
                Cuenta confirmada correctamente
              </p>
              <Link href='/auth/login' className="text-center max-w-md mx-auto px-4 py-2 font-bold rounded-lg text-indigo-600 hover:underline mt-8 block">Ya puedes iniciar sessión AQUÍ</Link>
            </>
          )
        }
      {
        isLoading && (
          <Spinner />
        )
      }
    </div>
  ) 
}
