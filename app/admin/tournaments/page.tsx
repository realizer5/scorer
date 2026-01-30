import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";

const AdminTournamentsPage = async () => {
    const tournaments = await prisma.tournament.findMany({
        orderBy: { createdAt: "desc" },
    });
    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Tournaments</h1>
                <Link href="/admin/tournaments/new">
                    <Button>Create Tournament</Button>
                </Link>
            </div>

            {tournaments.length === 0 ? (
                <p className="text-muted-foreground">
                    No tournaments created yet.
                </p>
            ) : (
                <div className="grid gap-4">
                    {tournaments.map((t) => (
                        <Card key={t.id}>
                            <CardHeader>
                                <CardTitle>{t.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    {t.location}
                                </span>
                                <Link href={`/admin/tournaments/${t.id}`}>
                                    <Button variant="outline">Manage</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminTournamentsPage;
