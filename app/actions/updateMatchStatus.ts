"use server";
import { MatchStatus } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateMatchStatus = async (
    matchId: string,
    status: MatchStatus,
) => {
    await prisma.match.update({ where: { id: matchId }, data: { status } });
    revalidatePath(`/admin/matches/${matchId}`);
};
