import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginBottom: 20,
    },
    appTitle: {
        color: "#FFF",
        fontSize: 28,
        fontWeight: "bold",
    },
    appSubtitle: {
        color: "#676767",
        fontSize: 14,
        marginTop: 2,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2A2A2A",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 46,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: "#FFF",
        fontSize: 16,
    },
    listContent: {
        paddingBottom: 100,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#2A2A2A",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        alignItems: "center",
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 6,
    },
    imagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 6,
        backgroundColor: "#3A3A3A",
        justifyContent: "center",
        alignItems: "center",
    },
    productInfo: {
        flex: 1,
        marginLeft: 12,
    },
    productTitle: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    productDescription: {
        color: "#676767",
        fontSize: 13,
        marginTop: 2,
    },
    productMeta: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },
    productQty: {
        color: "#1E3A8A",
        fontWeight: "600",
        fontSize: 14,
    },
    productPrice: {
        color: "#10B981",
        fontWeight: "bold",
        fontSize: 14,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
        gap: 10,
    },
    emptyText: {
        color: "#676767",
        fontSize: 16,
    },
    fab: {
        position: "absolute",
        bottom: 30,
        right: 20,
        backgroundColor: "#1E3A8A",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
});

export default styles