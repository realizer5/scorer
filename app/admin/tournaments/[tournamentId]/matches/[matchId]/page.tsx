import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: { matchId: string };
}

const MatchPage = async ({ params }: Props) => {
    const { matchId } = await params;
    const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: { teamA: true, teamB: true, innings: true },
    });
    if (!match) return notFound();
    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold">
                {match.teamA.name} vs {match.teamB.name}
            </h1>

            <p className="text-muted-foreground">
                {match.overs} overs • {match.status}
            </p>

            <p className="text-muted-foreground">Scoring coming next 👀</p>
        </div>
    );
};

export default MatchPage;
