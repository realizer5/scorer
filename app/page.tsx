const getTournaments = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/public/tournaments`);
    return res.json();
};

export default async function Home() {
    const tournaments = await getTournaments();
    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold">Tournaments</h1>

            {tournaments.map((t: any) => (
                <a
                    key={t.id}
                    href={`/tournaments/${t.id}`}
                    className="block border rounded p-4 hover:bg-muted">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-muted-foreground">
                        {t.location}
                    </div>
                </a>
            ))}
        </div>
    );
}
