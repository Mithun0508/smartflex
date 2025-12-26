// file: utils/prisma.ts

import { PrismaClient } from '@prisma/client';

// Declare global variable for PrismaClient (development mode ke liye zaroori)
declare global {
  var prisma: PrismaClient | undefined;
}

// Check agar global.prisma already defined hai, warna naya instance banao
const prisma = global.prisma || new PrismaClient();

// Development environment mein, global.prisma ko set karo taaki Fast Refresh mein naye instances na banen
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;