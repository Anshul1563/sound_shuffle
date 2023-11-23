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

        return { status: "successful" }

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

        return { status: "successful" }

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