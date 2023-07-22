import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {DirectionIconProps} from '../../../types/components/atoms/RouteUI/RouteDirectionIcon';

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

type RouteDirectionIconProps = {
  maneuver: string;
};

export const RouteDirectionIcon = (
  props: RouteDirectionIconProps,
): JSX.Element => {
  const {maneuver} = props;

  const color = '#000000';

  if (maneuver.includes('drive')) {
    return <StraightIcon color={color} />;
  } else if (maneuver.includes('turn:left')) {
    return <TurnLeftIcon color={color} />;
  } else if (maneuver.includes('turn:right')) {
    return <TurnRightIcon color={color} />;
  } else {
    return <></>;
  }
};
