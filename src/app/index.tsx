import { View, Text, StyleSheet } from "react-native"

import { ScreenContainer } from "@/components/ScreenContainer"

export default function Home() {
    return (
        <ScreenContainer scrollable>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
                <Text style={styles.text}>
                    Olá mundo!
                </Text>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A1A1A"
    },
    text: {
        color: "#676767",
        fontSize: 40,

    }
})