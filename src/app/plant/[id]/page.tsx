export default function Page({ params }: { params: { id: string } }) {
    return <div>Ma plante: {params.id}</div>
}