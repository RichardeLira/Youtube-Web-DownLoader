'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search, ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface SearchFormProps {
  onSearch: (videoLink: string) => void
}

const linkFormSchema = z.object({
  link: z.string(),
})

type LinkFormData = z.infer<typeof linkFormSchema>

export default function SearchForm({ onSearch }: SearchFormProps) {
  function handleSearch(data: LinkFormData) {
    const { link } = data
    onSearch(link)
  }

  const {
    register,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkFormSchema),
  })

  return (
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
  )
}
