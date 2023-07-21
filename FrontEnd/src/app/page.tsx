'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Search } from 'lucide-react'

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

      <form onSubmit={handleSubmit(handleSearch)} className="flex gap-2">
        <div className="flex w-96 items-center gap-2 rounded bg-gray-50 p-2">
          <div className="">
            <Search color="black" />
          </div>
          <input
            type="text"
            placeholder="Cole o link do vídeo aqui"
            {...register('link')}
            className="flex-1 rounded border-none bg-gray-50 text-gray-900 outline-none"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded bg-red-500 px-3 py-2 text-xl font-bold"
        >
          Buscar
          <ArrowRight />
        </button>
      </form>
    </div>
  )
}
