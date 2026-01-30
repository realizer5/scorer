"use server"
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createTeam = async (tournamentId: string, formData: FormData) => {
    const name = formData.get("name") as string;
    if (!name) throw new Error("team name is required");
    await prisma.team.create({ data: { name, tournamentId } });
    redirect(`/admin/tournaments/${tournamentId}`);
};
