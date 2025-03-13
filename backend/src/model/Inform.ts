import { Prisma, PrismaClient } from '@prisma/client'

const inform = new PrismaClient().inform

export async function addInform(data: Prisma.InformCreateInput) {
    return await inform.create({ data })
}

export async function getInform() {
    return await inform.findMany()
}

export async function getInformById(id: string) {
    return await inform.findUnique({ where: { id } })
}

export async function updateInform(id: string, data: Prisma.InformUpdateInput) {
    return await inform.update({ where: { id }, data })
}