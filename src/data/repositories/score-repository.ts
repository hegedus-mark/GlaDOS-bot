import {UserScore} from "../models/user-score.js";
import Database from "better-sqlite3";


export class ScoreRepository {

    private readonly db: Database.Database;

    constructor(db: Database.Database) {
        this.db = db;
    }

    addScore(userScore: UserScore) {
        const stmt = this.db.prepare(`
            INSERT INTO scores(userId, score)
            VALUES (?, ?)
            ON CONFLICT (userId, guildId)
            DO UPDATE SET score = score + ?`);

        stmt.run(userScore.userId, userScore, userScore);
    }

    getLeaderboard(guildId: string, limit: number = 10): UserScore[] {
        const stmt = this.db.prepare(`
            SELECT userId, guildId, score
            FROM scores
            WHERE guildId = ?
            ORDER BY score DESC
            LIMIT ?
        `);
        return stmt.all(guildId, limit) as UserScore[];
    }
}