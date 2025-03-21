import { Prisma, PrismaClient } from '@prisma/client'

const status = new PrismaClient().status

// Required informId, status
export async function addStatus(data: Prisma.StatusCreateInput) {
    return await status.create({ data })
}

export async function getStatus() {
    return await status.findMany()
}

export async function getStatusById(id: string) {
    return await status.findUnique({ where: { id } })
}

export async function getStatusByInformId(informId: string) {
    return await status.findMany({ where: { informId }, orderBy: { timeStamp: 'asc' } })
}

export async function updateStatus(id: string, data: Prisma.StatusUpdateInput) {
    return await status.update({ where: { id }, data })
}

export function getStatusByInformID(id: any) {
    throw new Error("Function not implemented.")
}
