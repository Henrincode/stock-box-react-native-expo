import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useProductRepository, ProductDatabase } from "@/database/productRepository";
import { useFocusEffect, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import styles from "./style"

export default function Home() {
  const repository = useProductRepository();

  const [produtos, setProdutos] = useState<ProductDatabase[]>([]);
  const [pesquisa, setPesquisa] = useState("");

  // Função para buscar os produtos no banco de dados
  async function carregarProdutos() {
    // router.navigate('./teste')
    try {
      if (pesquisa.trim() !== "") {
        const resultado = await repository.searchByName(pesquisa);
        setProdutos(resultado);
      } else {
        const resultado = await repository.listAll();
        setProdutos(resultado);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, [pesquisa])
  );

  // Função que lida com o clique no card e envia o id via query params
  function handleProductDetails(id: number) {
    router.push({
      pathname: "/details",
      params: { id: id }
    });
  }

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.container}>

        {/* Cabeçalho com Título */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>StockBox</Text>
          <Text style={styles.appSubtitle}>Controle de Estoque Local</Text>
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#676767" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produto por nome..."
            placeholderTextColor="#676767"
            value={pesquisa}
            onChangeText={setPesquisa}
          />
          {pesquisa.length > 0 && (
            <TouchableOpacity onPress={() => setPesquisa("")}>
              <Feather name="x" size={18} color="#676767" />
            </TouchableOpacity>
          )}
        </View>

        {/* Listagem de Produtos */}
        <FlatList
          data={produtos}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}

          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Feather name="package" size={48} color="#676767" />
              <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
            </View>
          )}

          renderItem={({ item }) => (
            /* Transformado em TouchableOpacity para aceitar o clique */
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleProductDetails(item.id)}
              activeOpacity={0.7}
            >
              {/* Imagem do Produto ou Placeholder */}
              {item.url_imagem ? (
                <Image source={{ uri: item.url_imagem }} style={styles.productImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Feather name="image" size={20} color="#676767" />
                </View>
              )}

              {/* Informações do Produto */}
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={1}>{item.titulo}</Text>
                {item.descricao && (
                  <Text style={styles.productDescription} numberOfLines={1}>{item.descricao}</Text>
                )}
                <View style={styles.productMeta}>
                  <Text style={styles.productQty}>Qtd: {item.quantidade}</Text>
                  <Text style={styles.productPrice}>
                    R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

      </View>

      {/* Botão Flutuante (FAB) de Criar */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/create")}
        activeOpacity={0.7}
      >
        <Feather name="plus" size={28} color="#FFF" />
      </TouchableOpacity>
    </ScreenContainer>
  );
}

