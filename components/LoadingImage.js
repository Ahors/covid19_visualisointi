import React from "react";
import { Image, StyleSheet } from "react-native";

export default function LoadingImage() {
  return (
    <Image
      source={require("../assets/corona_virus.gif")}
      style={styles.loadingIcon}
    />
  );
}
const styles = StyleSheet.create({
  loadingIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 50
  }
});
