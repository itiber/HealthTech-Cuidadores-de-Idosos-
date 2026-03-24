const readline = require('readline-sync');
const PacienteService = require('./pacienteService');
const RotinaService = require('./rotinaService');
const AtendimentoService = require('./atendimentoService');

const ps = new PacienteService();
const rs = new RotinaService();
const as = new AtendimentoService();

console.log('🚀 HealthTech - Cuidadores de Idosos');
console.log('=====================================\n');

async function main() {
    while (true) {
        console.log('\n📋 MENU');
        console.log('1️⃣  👤 Pacientes');
        console.log('2️⃣  📅 Rotinas');
        console.log('3️⃣  📝 Atendimentos');
        console.log('4️⃣  📊 Relatórios');
        console.log('0️⃣  Sair');
        
        const op = readline.question('Opção: ');
        
        try {
            switch(op) {
                case '1': await pacientes(); break;
                case '2': await rotinas(); break;
                case '3': await atendimentos(); break;
                case '4': await relatorios(); break;
                case '0': process.exit();
                default: console.log('❌ Opção inválida!');
            }
        } catch(e) {
            console.log('❌ Erro:', e.message);
        }
    }
}

async function pacientes() {
    console.log('\n👤 PACIENTES');
    const lista = await ps.listar();
    
    if (lista.length === 0) {
        return novoPaciente();
    }
    
    lista.forEach(p => console.log(`${p.id}. ${p.nome}`));
    const id = readline.question('\nID ou 0(novo): ');
    
    if (id === '0') novoPaciente();
    else {
        const pac = await ps.buscarPorId(parseInt(id));
        console.log('\n📄', JSON.stringify(pac, null, 2));
    }
}

async function novoPaciente() {
    const pac = {
        nome: readline.question('Nome: '),
        data_nascimento: readline.question('Nascimento [Enter pular]: '),
        endereco: readline.question('Endereço [Enter pular]: '),
        telefone: readline.question('Telefone [Enter pular]: ')
    };
    await ps.criar(pac);
    console.log('✅ Cadastrado!');
}

async function rotinas() {
    const lista = await ps.listar();
    if (lista.length === 0) return console.log('❌ Cadastre pacientes!');
    
    lista.slice(0,3).forEach(p => console.log(`${p.id}. ${p.nome}`));
    const id = parseInt(readline.question('Paciente ID: '));
    
    const rotina = {
        paciente_id: id,
        dia_semana: readline.question('Dia: '),
        horario: readline.question('Horário: '),
        atividade: readline.question('Atividade: '),
        descricao: readline.question('Descrição: ')
    };
    
    await rs.criar(rotina);
    console.log('✅ Rotina salva!');
}

async function atendimentos() {
    const lista = await ps.listar();
    if (lista.length === 0) return console.log('❌ Cadastre pacientes!');
    
    lista.slice(0,3).forEach(p => console.log(`${p.id}. ${p.nome}`));
    const id = parseInt(readline.question('Paciente ID: '));
    
    const hoje = new Date().toISOString().split('T')[0];
    const agora = new Date().toTimeString().slice(0,5);
    
    const att = {
        paciente_id: id,
        data_atendimento: readline.question(`Data [hoje ${hoje}]: `) || hoje,
        hora: readline.question(`Hora [agora ${agora}]: `) || agora,
        atividades_realizadas: readline.question('Fez o quê: '),
        observacoes: readline.question('Observações: '),
        estado_saude: readline.question('Estado (bom/ruim): ')
    };
    
    await as.registrar(att);
    console.log('✅ Atendimento registrado!');
}

async function relatorios() {
    const lista = await ps.listar();
    if (lista.length === 0) return console.log('❌ Cadastre pacientes!');
    
    lista.slice(0,3).forEach(p => console.log(`${p.id}. ${p.nome}`));
    const id = parseInt(readline.question('Relatório ID: '));
    
    const rel = await as.relatorioPaciente(id);
    console.log('\n📊 RELATÓRIO:', JSON.stringify(rel, null, 2));
}

main();