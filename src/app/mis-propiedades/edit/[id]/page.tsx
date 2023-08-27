'use client'

import { useEffect, useState } from 'react'
import { EditPropertyForm, InputsPropertyEdit } from '@/components/EditPropertyForm'
import endPoints from '@/services'
import propertyService from '@/services/properties'
import { useRouter } from 'next/navigation'


export default function Page({ params }: { params: { id: string }}) {

  const [property, setProperty] = useState<any>({})

  const router = useRouter()
  useEffect(() => {

    async function getProperty() {
      const res = await propertyService.getProperty(endPoints.properties.getOne(params.id))
      if(res.status === 200) {
        const property = await res.json()
        setProperty(property)
      }else {
        router.push('/mis-propiedades')
      }
    }
    getProperty()
  }, [params.id, router])

  const onSubmit = (data: InputsPropertyEdit) => {
    console.log(data)
  }

  return (
    <div>
      Edit property {params.id}
      <EditPropertyForm onSubmit={onSubmit} property={property} />
    </div>
  )
}
