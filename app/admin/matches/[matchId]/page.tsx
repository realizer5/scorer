import { calculateWinner } from "@/app/actions/calculateWinner";
import { updateMatchStatus } from "@/app/actions/updateMatchStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MatchStatus } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

const MatchPage = async ({
    params,
}: {
    params: Promise<{ matchId: string }>;
}) => {
    const { matchId } = await params;
    const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: { teamA: true, teamB: true, innings: true },
    });
    if (!match) return notFound();

    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <h1 className="text-2xl font-bold">
                {match.teamA.name} vs {match.teamB.name}
            </h1>

            <p className="text-muted-foreground">
                {match.overs} overs • Status: {match.status}
            </p>

            {/* STATUS CONTROLS */}
            <div className="flex gap-3">
                {match.status === MatchStatus.SCHEDULED && (
                    <form
                        action={updateMatchStatus.bind(
                            null,
                            match.id,
                            MatchStatus.LIVE,
                        )}>
                        <Button>Start Match</Button>
                    </form>
                )}

                {match.status === MatchStatus.LIVE && (
                    <form
                        action={updateMatchStatus.bind(
                            null,
                            match.id,
                            MatchStatus.COMPLETED,
                        )}>
                        <Button variant="destructive">End Match</Button>
                    </form>
                )}
            </div>
            {/* SCORECARD */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Scorecard</h2>

                    {match.status === "LIVE" && match.innings.length < 2 && (
                        <Link href={`/admin/matches/${match.id}/innings/new`}>
                            <Button size="sm">Add Inning</Button>
                        </Link>
                    )}
                </div>

                {match.innings.length === 0 ? (
                    <p className="text-muted-foreground">
                        No innings added yet.
                    </p>
                ) : (
                    match.innings.map((inning) => {
                        const teamName =
                            inning.battingTeamId === match.teamA.id
                                ? match.teamA.name
                                : match.teamB.name;

                        return (
                            <Card key={inning.id}>
                                <CardContent className="py-4">
                                    <div className="font-medium">
                                        {teamName}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {inning.runs}/{inning.wickets} (
                                        {inning.overs} overs)
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
            {/* RESULT */}
            {match.innings.length === 2 && !match.winnerTeamId && (
                <form action={calculateWinner.bind(null, match.id)}>
                    <Button variant="secondary">Calculate Winner</Button>
                </form>
            )}

            {match.winnerTeamId && (
                <div className="text-lg font-semibold text-green-600">
                    Winner:{" "}
                    {match.winnerTeamId === match.teamA.id
                        ? match.teamA.name
                        : match.teamB.name}
                </div>
            )}
        </div>
    );
};

export default MatchPage;
