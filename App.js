import React from "react";
import { StyleSheet, Text, View } from "react-native";
import KoronaData from "./components/KoronaData";
import Footer from "./components/Footer";

export default function App() {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.title}>COVID-19 Suomessa</Text>
      <KoronaData />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: "center",
    marginTop: 50,
    flex: 1
  },
  title: {
    fontSize: 30,
    color: "#000"
  }
});
