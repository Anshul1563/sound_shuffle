import prisma from '@/prisma/prisma'
import ClientHome from './ClientHome'
import { GetUserInfo } from '@/logic/server_actions/Playlist'

function formatTime(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60

    // Use padStart to ensure that single-digit seconds are formatted as '0X'
    const formattedTime = `${minutes}:${String(remainingSeconds).padStart(
        2,
        '0'
    )}`

    return formattedTime
}

async function Homepage({
    params,
}: {
    params: {
        user: string
    }
}) {
    const user = await GetUserInfo(params.user)

    if (!user) {
        return <div> No user found with that name</div>
    }

    const playlists = user.playlist.map((playlist) => {
        let durations = 0

        const tracks = playlist.tracks.map((track) => {
            durations += Number(track.track.duration)
            return {
                name: track!.track!.name!,
                artist: track!.track!.artist!.name!,
                album: track!.track!.album!.name!,
                playtime: formatTime(Number(track.track.duration)),
                url: track!.track!.url!,
                addedAt: track!.addedAt!,
            }
        })

        return {
            id: playlist.id,
            name: playlist.name,
            likes: playlist.likes,
            playtime: formatTime(Number(durations)),
            user: user.name,
            tracks: tracks,
        }
    })

    return (
        <ClientHome playlists={playlists} user={user.name} userID={user.id} />
    )
}

export default Homepage
