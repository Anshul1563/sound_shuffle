import ClientHome from "./ClientHome"

function Homepage({ params }: {
    params: {
        user : string
    }
}) {

   const ar = [
       { name: 'Daily Mix 1', likes: 59, playtime: '3:55', user: 'Anshul153' },
       {
           name: 'Daily Mix 2',
           likes: 109,
           playtime: '1:24',
           user: 'Anshul153',
       },
       { name: 'Daily Mix 3', likes: 89, playtime: '0:43', user: 'Anshul153' },
       { name: 'Daily Mix 4', likes: 29, playtime: '1:35', user: 'Anshul153' },
   ]

    return (
        <ClientHome playlists={ar} user={params.user} />
    )
}

export default Homepage
