'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export const SearchInput = () => {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const searchHandle = () => {
    if(!search.trim()) return;
    router.push(`/propiedades/search?title=${search}`)
    setSearch('')
  }

  return (
    <div className="flex gap-3 items-center">
      <input name="search" type="text" value={search} className="p-2 rounded-lg shadow text-sm" placeholder="Buscar propiedad" onChange={onChangeSearch} />
      <button onClick={searchHandle} className={`bg-indigo-800 hover:bg-indigo-500 rounded-lg text-white font-bold p-2 cursor-pointer text-sm} ${!search.trim() ? 'pointer-events-none' : ''}`}>
        Buscar
      </button>
   </div>
  )
}
