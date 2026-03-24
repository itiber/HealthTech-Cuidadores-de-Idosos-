-- 3 PACIENTES REAIS
INSERT INTO pacientes (nome, data_nascimento, endereco, telefone, responsavel, telefone_responsavel) VALUES
('Maria Silva', '1945-03-12', 'Rua das Flores 123', '1198888-9999', 'Ana Silva', '1197777-8888'),
('João Santos', '1950-07-25', 'Av Paulista 456', '1196666-7777', 'Maria Santos', '1195555-6666'),
('Antônio Costa', '1938-11-08', 'Rua Central 789', '1194444-5555', 'Filho', '1193333-4444');

-- ROTINAS SEMANAIS
INSERT INTO rotinas (paciente_id, dia_semana, horario, atividade, descricao) VALUES
(1, 'segunda', '08:00', 'Medicação', 'Comprimido azul 1x/dia + café'),
(1, 'segunda', '14:00', 'Fisioterapia', 'Exercícios equilíbrio 30min'),
(1, 'terca', '09:00', 'Medicação', 'Comprimido vermelho 1x/dia'),
(2, 'segunda', '07:30', 'Medicação', 'Insulina manhã + lanche'),
(2, 'quarta', '16:00', 'Consulta', 'Oftalmologista mensal'),
(3, 'sexta', '10:00', 'Higiene', 'Banho completo + talco');

-- 12 ATENDIMENTOS (2 semanas)
INSERT INTO atendimentos (paciente_id, data_atendimento, hora, atividades_realizadas, observacoes, estado_saude) VALUES
-- Maria Silva (6 atendimentos)
(1, '2024-03-15', '08:15', 'Medicação + fisioterapia', 'Paciente animada, fez todos exercícios', 'bom'),
(1, '2024-03-16', '09:05', 'Medicação vermelha', 'Refeição boa, humor estável', 'bom'),
(1, '2024-03-17', '08:20', 'Medicação + fisioterapia', 'Dor leve joelho esquerdo', 'regular'),
(1, '2024-03-20', '08:10', 'Medicação', 'Excelente apetite hoje', 'bom'),
(1, '2024-03-22', '09:00', 'Medicação', 'Leve tontura após levantar', 'ruim'),
(1, '2024-03-23', '08:18', 'Medicação + fisioterapia', 'Melhorou da tontura', 'bom'),

-- João Santos (4 atendimentos)
(2, '2024-03-16', '07:45', 'Insulina + lanche', 'Glicemia 120 - normal', 'bom'),
(2, '2024-03-18', '07:50', 'Insulina', 'Glicemia 180 - ajustou dose', 'regular'),
(2, '2024-03-20', '07:40', 'Insulina + lanche', 'Glicemia 110 - ótima', 'bom'),
(2, '2024-03-22', '07:55', 'Insulina', 'Paciente esqueceu lanche', 'regular'),

-- Antônio Costa (2 atendimentos)
(3, '2024-03-22', '10:15', 'Banho completo', 'Ótima higiene, talco aplicado', 'bom'),
(3, '2024-03-23', '10:20', 'Higiene', 'Recusou banho hoje', 'regular');