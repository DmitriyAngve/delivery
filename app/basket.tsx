import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import useBasketStore from "../store/basketStore";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const Basket = () => {
  // Беру данные из store
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState();

  return (
    <>
      {order && <Text>Cool order</Text>}

      {!order && (
        <>
          {/* FlatList always needs some data! */}
          <FlatList
            data={products}
            ListHeaderComponent={<Text style={styles.section}>Items</Text>}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            )}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={{ fontSize: 18, color: Colors.primary }}>
                  {item.quantity}x
                </Text>
                <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                <Text style={{ fontSize: 18 }}>
                  ${item.price * item.quantity}
                </Text>
              </View>
            )}
            ListFooterComponent={
              <View>
                {/* Separator (only line) */}
                <View
                  style={{ height: 1, backgroundColor: Colors.grey }}
                ></View>
                {/* Separator (only line) */}
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Subtotal</Text>
                  <Text style={{ fontSize: 18 }}>${total}</Text>
                </View>
              </View>
            }
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
    color: Colors.medium,
  },
});

export default Basket;
