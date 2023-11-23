'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent'
import {
    CreatePlaylist,
    DeletePlaylistWithID,
    GetUserInfo,
} from '@/logic/server_actions/Playlist'

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

function ClientHome({
    playlists,
    user,
    userID,
    allTracks,
}: {
    playlists: {
        id: string
        name: string
        likes: number
        playtime: string
        user: string
        tracks: {
            name: string
            artist: string
            album: string
            playtime: string
            url: string
            addedAt: Date
            trackID: string
            playlistID: string
        }[]
    }[]
    user: string
    userID: number
    allTracks: {
        name: string
        artist: string
        album: string
        playtime: string
        url: string
        id : string
    }[]
}) {
    const [modalIsOpen, setIsOpen] = useState(-1)
    const [addition, setAddition] = useState(false)
    const [statePlaylists, setStatePlaylists] = useState(playlists)
    const [playlistName, setPlaylistName] = useState('')

    // console.log(statePlaylists)

    const playlistElements = statePlaylists.map((playlist, ind) => {
        return (
            <div key={ind}>
                {modalIsOpen != -1 &&
                    createPortal(
                        <ModalContent
                            key={ind + 25}
                            info={{
                                name: playlist.name,
                            }}
                            onClose={() => setIsOpen(-1)}
                            ind={ind}
                            modalIsOpen={modalIsOpen}
                            tracks={playlist.tracks}
                            allTracks={allTracks}
                            playlistID = {playlist.id}
                        />,
                        document.body
                    )}
                <button
                    className="flex cursor-pointer flex-col gap-4 rounded-md rounded-b-none border-2 border-white bg-white bg-opacity-50 p-4 py-2 hover:bg-opacity-100"
                    onClick={() => setIsOpen(ind)}
                >
                    <div className="flex w-full items-end justify-between gap-8">
                        <div className="text-xl font-semibold text-accent">
                            {playlist.name}
                        </div>
                        <div className="opacity-80">{playlist.playtime}</div>
                    </div>
                    <div className="flex w-full items-end justify-between gap-8">
                        <div className="font-bold">
                            <span className="text-sm font-normal">By</span>{' '}
                            {playlist.user}
                        </div>
                        <div className="text-sm">{playlist.likes} likes</div>
                    </div>
                </button>
                <button
                    onClick={() => DeletePlaylist(playlist.id)}
                    className="w-full border-2 border-t-0 border-white bg-red-400 p-1 text-center font-bold text-white transition-all hover:bg-white hover:text-red-500"
                >
                    DELETE
                </button>
            </div>
        )
    })

    async function UpdatePlaylists() {
        const userData = await GetUserInfo(user)

        const playlists = userData!.playlist.map((playlist) => {
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
                    trackID: track!.trackId,
                    playlistID: track!.playlistId,
                }
            })

            return {
                id: playlist.id,
                name: playlist.name,
                likes: playlist.likes,
                playtime: formatTime(Number(durations)),
                user: userData!.name,
                tracks: tracks,
            }
        })

        setStatePlaylists(playlists)

        setIsOpen(statePlaylists.length)
        setAddition(false)
    }

    async function DeletePlaylist(id: string) {
        const res = await DeletePlaylistWithID(id)

        if (res.status == 'failed') {
            return
        }

        UpdatePlaylists()
    }

    async function AddPlaylist(name: string) {
        console.log('Creating')

        const res = await CreatePlaylist(name, userID)

        if (res.status == 'failed') {
            return
        }

        UpdatePlaylists()
    }

    return (
        <div className="flex h-screen flex-col gap-8 bg-background p-20 font-work">
            <p className="text-3xl font-semibold">
                Welcome, <span className="text-4xl text-accent">{user}</span>
            </p>
            <div className="flex w-fit flex-col gap-4 rounded-lg bg-secondary p-8">
                <h1 className="text-2xl font-semibold ">
                    Here are your playlists
                </h1>
                <div className="flex flex-wrap gap-8">{playlistElements}</div>
            </div>
            {addition ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        AddPlaylist(playlistName)
                    }}
                    className="flex w-fit cursor-pointer gap-4 rounded-md border-2 border-accent bg-white p-4 py-2 text-lg font-semibold"
                >
                    <input
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        autoFocus
                        placeholder="Enter a playlist name!"
                        className=" outline-none"
                    />
                    <button
                        className="shrink-0 rounded-full bg-secondary p-2 text-sm"
                        type="submit"
                    >
                        GO!
                    </button>
                </form>
            ) : (
                <button
                    onClick={() => setAddition(true)}
                    className=" w-fit cursor-pointer rounded-md border-2 border-accent bg-white p-4 py-2 text-lg font-bold hover:bg-primary"
                >
                    Create a new Playlist!
                </button>
            )}
        </div>
    )
}

export default ClientHome
