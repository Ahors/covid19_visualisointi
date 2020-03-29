import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import LoadingImage from "./LoadingImage";
import { Bar } from "react-native-pathjs-charts";

export default function KoronaData() {
  const [isGathering, setGathering] = useState(true);
  const titleData = [
    { title: "Sairastuneet", status: "#fcba03", key: "1" },
    { title: "Parantuneet", status: "#00ff4c", key: "2" },
    { title: "Kuolleet", status: "#000", key: "3" },
    { title: "Kuolin%", status: "#000", key: "4" }
  ];
  const [data, setData] = useState([0, 0, 0, 0]);
  const [pvm, setPVM] = useState([]);
  const apiUrl =
    "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData";
  //Format the data to fit the bar chart
  const chartData = () => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push([{ v: data[i], name: titleData[i].title }]);
    }
    return arr;
  };

  function sortDates(d) {
    let todaysTime = new Date().setHours(0, 0, 0, 0);
    const oneDay = 86400000;
    let casesPerDay = [0, 0];
    //Reverse loop because we don't need the items from the beginning
    for (let item = d.confirmed.length - 1; item >= 0; item--) {
      let dataTime = new Date(d.confirmed[item].date).getTime();
      //Compare times so we know if the case was today, yesterday or before that
      //Breaking the loop saves a lot of time since we won't go through cases
      //that happened the day before yesterday
      if (todaysTime <= dataTime) {
        casesPerDay[0]++;
      } else if (todaysTime - dataTime <= oneDay) {
        casesPerDay[1]++;
      } else {
        break;
      }
    }
    return casesPerDay;
  }
  function sortData(d) {
    //Spaghetti code to gather confirmed, recovered and death amounts
    setData([
      d.confirmed[d.confirmed.length - 1].id,
      d.recovered[d.recovered.length - 1].id,
      d.deaths[d.deaths.length - 1].id,
      `${(
        (d.deaths[d.deaths.length - 1].id /
          d.confirmed[d.confirmed.length - 1].id) *
        100
      ).toFixed(2)}%`
    ]);
    setPVM(sortDates(d));
  }
  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => sortData(data))
      .catch(error => console.error(error))
      .finally(() => setGathering(false));
  });
  return isGathering ? (
    <LoadingImage></LoadingImage>
  ) : (
    <View style={styles.viewStyle}>
      <FlatList
        data={titleData}
        style={styles.list}
        renderItem={({ item }) => (
          <Text style={[{ color: item.status }, styles.title]}>
            {item.title}: {data[item.key - 1]}
          </Text>
        )}
      />
      <Text style={styles.smallTitle}>Tänään sairastunut: {pvm[0]}. </Text>
      {pvm[0] - pvm[1] > 0 ? (
        <Text style={styles.smallTitle}>
          {pvm[0] - pvm[1]} enemmän kuin eilen.
        </Text>
      ) : pvm[0] - pvm[1] < 0 ? (
        <Text style={styles.smallTitle}>
          {pvm[1] - pvm[0]} vähemmän kuin eilen
        </Text>
      ) : (
        <Text style={styles.smallTitle}>Saman verran kuin eilen.</Text>
      )}
      <Bar data={chartData()} options={chartStyles} accessorKey="v" />
      <Text style={styles.graphText}>Maailman hyödyllisin graafi.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  viewStyle: {
    alignItems: "center",
    marginTop: 20,
    height: "70%"
  },
  loadingIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 50
  },
  title: {
    fontSize: 25,
    textAlign: "left",
    marginTop: 10
  },
  smallTitle: {
    top: 0,
    fontSize: 18
  },
  graphText: {
    top: 15,
    fontSize: 15
  }
});

const chartStyles = {
  width: 300,
  height: 150,
  margin: {
    top: 25,
    left: 30,
    bottom: 25,
    right: 20
  },
  color: "#2980B9",
  gutter: 20,
  animate: {
    type: "oneByOne",
    duration: 200,
    fillTransition: 3
  },
  axisX: {
    showAxis: true,
    showLines: true,
    showLabels: true,
    showTicks: true,
    zeroAxis: false,
    orient: "bottom",
    label: {
      fontFamily: "Arial",
      fontSize: 12,
      fontWeight: true,
      fill: "#34495E"
    }
  },
  axisY: {
    showAxis: true,
    showLines: true,
    showLabels: true,
    showTicks: true,
    zeroAxis: false,
    orient: "left",
    label: {
      fontFamily: "Arial",
      fontSize: 10,
      fontWeight: true,
      fill: "#34495E"
    }
  }
};
