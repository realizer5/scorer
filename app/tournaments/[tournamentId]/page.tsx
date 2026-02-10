import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const PublicTournamentPage = async ({
    params,
}: {
    params: Promise<{ tournamentId: string }>;
}) => {
    const { tournamentId } = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/public/tournaments/${tournamentId}`,
    );
    if (!res.ok) return notFound();
    const tournament = await res.json();
    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
            <h1 className="text-2xl font-bold">{tournament.name}</h1>
            <div className="space-x-4">
                <span className="inline-flex items-center">
                    <MapPin className="inline mr-1" size={16} />
                    {tournament.location}
                </span>
                <span className="inline-flex items-center">
                    <Calendar className="inline mr-1" size={16} />
                    {format(tournament.startDate, "LLL dd ")} -{" "}
                    {format(tournament.endDate, "LLL dd y")}{" "}
                </span>
            </div>
            {/* Live Score */}
            <div></div>
            {/* Matches */}
            <div>
                <h2 className="font-semibold">Matches</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Match</TableHead>
                            <TableHead>Winner</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tournament.matches.map((m: any) => (
                            <TableRow key={m.id}>
                                <TableCell>
                                    <Link href={`/matches/${m.id}`}>
                                        {m.teamA.name} vs {m.teamB.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {m.winnerTeamId
                                        ? m.winnerTeamId === m.teamA.id
                                            ? m.teamA.name
                                            : m.teamB.name
                                        : "none"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PublicTournamentPage;
