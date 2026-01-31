const getMatch = async (id: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/public/matches/${id}`,
    );
    return res.json();
};

const PublicMatchPage = async ({
    params,
}: {
    params: Promise<{ matchId: string }>;
}) => {
    const { matchId } = await params;
    const match = await getMatch(matchId);
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
