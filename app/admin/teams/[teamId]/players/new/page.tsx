"use client";
import { createPlayer } from "@/app/actions/createPlayer";
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
import { useParams } from "next/navigation";

const NewPlayerPage = () => {
    const { teamId } = useParams<{ teamId: string }>();
    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Add Player</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    action={createPlayer.bind(null, teamId)}
                    className="space-y-4">
                    <Input name="name" placeholder="Player name" required />

                    <Select name="role" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BATSMAN">Batsman</SelectItem>
                            <SelectItem value="BOWLER">Bowler</SelectItem>
                            <SelectItem value="ALL_ROUNDER">
                                All-rounder
                            </SelectItem>
                            <SelectItem value="WICKET_KEEPER">
                                Wicket-keeper
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Button type="submit" className="w-full">
                        Add Player
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewPlayerPage;
