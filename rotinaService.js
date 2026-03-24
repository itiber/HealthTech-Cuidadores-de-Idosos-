const Database = require('./database');

class RotinaService {
    constructor() {
        this.db = new Database();
    }

    async listarPorPaciente(pacienteId) {
        return await this.db.query('SELECT * FROM rotinas WHERE paciente_id = ? ORDER BY dia_semana, horario', [pacienteId]);
    }

    async criar(rotina) {
        return await this.db.run(`
            INSERT INTO rotinas (paciente_id, dia_semana, horario, atividade, descricao)
            VALUES (?, ?, ?, ?, ?)
        `, [rotina.paciente_id, rotina.dia_semana, rotina.horario, rotina.atividade, rotina.descricao]);
    }
}

module.exports = RotinaService;