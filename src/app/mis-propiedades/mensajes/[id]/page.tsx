'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import endPoints from '@/services';
import propertyService from '@/services/properties';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/helpers/formatDate';
import { Message } from '@/types';

export default function Page({ params }: { params: { id: string}}) {
  const [messages, setMessages] = useState<Message[]>([])
  const router = useRouter()

  useEffect(() => {
    propertyService.getMessagesOfProperty(endPoints.properties.getMessagesOfProperty(params.id))
      .then((res) => {
        if(res?.error) {
          router.push('/mis-propiedades')
        }else {
          setMessages(res)
        }
      })
  }, [params.id, router])

  return (
    <>
      <h2 className='text-2xl font-extrabold text-center my-10'>
        Mensajes de propiedades
      </h2>
      <Link className="rounded py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-sm font-bold text-center text-white inline-block my-5 w-full sm:w-auto" href='/mis-propiedades'>
        Volver
      </Link>
      <div className='mx-auto max-w-4xl bg-white shadow'>
        {
          messages.length === 0 ? (
            <p className='text-center text-gray-600 p-5'>No hay mensajes</p>
          ):
          (
            <ul>
              {
                messages.map((message: Message) => (
                  <li key={message?.id} className='border-gray-200 border-b p-5 space-y-1'>
                    <p className='font-bold text-gray-800'>
                      Email: <span className='font-normal'>{message?.user?.email}</span>
                    </p>
                    <p className='font-bold text-gray-800'>
                      Nombre: <span className='font-normal'>{message?.user?.name}</span>
                    </p>
                    <p className='font-bold text-gray-800'>
                      Mensaje: <span className='font-normal'>{message?.message}</span>
                    </p>
                    <p className='font-bold text-gray-800'>
                      Fecha: <span className='font-normal'>{formatDate(message?.createdAt)}</span>
                    </p>
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    </>
  )
}