import { Prisma, PrismaClient } from '@prisma/client'

const groups = new PrismaClient().groups

export async function saveDefault(data: Prisma.GroupsCreateInput) {
    return await groups.create({ data })
}
export async function getDefaultById(id: string) {
    return await groups.findUnique({ where: { id } })
}
