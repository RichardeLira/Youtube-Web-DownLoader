'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const linkFormSchema = z.object({
  link: z.string(),
})

type LinkFormData = z.infer<typeof linkFormSchema>

export default function Home() {
  function handleSearch(data: LinkFormData) {
    console.log(data)
  }

  const {
    register,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkFormSchema),
  })

  return (
    <div className="fixed left-1/2 top-1/4 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-12">
      <h1 className="text-5xl font-bold">Baixe seus vídeos gratuitamente</h1>

      <form onSubmit={handleSubmit(handleSearch)}>
        <input
          type="text"
          placeholder="Cole o link do vídeo aqui"
          {...register('link')}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  )
}
