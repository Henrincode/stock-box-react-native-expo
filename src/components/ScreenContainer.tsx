import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
// Trocamos o Constants pelo hook oficial de insets
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

interface ScreenContainerProps {
    children: React.ReactNode;
    scrollable?: boolean;
}

export function ScreenContainer({ children, scrollable = false }: ScreenContainerProps) {

    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {scrollable ? (
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 10, paddingBottom: insets.bottom, }]}
                    keyboardShouldPersistTaps="handled"
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            ) : (
                <View style={[styles.content, { paddingTop: insets.top + 10, paddingBottom: insets.bottom, }]}>
                    {children}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    scrollContent: {
        padding: 10,
        minHeight: '100%',
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
    },
});