import prisma from "@/lib/prisma";

export const GET = async (
    _req: Request,
    { params }: { params: Promise<{ tournamentId: string }> },
) => {
    const { tournamentId } = await params;
    const tournamet = await prisma.tournament.findUnique({
        where: { id: tournamentId },
        include: {
            teams: true,
            matches: {
                where: { status: "COMPLETED" },
                include: { teamA: true, teamB: true },
            },
        },
    });
    if (!tournamet) return new Response("Not found", { status: 404 });
    return Response.json(tournamet);
};
