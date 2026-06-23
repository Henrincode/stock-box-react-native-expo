import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"

type Props = {
    title: string
}

export default function NavBarBack({ title }: Props) {
    return (
        // navBar
        < View style={styles.container} >
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Feather name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
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
})