import React from 'react';
import {StyleSheet, ScrollView, View, Text, Pressable} from 'react-native';

import ActionSheet, {
  ActionSheetRef,
  ActionSheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';

import {RouteDirectionIcon} from './RouteDirectionIcon';
import {parse} from 'node-html-parser';
import {PlaceRouteContext} from '../../context/locationDetails/PlaceRouteContext';

const styles = StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: '#FFFFFFEB',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  routeDetailsContainer: {
    height: '80%',
    color: 'black',
  },
  routeDetailsHeader: {},
  routeDetailsHeaderText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },

  routeStepsContainer: {
    backgroundColor: '#F1F1F1',
    marginTop: 30,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    maxWidth: '100%',
    borderRadius: 20,
  },
  routeStepTitle: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  ScrollViewContainer: {
    paddingBottom: 20,
  },
  stepsItemContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maneuverContainer: {
    marginRight: 15,
    flex: 1,
    height: 30,
    width: 30,
  },
  instructionContainer: {
    position: 'relative',
    width: '85%',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    borderBottomColor: 'black',
    color: 'black',
    paddingBottom: 10,
    borderBottomWidth: 2,
    width: '100%',
  },
  distanceText: {
    fontSize: 15,
    top: -10,
    color: 'black',
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 10,
  },
  previewStepButtonContainer: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const actionSheetProps: ActionSheetProps = {
  animated: true,
  closeOnPressBack: false,
  closeOnTouchBackdrop: false,
  snapPoints: [20, 50],
  initialSnapIndex: 0,
  headerAlwaysVisible: true,
  backgroundInteractionEnabled: true,
  gestureEnabled: true,
  overdrawEnabled: false,
  overlayColor: 'transparent',
  containerStyle: styles.actionSheetContainer,
  closable: false,
  drawUnderStatusBar: false,
};

export const RouteSteps = () => {
  const actionSheetRef = React.useRef<ActionSheetRef>(null);
  const scrollhandlers = useScrollHandlers<ScrollView>('sv-1', actionSheetRef);

  const {isDataReady, routeStepsRef} = React.useContext(PlaceRouteContext);

  if (!isDataReady) {
    return <></>;
  }

  setTimeout(() => {
    actionSheetRef.current?.show();
  }, 100);

  const steps = routeStepsRef?.current!;

  return (
    <ActionSheet {...actionSheetProps} ref={actionSheetRef}>
      <View style={styles.routeDetailsContainer}>
        <View style={styles.routeDetailsHeader}>
          <Text style={styles.routeDetailsHeaderText}>Route Details</Text>
        </View>

        <View style={styles.routeStepsContainer}>
          <Text style={styles.routeStepTitle}>Steps</Text>
          <ScrollView
            {...scrollhandlers}
            contentContainerStyle={styles.ScrollViewContainer}>
            <Pressable>
              {steps.map((step, idx) => (
                <RouteStepsItem key={`routeStep${idx}`} {...step} />
              ))}
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </ActionSheet>
  );
};

const RouteStepsItem = (props: any) => {
  let {code, distance, duration, text} = props;

  let distanceUnit = 'Meters';
  if (distance > 1000) {
    distance = parseFloat((distance / 1000).toFixed(2));
    distanceUnit = 'Kilometers';
  } else {
    distance = parseFloat(distance.toFixed(0));
  }

  let durationUnit = 'seconds';
  if (duration > 60) {
    duration = Math.trunc(duration / 60);
    durationUnit = 'minutes';

    if (duration > 60) {
      duration = Math.trunc(duration / 60);
      durationUnit = 'hour';
    }
  } else {
    duration = Math.trunc(duration);
  }

  return (
    <View style={styles.stepsItemContainer}>
      <View style={styles.maneuverContainer}>
        <RouteDirectionIcon maneuver={code} />
      </View>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>{text}</Text>
        <Text style={styles.distanceText}>
          {distance} {distanceUnit} | {duration} {durationUnit}
        </Text>
      </View>
    </View>
  );
};
