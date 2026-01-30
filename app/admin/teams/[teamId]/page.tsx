import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
interface Props {
    params: { teamId: string };
}
const TeamPage = async ({ params }: Props) => {
    const { teamId } = await params;
    const team = await prisma.team.findUnique({
        where: { id: teamId },
        include: { players: true },
    });
    if (!team) return notFound();
    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{team.name}</h1>
                <Link href={`/admin/teams/${team.id}/players/new`}>
                    <Button>Add Player</Button>
                </Link>
            </div>

            {team.players.length === 0 ? (
                <p className="text-muted-foreground">No players added yet.</p>
            ) : (
                team.players.map((player) => (
                    <Card key={player.id}>
                        <CardContent className="py-3 flex justify-between">
                            <span>{player.name}</span>
                            <span className="text-sm text-muted-foreground">
                                {player.role.replace("_", " ")}
                            </span>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
};

export default TeamPage;
