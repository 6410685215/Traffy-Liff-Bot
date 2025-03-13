import { Prisma, PrismaClient } from '@prisma/client'

const categories = new PrismaClient().categories

export async function getAllCategories() {
    return await categories.findMany()
}