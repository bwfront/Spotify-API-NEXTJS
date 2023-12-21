import ShowSelectPlaylist from "@/components/ShowSelectPlaylist";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="mt-44" >
      <ShowSelectPlaylist id={params.id}/>
    </div>
    
  )
}
