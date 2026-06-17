import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useProductRepository, ProductDatabase } from "@/database/productRepository";
import { Feather } from "@expo/vector-icons";

export default function ProductDetails() {
    // Captura os parâmetros passados pela rota (o id vem como string)
    const params = useLocalSearchParams();
    const productId = Number(params.id);

    const repository = useProductRepository();
    const [produto, setProduto] = useState<ProductDatabase | null>(null);

    // Função para buscar os detalhes do produto específico
    async function carregarDetalhesProduto() {
        try {
            // Como o nosso repositório atual não tem "buscar por ID", podemos usar o listAll e filtrar,
            // ou fazer a query direto. Vamos buscar de forma simples filtrando da lista por agora.
            const todos = await repository.listAll();
            const encontrado = todos.find((item) => item.id === productId);

            if (encontrado) {
                setProduto(encontrado);
            } else {
                Alert.alert("Erro", "Produto não encontrado.", [
                    { text: "OK", onPress: () => router.back() }
                ]);
            }
        } catch (error) {
            console.error("Erro ao carregar detalhes:", error);
            Alert.alert("Erro", "Não foi possível carregar os dados do produto.");
        }
    }

    // Recarrega os dados caso você volte da tela de edição
    useFocusEffect(
        useCallback(() => {
            if (productId) {
                carregarDetalhesProduto();
            }
        }, [productId])
    );

    // Função para deletar o produto com aviso de confirmação
    function handleConfirmDelete() {
        Alert.alert(
            "Excluir Produto",
            `Tem certeza que deseja remover "${produto?.titulo}" do estoque?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await repository.remove(productId);
                            Alert.alert("Sucesso", "Produto removido com sucesso!", [
                                { text: "OK", onPress: () => router.replace("/") } // Força o retorno para a Home atualizando tudo
                            ]);
                        } catch (error) {
                            console.error(error);
                            Alert.alert("Erro", "Não foi possível excluir o produto.");
                        }
                    }
                }
            ]
        );
    }

    if (!produto) {
        return (
            <ScreenContainer scrollable={false}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Carregando detalhes...</Text>
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
                <Text style={styles.title}>Detalhes do Item</Text>
            </View>

            {/* Bloco de Imagem Grande */}
            {produto.url_imagem ? (
                <Image source={{ uri: produto.url_imagem }} style={styles.mainImage} resizeMode="cover" />
            ) : (
                <View style={styles.imagePlaceholderLarge}>
                    <Feather name="image" size={48} color="#676767" />
                    <Text style={styles.placeholderText}>Sem imagem cadastrada</Text>
                </View>
            )}

            {/* Informações detalhadas */}
            <View style={styles.infoContainer}>
                <Text style={styles.productTitle}>{produto.titulo}</Text>

                <View style={styles.badgeContainer}>
                    <View style={styles.qtyBadge}>
                        <Text style={styles.qtyBadgeText}>Estoque: {produto.quantidade} un</Text>
                    </View>
                    <Text style={styles.productPrice}>
                        R$ {produto.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.sectionLabel}>Descrição</Text>
                <Text style={styles.productDescription}>
                    {produto.descricao ? produto.descricao : "Nenhuma descrição informada para este produto."}
                </Text>

                <View style={styles.divider} />

                {/* Botões de Ação */}
                <View style={styles.actionsRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        activeOpacity={0.8}
                        onPress={() => Alert.alert("Em breve", "Vamos linkar a edição no próximo passo!")}
                    >
                        <Feather name="edit-2" size={18} color="#FFF" />
                        <Text style={styles.actionButtonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={handleConfirmDelete}
                        activeOpacity={0.8}
                    >
                        <Feather name="trash-2" size={18} color="#FFF" />
                        <Text style={styles.actionButtonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: "#676767",
        fontSize: 16,
    },
    mainImage: {
        width: "100%",
        // height: 220,
        borderRadius: 12,
        marginBottom: 20,
        aspectRatio: 8/6,
    },
    imagePlaceholderLarge: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        backgroundColor: "#2A2A2A",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        gap: 10,
    },
    placeholderText: {
        color: "#676767",
        fontSize: 14,
    },
    infoContainer: {
        backgroundColor: "#2A2A2A",
        borderRadius: 12,
        padding: 20,
        gap: 15,
    },
    productTitle: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "bold",
    },
    badgeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    qtyBadge: {
        backgroundColor: "#1E3A8A",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    qtyBadgeText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 14,
    },
    productPrice: {
        color: "#10B981",
        fontSize: 22,
        fontWeight: "bold",
    },
    divider: {
        height: 1,
        backgroundColor: "#3A3A3A",
        marginVertical: 10,
    },
    sectionLabel: {
        color: "#676767",
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: -5,
    },
    productDescription: {
        color: "#DDD",
        fontSize: 16,
        lineHeight: 24,
    },
    actionsRow: {
        flexDirection: "row",
        gap: 15,
        marginTop: 10,
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 12,
        borderRadius: 8,
    },
    editButton: {
        backgroundColor: "#3B82F6", // Azul para edição
    },
    deleteButton: {
        backgroundColor: "#EF4444", // Vermelho para exclusão
    },
    actionButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});