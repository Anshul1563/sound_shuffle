"use server"
import bcrypt from "bcrypt"
import prisma from "@/prisma/prisma";

export async function HashAndStore(details: {
    username: string;
    email: string;
    plainPass: string;
}) {
    try {

        if (!details.username || !details.plainPass || !details.email) {
            throw "Null values found"
        }

        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(details.plainPass, salt)

        const exists = await prisma.user.findFirst({
            where: {
                OR: [{
                    email : details.email
                }, {
                    name : details.username
                }]
            }
        })

        if (exists) {
            if (exists.email == details.email)
                throw "Email already exists!"
            else
                throw "Username already exists!"
        }

        const res = await prisma.user.create({
            data: {
                email: details.email,
                name: details.username,
                passwordHash: hash
            }
        })

        return { status: "successful" }

    } catch (e) {
        return { status: "failed", error: e }
    }
}

export async function CheckUser(email: string, password: string) {
    try {

        if (!email || !password) {
            throw "Null values found"
        }


        const userInfo = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                passwordHash: true,
                name : true
            }
        })

        if (!userInfo)
            throw "email is not registered"

        const DB_password_hash = userInfo.passwordHash
        const match = await bcrypt.compare(password, DB_password_hash);

        if (!match) {
            throw "password is incorrect"
        } else {
            return { status: "successful", name : userInfo.name }
        }
    } catch (e) {
        return { status: "failed", error: e }
    }


}
