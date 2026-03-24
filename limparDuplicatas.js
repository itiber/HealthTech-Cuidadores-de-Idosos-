const Database = require('./database');

const db = new Database();

async function limpar() {
    console.log('🧹 Limpando duplicatas...');
    
    // Manter apenas 1 de cada paciente (menor ID)
    await db.run(`DELETE FROM pacientes WHERE id NOT IN (
        SELECT MIN(id) FROM pacientes GROUP BY nome
    )`);
    
    // Rotinas apenas para pacientes válidos
    await db.run(`DELETE FROM rotinas WHERE paciente_id NOT IN (SELECT id FROM pacientes)`);
    
    // Atendimentos apenas para pacientes válidos
    await db.run(`DELETE FROM atendimentos WHERE paciente_id NOT IN (SELECT id FROM pacientes)`);
    
    const pacs = await db.query('SELECT COUNT(*) as total FROM pacientes');
    const rots = await db.query('SELECT COUNT(*) as total FROM rotinas');
    const atts = await db.query('SELECT COUNT(*) as total FROM atendimentos');
    
    console.log('✅ LIMPO!');
    console.log(`👤 ${pacs[0].total} pacientes únicos`);
    console.log(`📅 ${rots[0].total} rotinas`);
    console.log(`📝 ${atts[0].total} atendimentos`);
    process.exit();
}

limpar();