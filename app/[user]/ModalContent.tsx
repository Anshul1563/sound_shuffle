import React, { useState } from 'react'
import Close from '@/public/images/close.svg'
import Image from 'next/image'
import {
    AddSongToPlaylist,
    GetSongsInPlaylist,
    RemoveSongFromPlaylist,
} from '@/logic/server_actions/Playlist'

function ModalContent({
    onClose,
    info,
    ind,
    modalIsOpen,
    tracks,
    allTracks,
    playlistID,
}: {
    onClose: any
    info: any
    ind: Number
    modalIsOpen: Number
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
    allTracks: {
        name: string
        artist: string
        album: string
        playtime: string
        url: string
        id: string
    }[]
    playlistID: string
}) {
    const [add, setAdd] = useState(false)

    const [playlistTracks, setPlaylistTracks] = useState(tracks)

    if (ind != modalIsOpen) return <></>

    async function AddTrack(trackID: string, playlistID: string) {
        const res = await AddSongToPlaylist(playlistID, trackID)
        if (res.status == 'failed') {
            return
        }
        UpdatePlaylist()
    }

    async function DeleteTrack(trackID: string, playlistID: string) {
        const res = await RemoveSongFromPlaylist(playlistID, trackID)
        if (res.status == 'failed') {
            return
        }
        UpdatePlaylist()
    }

    async function UpdatePlaylist() {
        const res = await GetSongsInPlaylist(playlistID)
        if (res.status == 'failed') {
            return
        }
        const updatedTracks = res.data!

        setPlaylistTracks(updatedTracks)
    }

    const allTrackelements = allTracks.map((track, ind) => {
        return (
            <div key={ind} className="flex items-center gap-4">
                <a
                    href={track.url}
                    target="_blank"
                    className="grid w-full grid-cols-3 items-center justify-between p-3  transition-all duration-[15ms] hover:bg-white"
                >
                    <div className="flex flex-col items-start text-start">
                        <div className="font-bold">{track.name}</div>
                        <div className="text-sm opacity-80">{track.artist}</div>
                    </div>
                    <div className=" ml-20 text-start">{track.album}</div>
                    <div className="text-end">{track.playtime}</div>
                </a>
                <button
                    onClick={() => AddTrack(track.id, playlistID)}
                    className="w-12 shrink-0 rounded-md bg-green-400 p-2"
                >
                    Add
                </button>
            </div>
        )
    })

    const trackElements = playlistTracks.map((track, ind) => {
        return (
            <div key={ind} className="flex items-center gap-4">
                <a
                    href={track.url}
                    target="_blank"
                    className="grid w-full grid-cols-3 items-center justify-between p-3  transition-all duration-[15ms] hover:bg-white"
                >
                    <div className="flex flex-col items-start text-start">
                        <div className="font-bold">{track.name}</div>
                        <div className="text-sm opacity-80">{track.artist}</div>
                    </div>
                    <div className=" ml-20 text-start">{track.album}</div>
                    <div className="text-end">{track.playtime}</div>
                </a>
                <button
                    onClick={() => DeleteTrack(track.trackID, track.playlistID)}
                    className="w-12 shrink-0 rounded-md bg-red-400 p-2"
                >
                    Del
                </button>
            </div>
        )
    })

    return (
        <div
            onClick={onClose}
            className="absolute top-0 flex h-screen w-full items-center justify-center rounded-md bg-transparent p-8 px-56 font-work backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex h-full w-full cursor-default flex-col gap-4 rounded-md border-2 border-black bg-secondary p-6"
            >
                <div className="mb-8 flex items-center justify-between">
                    <div className="align-baseline text-4xl font-bold text-accent">
                        {info.name}
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full bg-white bg-opacity-50 p-2"
                    >
                        <Image src={Close} alt="close" />
                    </button>
                </div>
                <div className="grid w-full grid-cols-3 items-center justify-between border-b-2 border-slate-400 p-3 pb-0 pr-10 opacity-70">
                    <div className="text-start">Title</div>
                    <div className="ml-20 text-start">Album</div>
                    <div className="mr-16 text-end">Time</div>
                </div>
                <div className="flex flex-col gap-4 overflow-auto bg-white bg-opacity-20 pr-2">
                    {add ? allTrackelements : trackElements}
                </div>
                <button
                    onClick={() => setAdd((prev) => !prev)}
                    className="mt-2 w-fit bg-white bg-opacity-50 px-4 py-2 text-accent hover:bg-white"
                >
                    {add ? 'Done!' : 'Add a new song'}
                </button>
            </div>
        </div>
    )
}

export default ModalContent
