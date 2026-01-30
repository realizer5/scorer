import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { createMatch } from "@/app/actions/createMatch";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Props {
    params: { tournamentId: string };
}
const NewMatchPage = async ({ params }: Props) => {
    const { tournamentId } = await params;
    const tournament = await prisma.tournament.findUnique({
        where: { id: tournamentId },
        include: { teams: true },
    });

    if (!tournament) return notFound();

    if (tournament.teams.length < 2) {
        return (
            <Card className="max-w-md mx-auto mt-10">
                <CardContent>
                    <p className="text-muted-foreground">
                        You need at least 2 teams to create a match.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Create Match</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    action={createMatch.bind(null, tournament.id)}
                    className="space-y-4">
                    <Select name="teamAId" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Team A" />
                        </SelectTrigger>
                        <SelectContent>
                            {tournament.teams.map((team) => (
                                <SelectItem key={team.id} value={team.id}>
                                    {team.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select name="teamBId" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Team B" />
                        </SelectTrigger>
                        <SelectContent>
                            {tournament.teams.map((team) => (
                                <SelectItem key={team.id} value={team.id}>
                                    {team.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input name="matchDate" type="datetime-local" required />
                    <Input name="overs" type="number" min={1} required />

                    <Button type="submit" className="w-full">
                        Create Match
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewMatchPage;
