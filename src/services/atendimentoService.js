const Database = require('../database');

class AtendimentoService {
    constructor() {
        this.db = new Database();
    }

    async registrar(atendimento) {
        return await this.db.run(`
            INSERT INTO atendimentos (paciente_id, data_atendimento, hora, atividades_realizadas, observacoes, estado_saude)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [atendimento.paciente_id, atendimento.data_atendimento, atendimento.hora, atendimento.atividades_realizadas, atendimento.observacoes, atendimento.estado_saude]);
    }

    async relatorioPaciente(pacienteId, dias = 7) {
        const dataLimite = new Date();
        dataLimite.setDate(dataLimite.getDate() - dias);
        
        const atendimentos = await this.db.query(`
            SELECT * FROM atendimentos 
            WHERE paciente_id = ? AND data_atendimento >= ?
            ORDER BY data_atendimento DESC
        `, [pacienteId, dataLimite.toISOString().split('T')[0]]);
        
        const estados = atendimentos.reduce((acc, att) => {
            acc[att.estado_saude] = (acc[att.estado_saude] || 0) + 1;
            return acc;
        }, {});

        return {
            total: atendimentos.length,
            resumo: {
                estados_saude: estados,
                ultimo: atendimentos[0],
                periodo: `${dias} dias`
            }
        };
    }
}

module.exports = AtendimentoService;