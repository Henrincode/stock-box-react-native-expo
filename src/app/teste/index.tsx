import { ScreenContainer } from "@/components/ScreenContainer"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import NavBarBack from "@/components/NavBar/Back"
import { Image } from "expo-image"

export default function Home() {
    return (
        <ScreenContainer scrollable>
            <NavBarBack title="Detalhes do item" />

            <View style={{ gap: 20 }}>
                {/* img */}
                <Image style={styles.image} source={{
                    uri: 'https://img-estoquenow.s3.amazonaws.com/items/3183/maquita_25f82a86ced07c38758d9373ee70931d.jpeg'
                }} />

                {/* detailsView */}
                <View style={styles.detailsView}>
                    {/* name */}
                    <Text style={styles.title}>Nome do produto</Text>

                    {/* stockView */}
                    <View style={styles.stockView}>
                        {/* divider */}
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            {/* inStock */}
                            <View style={[styles.stockSection, styles.inStock]}>
                                <Text style={styles.stockSectionTitle}>ESTOQUE</Text>
                                <Text style={styles.stockSectionValue}>123</Text>
                            </View>
                            {/* priceUnit */}
                            <View style={[styles.stockSection, styles.priceUnit]}>
                                <Text style={styles.stockSectionTitle}>R$ UNIDADE</Text>
                                <Text style={styles.stockSectionValue}>R$ 123</Text>
                            </View>
                        </View>
                        {/* priceStock */}
                        <View style={[styles.stockSection, styles.priceStock]}>
                            <Text style={styles.stockSectionTitle}>R$ ESTOQUE</Text>
                            <Text style={styles.stockSectionValue}>R$ 1.234,56</Text>
                        </View>

                    </View>
                    {/* description */}
                    <View>
                        <Text style={styles.descLabel}>
                            DESCRIÇÃO:
                        </Text>
                        <Text style={styles.descText}>
                            Descrição do produto, enchendo farofa na descrição
                        </Text>
                    </View>

                    {/* bntView */}
                    {/* btnEdit */}
                    {/* btnDelete */}

                </View>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        borderRadius: 20,
        aspectRatio: 1 / 1,
    },
    detailsView: {
        gap: 20,
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#2a2a2a',
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    stockView: {
        gap: 10,
    },
    stockSection: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#3a3a3a",
    },
    stockSectionTitle: {
        color: '#ccc',
    },
    stockSectionValue: {
        color: 'yellow',
        fontSize: 36
    },
    inStock: {
        paddingLeft: 40,
        paddingRight: 40,
    },
    priceUnit: {
        flex: 1,
    },
    priceStock: {},
    descLabel: {
        color: 'gray',
        marginBottom: 4,
    },
    descText: {
        color: 'white',
    }
})