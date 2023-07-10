import React, {useRef} from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  View,
  Text,
  Image,
} from 'react-native';

export default function Framepreferensi2(props: any) {
  const distancePan = useRef(new Animated.ValueXY()).current;
  const durationPan = useRef(new Animated.ValueXY()).current;
  const congestionPan = useRef(new Animated.ValueXY()).current;
  const qualityPan = useRef(new Animated.ValueXY()).current;
  const trafficPan = useRef(new Animated.ValueXY()).current;

  let panList: any = {
    distance: distancePan,
    duration: durationPan,
    congestion: congestionPan,
    quality: qualityPan,
    traffic: trafficPan,
  };

  let intervalAdditional = 0;

  function setIntervalAdditional(height: number) {
    intervalAdditional = height / 5;
  }

  let oriOrder = ['distance', 'duration', 'congestion', 'quality', 'traffic'];
  let panOrder = ['distance', 'duration', 'congestion', 'quality', 'traffic'];

  // https://stackoverflow.com/a/6470794/12125511
  function slideArray(fromIndex: number, toIndex: number) {
    const panName = panOrder[fromIndex];

    panOrder.splice(fromIndex, 1);
    panOrder.splice(toIndex, 0, panName);
  }

  function slidePan(from_index: number, to_index: number) {
    // ex slidePan(1, 0)
    // 1. get panName
    // 2. get pan from name
    // 3. perform animated.spring

    const panName = panOrder[from_index];
    const pan = panList[panName];

    Animated.spring(pan, {
      toValue: {
        x: 0,
        y: (to_index - from_index) * intervalAdditional,
      },
      useNativeDriver: false,
    }).start(_ => {
      pan.extractOffset();
    });
  }

  function onRelease(panName: string) {
    // 1. get pan index
    const current_index = panOrder.indexOf(panName),
      current_pan = panList[panName],
      originalOrder = oriOrder.indexOf(panName);

    // 2. get pan height
    const {_offset, _value} = current_pan.y;

    const current_pan_height =
      _offset + _value + intervalAdditional * originalOrder;

    // 3. check if it is off limit
    let target_index = Math.round(current_pan_height / intervalAdditional);

    if (target_index > 4) target_index = 4;
    if (target_index < 0) target_index = 0;

    let slide_direction = 0;
    if (target_index > current_index) slide_direction = 1;
    if (target_index < current_index) slide_direction = -1;

    if (slide_direction !== 0) {
      // 4. slide
      if (slide_direction === 1) {
        for (let i = current_index + 1; i <= target_index; i++) {
          slidePan(i, i - 1);
        }
      }

      if (slide_direction === -1) {
        for (let i = current_index - 1; i >= target_index; i--) {
          slidePan(i, i + 1);
        }
      }

      slideArray(current_index, target_index);
      props.setOrder(panOrder);
    }

    // 5. spring current pan into nearest point
    current_pan.extractOffset();
    const offset = current_pan.y._offset + intervalAdditional * originalOrder;

    let differ;
    if (offset < target_index * intervalAdditional) {
      differ = target_index * intervalAdditional - offset;
    } else {
      differ = -(offset - target_index * intervalAdditional);
    }

    Animated.spring(current_pan, {
      toValue: {
        x: 0,
        y: differ,
      },
      useNativeDriver: false,
    }).start(_ => {
      current_pan.extractOffset();
    });
  }

  const panResponder1 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      distancePan.y.setValue(gestureState.dy);
    },
    onPanResponderRelease: () => {
      onRelease('distance');
    },
  });

  const panResponder2 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      durationPan.y.setValue(gestureState.dy);
    },
    onPanResponderRelease: () => {
      onRelease('duration');
    },
  });

  const panResponder3 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      congestionPan.y.setValue(gestureState.dy);
    },
    onPanResponderRelease: () => {
      onRelease('congestion');
    },
  });

  const panResponder4 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      qualityPan.y.setValue(gestureState.dy);
    },
    onPanResponderRelease: () => {
      onRelease('quality');
    },
  });

  const panResponder5 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      trafficPan.y.setValue(gestureState.dy);
    },
    onPanResponderRelease: () => {
      onRelease('traffic');
    },
  });

  return (
    <View
      style={styles.Framepreferensi}
      onLayout={e => {
        setIntervalAdditional(e.nativeEvent.layout.height);
      }}>
      <Animated.View
        style={[
          styles.Framedc,
          {transform: distancePan.getTranslateTransform()},
        ]}
        {...panResponder1.panHandlers}>
        <View style={styles.Framedcc}>
          <Text style={styles.Distances}>Distances</Text>
          <Image
            style={styles.Logodc}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/wmcpl2jxuv8-414%3A384?alt=media&token=a8f1eab8-14ef-46a8-931e-6be279f9d642',
            }}
          />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.Framest,
          {transform: durationPan.getTranslateTransform()},
        ]}
        {...panResponder2.panHandlers}>
        <View style={styles.Framestc}>
          <Text style={styles.ShortestTime}>Shortest Time</Text>
          <Image
            style={styles.Logost}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/wmcpl2jxuv8-414%3A388?alt=media&token=feb8377c-658c-44ab-89fd-1d8a2d838fed',
            }}
          />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.Framecl,
          {transform: congestionPan.getTranslateTransform()},
        ]}
        {...panResponder3.panHandlers}>
        <View style={styles.Frameclc}>
          <Text style={styles.CongestionLevel}>Congestion Level</Text>
          <Image
            style={styles.Logocl}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/wmcpl2jxuv8-414%3A392?alt=media&token=e1b8a1ad-f71b-4763-9f2c-e54f20f3fb6a',
            }}
          />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.Framerc,
          {transform: qualityPan.getTranslateTransform()},
        ]}
        {...panResponder4.panHandlers}>
        <View style={styles.Framercc}>
          <Text style={styles.RoadConditions}>Road Conditions</Text>
          <Image
            style={styles.Logorc}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/5t4peczrxmi-618%3A302?alt=media&token=682f5e77-c262-40b3-a568-fdcebd84519b',
            }}
          />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.Frametl,
          {transform: trafficPan.getTranslateTransform()},
        ]}
        {...panResponder5.panHandlers}>
        <View style={styles.Frametlc}>
          <Text style={styles.TrafficLights}>Continues Straight</Text>
          <Image
            style={styles.Logotl}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/wmcpl2jxuv8-414%3A414?alt=media&token=daa1a7ce-48e2-4b56-b118-ba196529965d',
            }}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  Framepreferensi: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    // backgroundColor: "red",
    width: '100%',
    height: '100%',
  },
  Framedc: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    marginRight: 40,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(241,241,241,0.8)',
    // marginLeft:10,
  },
  Framedcc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  Distances: {
    marginRight: 10,
    color: 'rgba(0,0,0,1)',
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '400',
  },
  Logodc: {
    width: 26.95,
    height: 23.99,
  },
  Framest: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    marginRight: 40,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(241,241,241,0.8)',
  },
  Framestc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  ShortestTime: {
    marginRight: 10,
    color: 'rgba(0,0,0,1)',
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '400',
  },
  Logost: {
    width: 30,
    height: '100%',
  },
  Framecl: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    marginRight: 40,
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(241,241,241,0.8)',
  },
  Frameclc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  CongestionLevel: {
    marginRight: 10,
    color: 'rgba(0,0,0,1)',
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '400',
  },
  Logocl: {
    width: 30,
    height: '100%',
  },
  Framerc: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    marginRight: 40,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(241,241,241,0.8)',
  },
  Framercc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  RoadConditions: {
    marginRight: 10,
    color: 'rgba(0,0,0,1)',
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '400',
  },
  Logorc: {
    width: 30,
    height: '100%',
  },
  Frametl: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    paddingLeft: 67,
    paddingRight: 67,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(241,241,241,0.8)',
  },
  Frametlc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  TrafficLights: {
    marginRight: 10,
    color: 'rgba(0,0,0,1)',
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Lato, sans-serif',
    fontWeight: '400',
  },
  Logotl: {
    width: 30,
    height: '100%',
  },
});
