import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Categories from "../Components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Restaraunts from "../Components/Restaurants";

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Categories />
        <Text style={styles.header}>Top picks in your neighbourhood</Text>
        <Restaraunts />
        <Text style={styles.header}>Top picks in your neighbourhood</Text>
        <Restaraunts />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 30,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default Page;
