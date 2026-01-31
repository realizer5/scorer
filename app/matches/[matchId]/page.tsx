import { notFound } from "next/navigation";

const PublicMatchPage = async ({
    params,
}: {
    params: Promise<{ matchId: string }>;
}) => {
    const { matchId } = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/public/matches/${matchId}`,
    );
    if (!res.ok) return notFound();
    const match = await res.json();
    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold">
                {match.teamA.name} vs {match.teamB.name}
            </h1>

            {match.innings.map((inning: any) => (
                <div key={inning.id}>
                    {inning.battingTeamId === match.teamA.id
                        ? match.teamA.name
                        : match.teamB.name}
                    : {inning.runs}/{inning.wickets} ({inning.overs})
                </div>
            ))}
        </div>
    );
};

export default PublicMatchPage;
