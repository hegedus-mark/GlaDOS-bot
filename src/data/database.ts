import Database from 'better-sqlite3';
import {ScoreRepository} from "./repositories/score-repository.js";

export class AppDatabase{
    private readonly db: Database.Database;
    private scoreRepository: ScoreRepository;


    constructor(dbPath: string) {
        this.db = new Database(dbPath);
        this.db.pragma('journal_mode = WAL');
        this.initTables();
        this.scoreRepository = new ScoreRepository(this.db);
    }


    private initTables(): void{
        this.db.exec(`CREATE TABLE IF NOT EXISTS scores
                      (
                          userId TEXT NOT NULL,
                          score  INTEGER DEFAULT 0
                      )`);
    }


    close(){
        this.db.close();
    }



}