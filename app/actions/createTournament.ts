"use server";

import prisma from "@/lib/prisma";

export const createTournament = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = new Date(formData.get("endDate") as string);

    if (!name || !startDate || !endDate) {
        throw new Error("Missing required fields");
    }

    await prisma.tournament.create({
        data: { name, location, startDate, endDate },
    });
};
