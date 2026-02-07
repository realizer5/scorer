import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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

            {/* Matches */}
            <div>
                <h2 className="font-semibold">Matches</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Match</TableHead>
                            <TableHead>Won</TableHead>
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
