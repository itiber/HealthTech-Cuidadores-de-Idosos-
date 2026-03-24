const Database = require('../database');

class PacienteService {
    constructor() {
        this.db = new Database();
    }

    async listar() {
        return await this.db.query('SELECT * FROM pacientes ORDER BY nome');
    }

    async criar(paciente) {
        return await this.db.run(`
            INSERT INTO pacientes (nome, data_nascimento, endereco, telefone, responsavel, telefone_responsavel)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [paciente.nome, paciente.data_nascimento || null, paciente.endereco || null, paciente.telefone || null, paciente.responsavel || null, paciente.telefone_responsavel || null]);
    }

    async buscarPorId(id) {
        const pacientes = await this.db.query('SELECT * FROM pacientes WHERE id = ?', [id]);
        return pacientes[0];
    }
}

module.exports = PacienteService;