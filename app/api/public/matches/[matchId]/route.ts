import prisma from "@/lib/prisma";

export const GET = async (
    _req: Request,
    { params }: { params: Promise<{ matchId: string }> },
) => {
    const { matchId } = await params;
    const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: { teamA: true, teamB: true, innings: true },
    });
    if (!match) return new Response("Not found", { status: 404 });
    return Response.json(match);
};
