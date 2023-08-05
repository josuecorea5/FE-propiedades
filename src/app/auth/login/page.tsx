'use client'

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { InputsLogin, LoginForm } from "@/components/LoginForm";
import endPoints from "@/services";
import userService from "@/services/user";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bienes Raices | Iniciar Sesion",
  description: "Generated by create next app",
};

export default function LoginPage() {

  const [showErrorMessage, setShowErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = (data: InputsLogin) => {
    userService.loginUser(endPoints.auth.login, data)
      .then(res => {
        if(res.error) {
          setShowErrorMessage(res.message);
        }else {
          Cookies.set('token', res.token, { expires: 1,sameSite: 'Strict' });
          router.push('/');
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="py-10">
      <h1 className="text-4xl font-extrabold text-center">
        Bienes
        <span className="font-normal">Raices</span>
      </h1>
      <h2 className="text-center text-2xl font-extrabold">
        Iniciar Sesion
      </h2>
      <div className="mt-8 mx-auto max-w-md flex flex-col gap-2">
        {showErrorMessage && <div className="text-red-500 mb-2 text-center">{showErrorMessage}</div>}
        <LoginForm onSubmit={onSubmit} />
        <div className="flex items-center justify-between">
          <Link className="text-xs text-gray-500" href="/auth/register">
            ¿No tienes una cuenta? Regístrate
          </Link>

          <Link className="text-xs text-gray-500"  href="/auth/forgotpassword">
            ¿Olvidé mi contraseña?
          </Link>
        </div>
      </div>
    </div>
  )
}