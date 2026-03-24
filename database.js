const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname, 'healthtech.db'));
        this.init();
    }

    init() {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS pacientes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                data_nascimento DATE,
                endereco TEXT,
                telefone TEXT,
                responsavel TEXT,
                telefone_responsavel TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS rotinas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                paciente_id INTEGER,
                dia_semana TEXT,
                horario TIME,
                atividade TEXT,
                descricao TEXT,
                FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
            );
            CREATE TABLE IF NOT EXISTS atendimentos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                paciente_id INTEGER,
                data_atendimento DATE,
                hora TIME,
                atividades_realizadas TEXT,
                observacoes TEXT,
                estado_saude TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
            );
        `);
    }

    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID });
            });
        });
    }
}

module.exports = Database;