import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useLocalSearchParams, router } from "expo-router";
import { useProductRepository } from "@/database/productRepository";
import { Feather } from "@expo/vector-icons";

export default function EditProduct() {
  // Captura o 'id' direto do nome da pasta dinâmica [id] na URL
  const { id } = useLocalSearchParams();
  const productId = Number(id);

  const repository = useProductRepository();
  const [loading, setLoading] = useState(true);

  // Estados do formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [urlImagem, setUrlImagem] = useState("");

  // Carrega os dados atuais do produto para preencher os inputs
  async function carregarProduto() {
    try {
      const todos = await repository.listAll();
      const encontrado = todos.find((item) => item.id === productId);

      if (encontrado) {
        setTitulo(encontrado.titulo);
        setDescricao(encontrado.descricao || "");
        setQuantidade(String(encontrado.quantidade));
        setValor(String(encontrado.valor));
        setUrlImagem(encontrado.url_imagem || "");
      } else {
        Alert.alert("Erro", "Produto não encontrado.", [{ text: "OK", onPress: () => router.back() }]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os dados do produto.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (productId) {
      carregarProduto();
    }
  }, [productId]);

  // Função para salvar as alterações (UPDATE)
  async function handleSave() {
    if (!titulo.trim() || !quantidade.trim() || !valor.trim()) {
      return Alert.alert("Aviso", "Por favor, preencha os campos obrigatórios (Título, Quantidade e Valor).");
    }

    try {
      // Aqui usamos a função de atualizar do seu repositório
      await repository.update({
        id: productId,
        titulo,
        descricao,
        quantidade: Number(quantidade),
        valor: Number(valor.replace(",", ".")), // Trata caso digitem com vírgula
        url_imagem: urlImagem,
      });

      Alert.alert("Sucesso", "Produto atualizado com sucesso!", [
        { text: "OK", onPress: () => router.back() } // Volta para a tela de detalhes que já vai se atualizar
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar o produto.");
    }
  }

  if (loading) {
    return (
      <ScreenContainer scrollable={false}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Carregando dados do produto...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Produto</Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <Text style={styles.label}>Título do Produto *</Text>
        <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Ex: Furadeira de Impacto" placeholderTextColor="#676767" />

        <Text style={styles.label}>Descrição</Text>
        <TextInput style={[styles.input, styles.textArea]} value={descricao} onChangeText={setDescricao} placeholder="Detalhes sobre o produto..." placeholderTextColor="#676767" multiline numberOfLines={3} />

        {/* <View style={styles.row}> */}
          {/* <View style={styles.flex1}> */}
            <Text style={styles.label}>Quantidade *</Text>
            <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" placeholder="0" placeholderTextColor="#676767" />
          {/* </View> */}

          {/* <View style={styles.flex1}> */}
            <Text style={styles.label}>Valor (R$) *</Text>
            <TextInput style={styles.input} value={valor} onChangeText={setValor} keyboardType="decimal-pad" placeholder="0.00" placeholderTextColor="#676767" />
          {/* </View> */}
        {/* </View> */}

        <Text style={styles.label}>URL da Imagem</Text>
        <TextInput style={styles.input} value={urlImagem} onChangeText={setUrlImagem} placeholder="https://linkdaimagem.com/foto.jpg" placeholderTextColor="#676767" autoCapitalize="none" keyboardType="url" />

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.8} onPress={handleSave}>
          <Feather name="check" size={20} color="#FFF" />
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    gap: 15,
  },
  backButton: {
    padding: 5,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  loadingText: {
    color: "#676767",
    fontSize: 16,
  },
  form: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 20,
    gap: 15,
  },
  label: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: -5,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  flex1: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});