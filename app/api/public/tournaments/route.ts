import prisma from "@/lib/prisma";

export const GET = async () => {
    const tournaments = await prisma.tournament.findMany({
        orderBy: { startDate: "desc" },
    });
    return Response.json(tournaments);
};
