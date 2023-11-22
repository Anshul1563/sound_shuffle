'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent'

function ClientHome({
    playlists,
    user,
}: {
    playlists: {
        name: string
        likes: number
        playtime: string
        user: string
    }[]
    user: string
}) {
    const [modalIsOpen, setIsOpen] = useState(-1)
    const [addition, setAddition] = useState(false)
    const [statePlaylists, setStatePlaylists] = useState(playlists)
    const [playlistName, setPlaylistName] = useState('')

    console.log(statePlaylists)

    const playlistElements = statePlaylists.map((playlist, ind) => {
        return (
            <>
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
                        />,
                        document.body
                    )}
                <button
                    className="flex cursor-pointer flex-col gap-4 rounded-md border-2 border-white bg-white bg-opacity-50 p-4 py-2 hover:bg-opacity-100"
                    key={ind}
                    onClick={() => setIsOpen(ind)}
                >
                    <div className="flex items-end justify-between gap-8">
                        <div className="text-xl font-semibold text-accent">
                            {playlist.name}
                        </div>
                        <div className="opacity-80">{playlist.playtime}</div>
                    </div>
                    <div className="flex items-end justify-between gap-8">
                        <div className="font-bold">
                            <span className="text-sm font-normal">By</span>{' '}
                            {playlist.user}
                        </div>
                        <div className="text-sm">{playlist.likes} likes</div>
                    </div>
                </button>
            </>
        )
    })

    function CreatePlaylist(name: string) {
        console.log('Creating')

        setStatePlaylists((prev) => {
            const newPlaylist = {
                name: name,
                likes: 0,
                playtime: '0',
                user: user,
            }

            const playlists = JSON.parse(JSON.stringify(prev))

            playlists.push(newPlaylist)

            return playlists
        })

        setIsOpen(statePlaylists.length)
        setAddition(false)
    }

    return (
        <div className="flex h-screen flex-col gap-8 bg-background p-20 font-work">
            <p className="text-3xl font-semibold">
                Welcome,{' '}
                <span className="text-4xl text-accent">{user}</span>
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
                        CreatePlaylist(playlistName)
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
