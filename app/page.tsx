import { Tournament } from "@/lib/generated/prisma/client";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/public/tournaments`,
    );
    if (!res.ok) return notFound();
    const tournaments = await res.json();
    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold">CrickTrack</h1>
            <h2 className="text-2xl font-bold">Tournaments</h2>

            {tournaments.map((t: Tournament) => (
                <Link
                    key={t.id}
                    href={`/tournaments/${t.id}`}
                    className="block border rounded p-4 hover:bg-muted space-y-2">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-muted-foreground space-x-4">
                        <span className="inline-flex items-center">
                            <MapPin className="inline mr-1" size={16} />
                            {t.location}
                        </span>
                        <span className="inline-flex items-center">
                            <Calendar className="inline mr-1" size={16} />
                            {format(t.startDate, "LLL dd ")} -{" "}
                            {format(t.endDate, "LLL dd y")}{" "}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
