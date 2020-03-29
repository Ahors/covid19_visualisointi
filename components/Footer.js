import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Modal
} from "react-native";

export default function Footer() {
  const [modalStatus, setModalStatus] = useState(false);
  return (
    <View style={styles.viewStyle}>
      <Modal visible={modalStatus} animationType="fades" transparent={true}>
        <View style={styles.outerModal}>
          <View style={styles.innerModal}>
            <Text style={styles.modalText}>
              Sovellus käyttää Helsingin Sanomien avointa dataa. Parantuneiden
              määrä ei vastaa todellisia määriä, sillä tämän tiedon saaminen on
              vaikeaa, eikä sitä siksi päivitetä rajapintaan.
            </Text>
            <TouchableOpacity onPress={() => setModalStatus(false)}>
              <Image
                source={require("../assets/x_icon.png")}
                style={styles.modalIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => Linking.openURL("http://google.com")}>
        <Image
          source={require("../assets/github_icon.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://github.com/HS-Datadesk/koronavirus-avoindata"
          )
        }
      >
        <Image source={require("../assets/hs_logo.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalStatus(true)}>
        <Image
          source={require("../assets/info_logo.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopColor: "#000",
    borderTopWidth: 1
  },
  title: {
    fontSize: 30,
    color: "#000"
  },
  icon: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    margin: 15
  },
  outerModal: {
    backgroundColor: "#00000080",
    height: "100%"
  },
  innerModal: {
    top: "40%",
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2980B9",
    borderRadius: 10
  },
  modalText: {
    fontSize: 20
  },
  modalIcon: {
    width: 50,
    height: 50,
    bottom: 0,
    left: 0,
    right: 0
  }
});
