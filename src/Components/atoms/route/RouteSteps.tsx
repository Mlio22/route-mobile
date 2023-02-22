import React from 'react';
import {StyleSheet, ScrollView, View, Text, Pressable} from 'react-native';

import ActionSheet, {
  ActionSheetRef,
  ActionSheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';

import {RawStepsType} from '../../organisms/RouteUI';
import {RouteMap} from '../../organisms/RouteMap';
import {RouteDirectionIcon} from '../RouteDirectionIcon';
import {parse} from 'node-html-parser';

type RouteStepsProps = {
  stepsRaw: RawStepsType;
  mapRef: React.RefObject<RouteMap>;
};

type ProcessedStepType = {
  distance: any;
  duration: any;
  maneuver: string;
  congestionIndex: number;
  html_instructions: string;
};

export type polylineData = {
  polylineString: string;
  congestionIndex: number;
};

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

const processRouteSteps = (stepsRawData: RawStepsType) => {
  let stepsList: ProcessedStepType[] = [],
    polylineList: polylineData[] = [];

  stepsRawData.forEach(step => {
    const {
      distance,
      duration,
      polyline: {points: polylineString},
      maneuver,
      html_instructions,
    } = step;

    const congestionIndex = Math.floor(Math.random() * 3);

    stepsList.push({
      distance,
      duration,
      maneuver,
      congestionIndex,
      html_instructions,
    });

    polylineList.push({
      polylineString,
      congestionIndex,
    });
  });

  return {stepsList, polylineList};
};

export const RouteSteps = (props: RouteStepsProps) => {
  const actionSheetRef = React.useRef<ActionSheetRef>(null);
  const [steps, setSteps] = React.useState<ProcessedStepType[]>();
  const scrollhandlers = useScrollHandlers<ScrollView>('sv-1', actionSheetRef);

  React.useEffect(() => {
    const {stepsRaw, mapRef} = props;

    const {stepsList, polylineList} = processRouteSteps(stepsRaw);

    setSteps(stepsList);

    mapRef.current?.appendPolylines(polylineList);
  }, [props]);

  if (!steps) {
    return <></>;
  }

  setTimeout(() => {
    actionSheetRef.current?.show();
  }, 100);

  return (
    // @ts-ignore
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
              {steps.map(step => (
                <RouteStepsItem {...step} />
              ))}
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </ActionSheet>
  );
};

const RouteStepsItem = (props: ProcessedStepType) => {
  const {maneuver, congestionIndex, html_instructions, distance} = props;
  const instructions = parse(html_instructions).text;

  return (
    <View style={styles.stepsItemContainer}>
      <View style={styles.maneuverContainer}>
        <RouteDirectionIcon
          maneuver={maneuver}
          congestionIndex={congestionIndex}
        />
      </View>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>{instructions}</Text>
        <Text style={styles.distanceText}>{distance.value} m</Text>
      </View>
    </View>
  );
};
