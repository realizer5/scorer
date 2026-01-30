"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PlayerRole } from "@/lib/generated/prisma/enums";

export const createPlayer = async (teamId: string, formData: FormData) => {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string as PlayerRole;
    if (!name || !role) throw new Error("Missing required fields");
    await prisma.player.create({ data: { name, role, teamId } });
    redirect(`/admin/teams/${teamId}`);
};
