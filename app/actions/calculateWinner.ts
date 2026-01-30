"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const calculateWinner = async (matchId: string) => {
    const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: { innings: true },
    });
    if (!match || match.innings.length !== 2) {
        throw new Error("Match must have exactly 2 innings");
    }

    const [inning1, inning2] = match.innings;
    let winnerTeamId: string | null = null;
    if (inning1.runs > inning2.runs) {
        winnerTeamId = inning1.battingTeamId;
    } else if (inning2.runs > inning1.runs) {
        winnerTeamId = inning2.battingTeamId;
    } else {
        winnerTeamId = null;
    }
    await prisma.match.update({
        where: { id: matchId },
        data: { winnerTeamId },
    });
    revalidatePath(`/admin/matches/${matchId}`);
};
