const Database = require('./database');
const fs = require('fs');

console.log('🚀 Carregando demo...');

const demoSql = `
INSERT OR IGNORE INTO pacientes (nome, data_nascimento, endereco, telefone, responsavel, telefone_responsavel) VALUES
('Maria Silva', '1945-03-12', 'Rua das Flores 123', '1198888-9999', 'Ana Silva', '1197777-8888'),
('João Santos', '1950-07-25', 'Av Paulista 456', '1196666-7777', 'Maria Santos', '1195555-6666'),
('Antônio Costa', '1938-11-08', 'Rua Central 789', '1194444-5555', 'Filho', '1193333-4444');

INSERT OR IGNORE INTO rotinas (paciente_id, dia_semana, horario, atividade, descricao) VALUES
(1, 'segunda', '08:00', 'Medicação', 'Comprimido azul'),
(1, 'terca', '09:00', 'Medicação', 'Comprimido vermelho'),
(2, 'segunda', '07:30', 'Insulina', 'Manhã + lanche');

INSERT OR IGNORE INTO atendimentos (paciente_id, data_atendimento, hora, atividades_realizadas, observacoes, estado_saude) VALUES
(1, '2024-03-23', '08:15', 'Medicação OK', 'Paciente animada', 'bom'),
(1, '2024-03-22', '08:20', 'Medicação', 'Dor leve joelho', 'regular'),
(2, '2024-03-23', '07:45', 'Insulina', 'Glicemia normal', 'bom');
`;

const db = new Database();
db.db.exec(demoSql, (err) => {
    if (err) console.error('Erro:', err);
    else console.log('✅ DEMO CARREGADA! 3 pacientes + 5 registros!');
    process.exit();
});
