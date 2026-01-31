import { Match, Team } from "./generated/prisma/client";

export interface PointsRow {
    teamId: string;
    teamName: string;
    played: number;
    wins: number;
    losses: number;
}

export const calculatePointsTable = (
    teams: Team[],
    matches: Match[],
): PointsRow[] => {
    const table: Record<string, PointsRow> = {};
    for (const team of teams) {
        table[team.id] = {
            teamId: team.id,
            teamName: team.name,
            played: 0,
            wins: 0,
            losses: 0,
        };
    }
    for (const match of matches) {
        if (!match.winnerTeamId) {
            continue;
        }
        const winner = match.winnerTeamId;
        const loser = winner === match.teamAId ? match.teamBId : match.teamAId;
        table[winner].played++;
        table[winner].wins++;
        table[loser].played++;
        table[loser].losses++;
    }
    return Object.values(table).sort((a, b) => b.wins - a.wins);
};
