import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bottom-0 flex w-full items-center justify-center border-t-2 border-t-gray-700 bg-gray-900 py-10">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h2>© 2023 m2youtube</h2>
        <div className="flex gap-4">
          <Link href="/privacy-policy">Política de privacidade</Link>
          <Link href="/terms-of-service">Termos de uso</Link>
        </div>
      </div>
    </footer>
  )
}
