import { createInning } from "@/app/actions/createInning";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: { matchId: string };
}
const NewInningPage = async ({ params }: Props) => {
    const { matchId } = await params;
    const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: { teamA: true, teamB: true, innings: true },
    });
    if (!match) return notFound();

    if (match.innings.length >= 2) {
        return (
            <Card className="max-w-md mx-auto mt-10">
                <CardContent>
                    <p className="text-muted-foreground">
                        Both innings are already recorded.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Add Inning</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    action={createInning.bind(null, match.id)}
                    className="space-y-4">
                    <Select name="battingTeamId" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Batting team" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={match.teamA.id}>
                                {match.teamA.name}
                            </SelectItem>
                            <SelectItem value={match.teamB.id}>
                                {match.teamB.name}
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        name="runs"
                        type="number"
                        placeholder="Runs"
                        required
                    />
                    <Input
                        name="wickets"
                        type="number"
                        placeholder="Wickets"
                        required
                    />
                    <Input
                        name="overs"
                        type="number"
                        step="0.1"
                        placeholder="Overs (e.g. 19.4)"
                        required
                    />

                    <Button type="submit" className="w-full">
                        Save Inning
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewInningPage;
