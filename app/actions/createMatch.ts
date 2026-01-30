"use server";

import { MatchStatus } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createMatch = async (tournamentId: string, formData: FormData) => {
    const teamAId = formData.get("teamAId") as string;
    const teamBId = formData.get("teamBId") as string;
    const matchDate = formData.get("matchDate") as string;
    const oversRaw = formData.get("overs") as string;
    if (!teamAId || !teamBId || !matchDate || !oversRaw) {
        throw new Error("Missing required fields");
    }
    if (teamAId === teamBId) {
        throw new Error("Team A and Team B must be different");
    }
    const overs = Number(oversRaw);
    if (Number.isNaN(oversRaw) || overs <= 0) {
        throw new Error("Invalid overs");
    }
    await prisma.match.create({
        data: {
            tournamentId,
            teamAId,
            teamBId,
            matchDate: new Date(matchDate),
            overs,
            status: MatchStatus.SCHEDULED,
        },
    });

    redirect(`/admin/tournaments/${tournamentId}`);
};
