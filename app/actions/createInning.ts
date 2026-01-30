"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createInning = async (matchId: string, formData: FormData) => {
    const battingTeamId = formData.get("battingTeamId") as string;
    const runs = Number(formData.get("runs"));
    const wickets = Number(formData.get("wickets"));
    const overs = Number(formData.get("overs"));
    if (!battingTeamId || !runs || !wickets || !overs) {
        throw new Error("Missing required fields");
    }
    await prisma.inning.create({
        data: { matchId, battingTeamId, runs, wickets, overs },
    });
    redirect(`/admin/matches/${matchId}`);
};
