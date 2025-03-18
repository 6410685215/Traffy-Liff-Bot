import { Prisma, PrismaClient } from '@prisma/client'
import base62 from 'base62'

const inform = new PrismaClient().inform

export async function addInform(data: Prisma.InformCreateInput) {
    return await inform.create({ data })
}

export async function getInform() {
    return await inform.findMany()
}

export async function getInformByGroupId(group_id: string) {
    return await inform.findMany({ where: { group_id }, orderBy: { timeStamp: 'desc' } })
}

export async function getInformById(id: string) {
    return await inform.findUnique({ where: { id } })
}

export async function updateInform(id: string, data: Prisma.InformUpdateInput) {
    return await inform.update({ where: { id }, data })
}

export function generateInformId(inform: Prisma.InformCreateInput) {
    const id = inform.id
    if (!id) {
        throw new Error('Inform id is undefined');
    }
    const idBuffer = Buffer.from(id, 'utf-8').readUInt32BE(0)
    if (!inform.timeStamp) {
        throw new Error('Inform timeStamp is undefined');
    }
    return `${new Date(inform.timeStamp).getFullYear()}-${base62.encode(idBuffer).slice(0, 7)}-G`
}
