import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "@/database/initializeDatabase";
import { View } from "react-native";

export default function RootLayout() {
    return (
        <SQLiteProvider databaseName="stockbox.db" onInit={initializeDatabase} >
            <View style={{ backgroundColor: '#000', flex: 1 }}>
                <Stack screenOptions={{ headerShown: false }} />
            </View>
        </SQLiteProvider>
    );
}