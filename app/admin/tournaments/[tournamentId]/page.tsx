import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { calculatePointsTable } from "@/lib/pointsTable";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

const TournamentDashboard = async ({
    params,
}: {
    params: Promise<{ tournamentId: string }>;
}) => {
    const { tournamentId } = await params;
    const tournament = await prisma.tournament.findUnique({
        where: { id: tournamentId },
        include: {
            teams: true,
            matches: {
                include: { teamA: true, teamB: true },
                orderBy: { matchDate: "asc" },
            },
        },
    });
    if (!tournament) return notFound();
    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
            {/* Tournament info */}
            <Card>
                <CardHeader>
                    <CardTitle>{tournament.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1">
                    <div>Location: {tournament.location}</div>
                    <div>
                        Dates: {tournament.startDate.toDateString()} –{" "}
                        {tournament.endDate.toDateString()}
                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
                <Link href={`/admin/tournaments/${tournament.id}/teams/new`}>
                    <Button>Add Team</Button>
                </Link>
                <Link href={`/admin/tournaments/${tournament.id}/matches/new`}>
                    <Button variant="outline">Add Match</Button>
                </Link>
            </div>

            {/* POINTS TABLE */}
            <div className="space-y-3">
                <h2 className="text-xl font-semibold">Points Table</h2>

                {tournament.matches.length === 0 ? (
                    <p className="text-muted-foreground">
                        No completed matches yet.
                    </p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Team</TableHead>
                                <TableHead>P</TableHead>
                                <TableHead>W</TableHead>
                                <TableHead>L</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {calculatePointsTable(
                                tournament.teams,
                                tournament.matches,
                            ).map((row) => (
                                <TableRow key={row.teamId}>
                                    <TableCell>{row.teamName}</TableCell>
                                    <TableCell>{row.played}</TableCell>
                                    <TableCell>{row.wins}</TableCell>
                                    <TableCell>{row.losses}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* Match List */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Matches</h2>
                    <Link
                        href={`/admin/tournaments/${tournament.id}/matches/new`}>
                        <Button variant="outline">Add Match</Button>
                    </Link>
                </div>

                {tournament.matches.length === 0 ? (
                    <p className="text-muted-foreground">
                        No matches created yet.
                    </p>
                ) : (
                    tournament.matches.map((match) => (
                        <Card key={match.id}>
                            <CardContent className="py-4 flex justify-between items-center">
                                <div className="space-y-1">
                                    <div className="font-medium">
                                        {match.teamA.name} vs {match.teamB.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {new Date(
                                            match.matchDate,
                                        ).toLocaleString()}{" "}
                                        • {match.overs} overs
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant={
                                            match.status === "LIVE"
                                                ? "destructive"
                                                : match.status === "COMPLETED"
                                                  ? "secondary"
                                                  : "outline"
                                        }>
                                        {match.status}
                                    </Badge>

                                    <Link href={`/admin/matches/${match.id}`}>
                                        <Button size="sm">Manage</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
            {/* Teams list */}
            <div className="space-y-3">
                <h2 className="text-xl font-semibold">Teams</h2>

                {tournament.teams.length === 0 ? (
                    <p className="text-muted-foreground">No teams added yet.</p>
                ) : (
                    tournament.teams.map((team) => (
                        <Card key={team.id}>
                            <CardContent className="py-4">
                                {team.name}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default TournamentDashboard;
