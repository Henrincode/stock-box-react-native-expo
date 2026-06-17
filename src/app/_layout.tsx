import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "@/database/initializeDatabase";

export default function RootLayout() {
    return (
        <SQLiteProvider databaseName="stockbox.db" onInit={initializeDatabase} >
            <Slot screenOptions={{headerShown: false}}/>
        </SQLiteProvider>
    );
}