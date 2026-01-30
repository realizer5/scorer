import { createTournament } from "@/app/actions/createTournament";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const NewTournamentPage = () => {
    return (
        <Card className="max-w-lg mx-auto mt-10">
            <CardHeader>
                <CardTitle>Create Tournament</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={createTournament} className="space-y-4">
                    <Input name="name" placeholder="Tournament name" required />
                    <Input name="location" placeholder="Location" />
                    <DatePickerWithRange />
                    <Button type="submit" className="w-full">
                        Create
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewTournamentPage;
