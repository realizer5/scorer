import { Tournament } from "@/lib/generated/prisma/client";
import { notFound } from "next/navigation";

export default async function Home() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/public/tournaments`,
    );
    if (!res.ok) return notFound();
    const tournaments = await res.json();
    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold">Tournaments</h1>

            {tournaments.map((t: Tournament) => (
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
