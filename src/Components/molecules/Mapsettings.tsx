import React from "react"
import { 
  StyleSheet, 
  Text, 
  View,
} from "react-native"

import ToggleSwitch from './Mapsettingsinside/Toggleswitch';

export default function OverlayResolusiPeta() {
  return (
    <View style={styles.OverlayResolusiPeta}>
      <View style={styles.FrameToggle}>
        <Text style={styles.TrafficDisplay}>Traffic Display</Text>
        <ToggleSwitch />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  OverlayResolusiPeta: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "70%",
    borderColor: "rgba(0,0,0,1)",
    // backgroundColor: "red"
    //   " linear-gradient(109.61000000000001deg, rgba(27,146,14,1) 16%, rgba(83,222,217,0.72) 88%) ",
  },
  FrameToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginLeft: 25,
  },
  TrafficDisplay: {
    color: "black",
    fontSize: 15,
    lineHeight: 15,
    fontFamily: "Lato, sans-serif",
    fontWeight: "700",

  },

})
