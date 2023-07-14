import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Element introuvable</h2>
      <p>L'élément n'existe pas ou a été déplacé.</p>
      <p>
        Revenir vers l'<Link href="/">Accueil</Link>
      </p>
    </div>
  )
}