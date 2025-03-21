import { Prisma, PrismaClient } from '@prisma/client'

const location = new PrismaClient().location

export async function addLocation(data: Prisma.LocationCreateInput) {
    return await location.create({ data })
}

export async function getLocation() {
    return await location.findMany()
}

export async function getLocationById(id: string) {
    return await location.findUnique({ where: { id } })
}

export async function updateLocation(id: string, data: Prisma.LocationUpdateInput) {
    return await location.update({ where: { id }, data })
}