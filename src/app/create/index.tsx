import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useProductRepository } from "@/database/productRepository";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function CreateProduct() {
  const repository = useProductRepository();

  // Estados para controlar o formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [urlImagem, setUrlImagem] = useState(""); // 👈 Novo estado para a imagem

  async function handleSave() {
    // 1️⃣ Validações rígidas dos campos obrigatórios
    if (!titulo.trim()) {
      Alert.alert("Campo Obrigatório", "Por favor, insira o nome do produto.");
      return;
    }

    if (!quantidade.trim()) {
      Alert.alert("Campo Obrigatório", "Por favor, insira a quantidade em estoque.");
      return;
    }

    if (!valor.trim()) {
      Alert.alert("Campo Obrigatório", "Por favor, insira o valor unitário.");
      return;
    }

    // Convertendo e tratando os valores numéricos
    const qtdConvertida = parseInt(quantidade, 10);
    const valorConvertido = parseFloat(valor.replace(",", "."));

    // 2️⃣ Validações de formato numérico inválido
    if (isNaN(qtdConvertida) || qtdConvertida < 0) {
      Alert.alert("Dado Inválido", "A quantidade deve ser um número maior ou igual a zero.");
      return;
    }

    if (isNaN(valorConvertido) || valorConvertido < 0) {
      Alert.alert("Dado Inválido", "O valor unitário deve ser um número válido e maior ou igual a zero.");
      return;
    }

    try {
      // 3️⃣ Salvando no banco de dados
      await repository.create({
        titulo: titulo.trim(),
        descricao: descricao.trim() === "" ? null : descricao.trim(), // Opcional (salva null se vazio)
        quantidade: qtdConvertida,
        valor: valorConvertido,
        url_imagem: urlImagem.trim() === "" ? null : urlImagem.trim(), // Salva null se não enviar link
      });

      Alert.alert("Sucesso", "Produto cadastrado com sucesso!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o produto no banco local.");
    }
  }

  return (
    <ScreenContainer scrollable>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Novo Produto</Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <Text style={styles.label}>Nome do Produto *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Caixa de Parafusos"
          placeholderTextColor="#555"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Descrição <Text style={styles.optionalText}>(Opcional)</Text></Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Detalhes sobre o produto..."
          placeholderTextColor="#555"
          multiline
          numberOfLines={3}
          value={descricao}
          onChangeText={setDescricao}
        />

        {/* Linha com Qtd e Valor */}
        {/* <View style={styles.row}> */}
          {/* <View style={styles.column}> */}
            <Text style={styles.label}>Quantidade *</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#555"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />
          {/* </View> */}

          {/* <View style={styles.column}> */}
            <Text style={styles.label}>Valor Unitário (R$) *</Text>
            <TextInput
              style={styles.input}
              placeholder="0,00"
              placeholderTextColor="#555"
              keyboardType="decimal-pad"
              value={valor}
              onChangeText={setValor}
            />
          {/* </View> */}
        {/* </View> */}

        {/* Campo da URL da Imagem */}
        <Text style={styles.label}>URL da Imagem *</Text>
        <TextInput
          style={styles.input}
          placeholder="https://exemplo.com/imagem.jpg"
          placeholderTextColor="#555"
          keyboardType="url"
          autoCapitalize="none"
          autoCorrect={false}
          value={urlImagem}
          onChangeText={setUrlImagem}
        />

        {/* Botão de Salvar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Salvar no Estoque</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
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
  form: {
    gap: 15,
  },
  label: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: -5,
  },
  optionalText: {
    color: "#676767",
    fontSize: 12,
    fontWeight: "normal",
  },
  input: {
    backgroundColor: "#2A2A2A",
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 16,
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
  column: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});