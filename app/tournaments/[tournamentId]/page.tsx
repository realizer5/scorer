import { calculatePointsTable } from "@/lib/pointsTable";
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
                {tournament.matches.map((m: any) => (
                    <a
                        key={m.id}
                        href={`/matches/${m.id}`}
                        className="block py-2">
                        {m.teamA.name} vs {m.teamB.name}
                    </a>
                ))}
            </div>

            {/* Points Table */}
            <div>
                <h2 className="font-semibold">Points Table</h2>
                {calculatePointsTable(tournament.teams, tournament.matches).map(
                    (row) => (
                        <div key={row.teamId}>
                            {row.teamName} – {row.wins} wins
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

export default PublicTournamentPage;
