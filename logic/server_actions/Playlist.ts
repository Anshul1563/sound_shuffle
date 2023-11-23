"use server"

import prisma from "@/prisma/prisma";

export async function CreatePlaylist(name: string, userID: number) {
    try {
        const res = await prisma.playlist.create({
            data: {
                name: name,
                user: {
                    connect: {
                        id: userID
                    }
                }
            },


        })

        return { status: "successful", message: `Playlist ${res.name} created!` }

    } catch (e) {
        console.log(e)
        return { status: "failed", error: "Some error occured" }
    }
}

export async function GetUserInfo(user: string) {
    const result = await prisma.user.findFirst({
        include: {
            playlist: {
                include: {
                    tracks: {
                        include: {
                            track: {
                                include: {
                                    artist: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                    album: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        where: {
            name: user,
        },
    })
    return result
}

export async function DeletePlaylistWithID(playlistID: string) {
    try {
        const res = await prisma.playlist.delete({
            where: {
                id: playlistID
            }
        })

        console.log(res)

        return { status: "successful", message : `Playlist ${res.name} deleted!` }

    } catch (e) {
        console.log(e)

        return { status: "failed", error: "Some error occured" }
    }
}

export async function ShowAllSongs() {
    try {
        const res = await prisma.track.findMany({
            include: {
                artist: {
                    select: {
                        name: true,
                    },
                },
                album: {
                    select: {
                        name: true,
                    },
                },
            },

        })

        return { status: "successful", data: res }

    } catch (e) {
        console.log(e)

        return { status: "failed", error: "Some error occured" }
    }
}

export async function AddSongToPlaylist(playlistID: string, trackID: string) {
    try {
        const res = await prisma.playlistTracks.create({
            data: {
                playlist: {
                    connect: {
                        id: playlistID
                    }
                },
                track: {
                    connect: {
                        id: trackID
                    }
                }
            }
        })

        return { status: "successful" , message : "Song has been added" }

    } catch (e) {
        console.log(e)

        return { status: "failed", error: "Some error occured" }
    }
}

export async function RemoveSongFromPlaylist(playlistID: string, trackID: string) {
    try {
        const res = await prisma.playlistTracks.delete({
            where: {
                trackId_playlistId: {
                    trackId: trackID,
                    playlistId: playlistID
                }
            }
        })

        return { status: "successful", message : "Song has been deleted" }

    } catch (e) {
        console.log(e)

        return { status: "failed", error: "Some error occured" }
    }
}

export async function GetSongsInPlaylist(playlistID: string) {
    try {
        const res = await prisma.playlistTracks.findMany({
            include: {
                track: {
                    include: {
                        artist: {
                            select: {
                                name: true,
                            },
                        },
                        album: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            where: {
                playlistId: playlistID
            }
        })



        const playlistTracks: {
            name: string;
            artist: string;
            album: string;
            playtime: string;
            url: string;
            addedAt: Date;
            trackID: string;
            playlistID: string;
        }[] = res.map((track) => {
            return {
                name: track!.track!.name!,
                artist: track!.track!.artist!.name!,
                album: track!.track!.album!.name!,
                playtime: formatTime(Number(track!.track!.duration)),
                url: track!.track!.url!,
                addedAt: track.addedAt,
                trackID: track.track.id,
                playlistID: playlistID
            }
        }
        )


        return { status: "successful", data: playlistTracks }

    } catch (e) {
        console.log(e)

        return { status: "failed", error: "Some error occured" }
    }
}

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