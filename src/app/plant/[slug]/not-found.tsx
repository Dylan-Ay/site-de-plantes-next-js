import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className='text-center mt-20 text-lg'>
      <h2>Page introuvable - 404</h2>
      <p>L'élément n'existe pas ou a été déplacé.</p>
      <p>
      <Link className='font-semibold' href="/">Revenir à l'Accueil</Link>
      </p>
    </main>
  )
}