'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent'

function ClientHome({
    playlists,
}: {
    playlists: {
        name: string
        likes: number
        playtime: string
        user: string
    }[]
}) {
    const [modalIsOpen, setIsOpen] = useState(-1)

    const playlistElements = playlists.map((playlist, ind) => {
        return (
            <>
                {modalIsOpen != -1 &&
                    createPortal(
                        <ModalContent
                            key={ind}
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

    return (
        <div className="flex h-screen flex-col gap-8 bg-background p-20 font-work">
            <p className="text-3xl font-semibold">
                Welcome,{' '}
                <span className="text-4xl text-accent">Anshul1563</span>
            </p>
            <div className="flex w-fit flex-col gap-4 rounded-lg bg-secondary p-8">
                <h1 className="text-2xl font-semibold ">
                    Here are your playlists
                </h1>
                <div className="flex flex-wrap gap-8">{playlistElements}</div>
            </div>
        </div>
    )
}

export default ClientHome
