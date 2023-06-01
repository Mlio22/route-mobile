import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

import ToggleSwitch from './Mapsettingsinside/Toggleswitch';

export default function OverlayResolusiPeta() {
  return (
    <View style={styles.OverlayResolusiPeta}>
      <View style={styles.FrameToggle}>
        <Text style={styles.TrafficDisplay}>Traffic Display</Text>
        <Image
          style={styles.Slider}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/j8bpb6f95mo-292%3A361?alt=media&token=17e1667d-f070-4408-af5f-7e9502facb78",
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  OverlayResolusiPeta: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "50%",
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 29,
    paddingBottom: 29,
    borderWidth: 3,
    borderColor: "rgba(0,0,0,1)",
    backgroundColor: "red"
    //   " linear-gradient(109.61000000000001deg, rgba(27,146,14,1) 16%, rgba(83,222,217,0.72) 88%) ",
  },
  FrameToggle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-end',
    width: "100%",
    height: "100%",
  },
  TrafficDisplay: {
    color: "rgba(255,255,255,1)",
    fontSize: 15,
    lineHeight: 15,
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  },
  Slider: {
    width: "45%",
    height: "120%",
  },
})
