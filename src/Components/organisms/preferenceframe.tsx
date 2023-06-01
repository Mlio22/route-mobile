import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated, PanResponder, View, Text, Image } from "react-native";


export default function Framepreferensi() {
  
  const distancePan = useRef(new Animated.ValueXY()).current;
  const durationPan = useRef(new Animated.ValueXY()).current;
  const congestionPan = useRef(new Animated.ValueXY()).current;
  const conditionPan = useRef(new Animated.ValueXY()).current;
  const trafficPan = useRef(new Animated.ValueXY()).current;

  const panPositions = {
    distancePan: { x: 0, y: 0 },
    durationPan: { x: 0, y: 0 },
    congestionPan: { x: 0, y: 0 },
    conditionPan: { x: 0, y: 0 },
    trafficPan: { x: 0, y: 0 },
  };

  const panOrder = ['distance', 'duration', 'congestion', 'traffic'];

  function slideAndCheckPans(movedPanIndex: number, deltaY: number) {
    
  }

  const panResponder1 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      Animated.event([
        null,
        {
          dy: distancePan.y,
        },
      ])(e, gestureState);

      console.log(distancePan);
    },
    onPanResponderRelease: (evt, gestureState) => {
      // const threshold2 = 85;
      // const threshold3 = 175;
      // const threshold4 = 260;
      // const threshold5 = 350;
      // let fixedY = 0;
      
      // // untuk durationPan
      // if (gestureState.dy > threshold2) {
      //   fixedY = threshold2;
        
      //   // Cek jika distancePan bertemu dengan durationPan
      //   if (panPositions.durationPan.y - threshold2 <= panPositions.distancePan.y) {
      //     Animated.spring(durationPan, { toValue: { x: 0, y: panPositions.durationPan.y - threshold2 }, useNativeDriver: true }).start();
      //   }
      //   // Tambahkan kode untuk perpindahan view di sini
      // }
      
      // // untuk congestionPan
      // if (gestureState.dy > threshold3) {
      //   fixedY = threshold3;
        
      //   // Cek jika distancePan bertemu dengan congestionPan
      //   if (panPositions.congestionPan.y - threshold3 <= panPositions.distancePan.y) {
      //     Animated.spring(congestionPan, { toValue: { x: 0, y: panPositions.congestionPan.y - threshold3 }, useNativeDriver: true }).start();
      //   }
      //   // Tambahkan kode untuk perpindahan view di sini
      // }

      // // untuk conditionPan
      // if (gestureState.dy > threshold4) {
      //   fixedY = threshold4;
        
      //   // Cek jika distancePan bertemu dengan conditionPan
      //   if (panPositions.conditionPan.y - threshold4 <= panPositions.distancePan.y) {
      //     Animated.spring(conditionPan, { toValue: { x: 0, y: panPositions.conditionPan.y - threshold4 }, useNativeDriver: true }).start();
      //   }
      //   // Tambahkan kode untuk perpindahan view di sini
      // }

      // // untuk trafficPan
      // if (gestureState.dy > threshold5) {
      //   fixedY = threshold5;
        
      //   // jika komponen bertemu dengan yang diatas atau dibawah maka yang dibawah atau yang diatas akan bergerak

      //   // Cek jika distancePan bertemu dengan trafficPan
      //   if (panPositions.trafficPan.y - threshold5 <= panPositions.distancePan.y) {
      //     Animated.spring(trafficPan, { toValue: { x: 0, y: panPositions.trafficPan.y - threshold5 }, useNativeDriver: true }).start();
      //   }
      //   // Tambahkan kode untuk perpindahan view di sini
      // }
      
      // Animated.spring(distancePan, { toValue: { x: 0, y: fixedY }, useNativeDriver: true }).start();

      distancePan.extractOffset();
    },
  });

  const panResponder2 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dy: durationPan.y,
      },
    ]),
    onPanResponderRelease: (evt, gestureState) => {

      panPositions.durationPan.y = gestureState.moveY;

      const threshold1 = 90;
      const threshold3 = 90;
      const threshold4 = 175;
      const threshold5 = 260;
      let fixedY = 0;

      // untuk distancePan(masih susah)
      if (gestureState.dy > threshold1) {
        fixedY = threshold1;
        // Tambahkan kode untuk perpindahan view di sini

        Animated.spring(distancePan, { toValue: { x: 0, y: 85 }, useNativeDriver: true }).start();
      }

      // untuk congestionPan
      if (gestureState.dy > threshold3) {
        fixedY = threshold3;
        
        // Cek jika distancePan bertemu dengan congestionPan
        if (panPositions.congestionPan.y - threshold3 <= panPositions.distancePan.y) {
          Animated.spring(congestionPan, { toValue: { x: 0, y: panPositions.congestionPan.y - threshold3 }, useNativeDriver: true }).start();
        }
        // Tambahkan kode untuk perpindahan view di sini
      }

      // untuk conditionPan
      if (gestureState.dy > threshold4) {
        fixedY = threshold4;
        
        // Cek jika distancePan bertemu dengan conditionPan
        if (panPositions.conditionPan.y - threshold4 <= panPositions.distancePan.y) {
          Animated.spring(conditionPan, { toValue: { x: 0, y: panPositions.conditionPan.y - threshold4 }, useNativeDriver: true }).start();
        }
        // Tambahkan kode untuk perpindahan view di sini
      }

      // untuk trafficPan
      if (gestureState.dy > threshold5) {
        fixedY = threshold5;
        
        // jika komponen bertemu dengan yang diatas atau dibawah maka yang dibawah atau yang diatas akan bergerak

        // Cek jika distancePan bertemu dengan trafficPan
        if (panPositions.trafficPan.y - threshold5 <= panPositions.distancePan.y) {
          Animated.spring(trafficPan, { toValue: { x: 0, y: panPositions.trafficPan.y - threshold5 }, useNativeDriver: true }).start();
        }
        // Tambahkan kode untuk perpindahan view di sini
      }

      Animated.spring(durationPan, { toValue: { x: 0, y: fixedY }, useNativeDriver: true }).start();
    },
  });

  const panResponder3 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dy: congestionPan.y,
      },
    ]),
    onPanResponderRelease: (evt, gestureState) => {

      panPositions.congestionPan.y = gestureState.moveY;

      const threshold1 = 175;
      const threshold2 = 90;
      const threshold4 = 90;
      const threshold5 = 175;
      let fixedY = 0;

      if (gestureState.dy > threshold1) {
        fixedY = threshold1;
        // Tambahkan kode untuk perpindahan view di sini
      }

      // untuk conditionPan
      if (gestureState.dy > threshold4) {
        fixedY = threshold4;
        
        // Cek jika distancePan bertemu dengan conditionPan
        if (panPositions.conditionPan.y - threshold4 <= panPositions.distancePan.y) {
          Animated.spring(conditionPan, { toValue: { x: 0, y: panPositions.conditionPan.y - threshold4 }, useNativeDriver: true }).start();
        }
        // Tambahkan kode untuk perpindahan view di sini
      }

      // untuk trafficPan
      if (gestureState.dy > threshold5) {
        fixedY = threshold5;
        
        // jika komponen bertemu dengan yang diatas atau dibawah maka yang dibawah atau yang diatas akan bergerak

        // Cek jika distancePan bertemu dengan trafficPan
        if (panPositions.trafficPan.y - threshold5 <= panPositions.distancePan.y) {
          Animated.spring(trafficPan, { toValue: { x: 0, y: panPositions.trafficPan.y - threshold5 }, useNativeDriver: true }).start();
        }
        // Tambahkan kode untuk perpindahan view di sini
      }

      Animated.spring(congestionPan, { toValue: { x: 0, y: fixedY }, useNativeDriver: true }).start();
    },
  });

  const panResponder4 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dy: conditionPan.y,
      },
    ]),
    onPanResponderRelease: (evt, gestureState) => {

      panPositions.conditionPan.y = gestureState.moveY;

      const threshold1 = 260;
      const threshold2 = 175;
      const threshold3 = 90;
      const threshold5 = 90;
      let fixedY = 0;

      if (gestureState.dy > threshold1) {
        fixedY = threshold1;
        // Tambahkan kode untuk perpindahan view di sini
      }

      Animated.spring(conditionPan, { toValue: { x: 0, y: fixedY }, useNativeDriver: true }).start();
    },
  });

  const panResponder5 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dy: trafficPan.y,
      },
    ]),
    onPanResponderRelease: (evt, gestureState) => {

      panPositions.trafficPan.y = gestureState.moveY;
  
      const threshold = 150;
      let fixedY = 0;

      if (gestureState.dy > threshold) {
        fixedY = threshold;
        // Tambahkan kode untuk perpindahan view di sini
      }

      Animated.spring(trafficPan, { toValue: { x: 0, y: fixedY }, useNativeDriver: true }).start();
    },
  });
  


  return (
    <View style={styles.Framepreferensi}>

      <Animated.View style={[styles.Framedc, { transform: distancePan.getTranslateTransform() }]} {...panResponder1.panHandlers}>
        <View style={styles.Framedcc}>
          <Text style={styles.Distances}>Distances</Text>
          <Image
            style={styles.Logodc}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/wmcpl2jxuv8-414%3A384?alt=media&token=a8f1eab8-14ef-46a8-931e-6be279f9d642",
            }}
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.Framest, { transform: durationPan.getTranslateTransform() }]} {...panResponder2.panHandlers}>
        <View style={styles.Framestc}>
          <Text style={styles.ShortestTime}>Shortest Time</Text>
          <Image
            style={styles.Logost}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/wmcpl2jxuv8-414%3A388?alt=media&token=feb8377c-658c-44ab-89fd-1d8a2d838fed",
            }}
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.Framecl, { transform: congestionPan.getTranslateTransform() }]} {...panResponder3.panHandlers}>
        <View style={styles.Frameclc}>
          <Text style={styles.CongestionLevel}>Congestion Level</Text>
          <Image
            style={styles.Logocl}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/wmcpl2jxuv8-414%3A392?alt=media&token=e1b8a1ad-f71b-4763-9f2c-e54f20f3fb6a",
            }}
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.Framerc, { transform: conditionPan.getTranslateTransform() }]} {...panResponder4.panHandlers}>
        <View style={styles.Framercc}>
          <Text style={styles.RoadConditions}>Road Conditions</Text>
          <Image
            style={styles.Logorc}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/wmcpl2jxuv8-414%3A414?alt=media&token=daa1a7ce-48e2-4b56-b118-ba196529965d",
            }}
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.Frametl, { transform: trafficPan.getTranslateTransform() }]} {...panResponder5.panHandlers}>
        <View style={styles.Frametlc}>
          <Text style={styles.TrafficLights}>Traffic Lights</Text>
          <Image
            style={styles.Logotl}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/wmcpl2jxuv8-414%3A418?alt=media&token=163f37c8-ee59-4394-8277-4903974213a4",
            }}
          />
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  Framepreferensi: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "baseline",
    // backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
  Framedc: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "10%",
    marginRight: 40,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "rgba(241,241,241,0.8)",
    // marginLeft:10,
  },
  Framedcc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  Distances: {
    marginRight: 10,
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  },
  Logodc: {
    width: 26.95,
    height: 23.99,
  },
  Framest: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "10%",
    marginRight: 40,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "rgba(241,241,241,0.8)",
  },
  Framestc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  ShortestTime: {
    marginRight: 10,
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  },
  Logost: {
    width: 30,
    height: "100%",
  },
  Framecl: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "10%",
    marginRight: 40,
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "rgba(241,241,241,0.8)",
  },
  Frameclc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  CongestionLevel: {
    marginRight: 10,
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  },
  Logocl: {
    width: 30,
    height: "100%",
  },
  Framerc: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "10%",
    marginRight: 40,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "rgba(241,241,241,0.8)",
  },
  Framercc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  RoadConditions: {
    marginRight: 10,
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  },
  Logorc: {
    width: 30,
    height: "100%",
  },
  Frametl: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "10%",
    paddingLeft: 67,
    paddingRight: 67,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "rgba(241,241,241,0.8)",
  },
  Frametlc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  TrafficLights: {
    marginRight: 10,
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  },
  Logotl: {
    width: 30,
    height: "100%",
  },
})
