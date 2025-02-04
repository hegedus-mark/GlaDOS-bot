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
            ON CONFLICT (userId)
                DO UPDATE SET score = score + ?`);

        stmt.run(userScore.userId, userScore.score, userScore.score);
    }

    getScore(userId: string): UserScore {
        const stmt = this.db.prepare(`
            SELECT userId, score
            FROM scores
            WHERE userId = ?`);

        return stmt.get(userId) as UserScore;
    }

    getLeaderboard(limit: number = 10): UserScore[] {
        const stmt = this.db.prepare(`
            SELECT userId, score
            FROM scores
            ORDER BY score DESC
            LIMIT ?
        `);
        return stmt.all(limit) as UserScore[];
    }
}