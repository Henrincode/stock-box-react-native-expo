import { useSQLiteContext } from "expo-sqlite";

// Interface que define a estrutura de um produto no banco de dados
export interface ProductDatabase {
  id: number;
  titulo: string;
  descricao: string | null;
  quantidade: number;
  valor: number;
  url_imagem: string | null;
}

export function useProductRepository() {
  const database = useSQLiteContext();

  // create
  async function create(product: Omit<ProductDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO products (titulo, descricao, quantidade, valor, url_imagem) VALUES ($titulo, $descricao, $quantidade, $valor, $url_imagem)"
    );

    try {
      const result = await statement.executeAsync({
        $titulo: product.titulo,
        $descricao: product.descricao,
        $quantidade: product.quantidade,
        $valor: product.valor,
        $url_imagem: product.url_imagem,
      });

      return { insertedId: result.lastInsertRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  // find
  async function listAll() {
    try {
      const query = "SELECT * FROM products ORDER BY titulo ASC";
      const response = await database.getAllAsync<ProductDatabase>(query);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // findByName
  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM products WHERE titulo LIKE ? ORDER BY titulo ASC";
      const response = await database.getAllAsync<ProductDatabase>(query, `%${name}%`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // update
  async function update(product: ProductDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE products SET titulo = $titulo, descricao = $descricao, quantidade = $quantidade, valor = $valor, url_imagem = $url_imagem WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: product.id,
        $titulo: product.titulo,
        $descricao: product.descricao,
        $quantidade: product.quantidade,
        $valor: product.valor,
        $url_imagem: product.url_imagem,
      });
      
      console.log(`Produto ID ${product.id} atualizado com sucesso!`);
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  // delete
  async function remove(id: number) {
    const statement = await database.prepareAsync(
      "DELETE FROM products WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: id,
      });
      console.log(`Produto ID ${id} removido com sucesso!`);
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  return {
    create,
    listAll,
    searchByName,
    update,
    remove, // Opção de deletar exportada aqui
  };
}