import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(database: SQLiteDatabase) {
  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT,
        quantidade INTEGER NOT NULL DEFAULT 0,
        valor REAL NOT NULL DEFAULT 0.0,
        url_imagem TEXT
      );
    `);
    
    console.log("Banco de dados inicializado com sucesso (Tabela 'products' pronta)!");
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
  }
}