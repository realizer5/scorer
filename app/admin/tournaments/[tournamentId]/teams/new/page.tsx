"use client";
import { createTeam } from "@/app/actions/createTeam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";

const NewTeamPage = () => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Add Team</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    action={createTeam.bind(null, tournamentId)}
                    className="space-y-4">
                    <Input name="name" placeholder="Team name" required />
                    <Button type="submit" className="w-full">
                        Create Team
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewTeamPage;
