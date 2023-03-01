import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {DirectionIconProps} from '../../../types/components/atoms/RouteUI/RouteDirectionIcon';
import {TrafficColor} from '../../data/constants';

const StraightIcon = (props: DirectionIconProps) => {
  const {color} = props;
  return (
    <Svg viewBox="0 0 20 20">
      <Path
        d="M10 2v16m0-16L6.5 5.5M10 2l3.5 3.5M10 18l3.5-3M10 18l-3.5-3M2 10h16M2 10l3.5 3.5M2 10l3.5-3.5M18 10l-3-3.5m3 3.5-3 3.5"
        stroke="#C4C4C4"
        strokeWidth={1.8}
      />
      <Path
        d="M10 16V2m0 0L6.5 5.5M10 2l3.5 3.5"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
};

const TurnRightIcon = (props: DirectionIconProps) => {
  const {color} = props;
  return (
    <Svg viewBox="0 0 20 20">
      <Path
        d="M2 10h16M2 10l3.5 3.5M2 10l3.5-3.5M18 10l-3-3.5m3 3.5-3 3.5M10 18V2m0 16 3.5-3.5M10 18l-3.5-3.5M10 2 6.5 5M10 2l3.5 3"
        stroke="#C4C4C4"
        strokeWidth={1.8}
      />
      <Path
        d="M10 16v-6h8m0 0-3 3.5m3-3.5-3-3.5"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
};

const TurnLeftIcon = (props: DirectionIconProps) => {
  const {color} = props;
  return (
    <Svg viewBox="0 0 20 20">
      <Path
        d="M2 10h16M2 10l3.5 3.5M2 10l3.5-3.5M18 10l-3-3.5m3 3.5-3 3.5M10 18V2m0 16 3.5-3.5M10 18l-3.5-3.5M10 2 6.5 5M10 2l3.5 3"
        stroke="#C4C4C4"
        strokeWidth={1.8}
      />
      <Path
        d="M10 15.5V10H2m0 0 3.5-3.5M2 10l3.5 3.5"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
};

const SlideLeftIcon = (props: DirectionIconProps) => {
  const {color} = props;
  return (
    <Svg viewBox="0 0 20 20">
      <Path
        d="M9.5 21V9.5m0 0L18 1M9.5 9.5 1 1"
        stroke="#C2C2C2"
        strokeWidth={1.8}
      />
      <Path d="M9.5 21V9.5L1 1m0 0h5M1 1v5" stroke={color} strokeWidth={1.8} />
    </Svg>
  );
};

const SlideRightIcon = (props: DirectionIconProps) => {
  const {color} = props;
  return (
    <Svg viewBox="0 0 20 20">
      <Path
        d="M9.5 21V9.5m0 0L18 1M9.5 9.5 1 1"
        stroke="#C2C2C2"
        strokeWidth={1.8}
      />
      <Path
        d="M9.5 21V9.5L18 1m0 0h-5m5 0v5"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
};

const UTurnRightIcon = (props: DirectionIconProps) => {
  const {color} = props;
  return (
    <Svg {...props} viewBox="0 0 20 20">
      <Path
        d="M15 18v-6.77c0-12.307-13-12.307-13 0V18m13 0 3-3m-3 3-3-3"
        stroke="#C2C2C2"
        strokeWidth={1.8}
      />
      <Path
        d="M15 18v-6.77c0-12.307-13-12.307-13 0v.27M15 18l3-3m-3 3-3-3"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
};

const UTurnLeftIcon = (props: DirectionIconProps) => {
  const {color} = props;
  return (
    <Svg viewBox="0 0 20 20">
      <Path
        d="M15 18v-6.77c0-12.307-13-12.307-13 0V18m13 0 3-3m-3 3-3-3"
        stroke="#C2C2C2"
        strokeWidth={1.8}
      />
      <Path
        d="M4 18v-6.77c0-12.307 13-12.307 13 0v.27M4 18l-3-3m3 3 3-3"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
};

type RouteDirectionIconProps = {
  maneuver: string;
  congestionIndex: number;
};

const straightDirections = ['straight', 'keep-right', 'keep-left'],
  turnRightDirections = ['turn-sharp-right', 'turn-right'],
  turnLeftDirections = ['turn-sharp-left', 'turn-left'],
  slideRightDirections = ['turn-slight-right', 'ramp-right', 'fork-right'],
  slideLeftDirections = ['turn-slight-left', 'ramp-left', 'fork-left'],
  uturnRightDirection = ['uturn-right'],
  uturnLeftDirection = ['uturn-left'],
  roundRightDirection = ['roundabout-right'],
  roundLeftDirection = ['roundabout-left'];

export const RouteDirectionIcon = (
  props: RouteDirectionIconProps,
): JSX.Element => {
  const {maneuver, congestionIndex} = props;

  const color = TrafficColor[congestionIndex];

  if (straightDirections.includes(maneuver)) {
    return <StraightIcon color={color} />;
  }
  if (turnRightDirections.includes(maneuver)) {
    return <TurnRightIcon color={color} />;
  }
  if (turnLeftDirections.includes(maneuver)) {
    return <TurnLeftIcon color={color} />;
  }
  if (slideRightDirections.includes(maneuver)) {
    return <SlideRightIcon color={color} />;
  }
  if (slideLeftDirections.includes(maneuver)) {
    return <SlideLeftIcon color={color} />;
  }
  if (uturnRightDirection.includes(maneuver)) {
    return <UTurnRightIcon color={color} />;
  }
  if (uturnLeftDirection.includes(maneuver)) {
    return <UTurnLeftIcon color={color} />;
  }
  if (roundRightDirection.includes(maneuver)) {
    return <TurnRightIcon color={color} />;
  }
  if (roundLeftDirection.includes(maneuver)) {
    return <TurnLeftIcon color={color} />;
  } else {
    return <></>;
  }
};
