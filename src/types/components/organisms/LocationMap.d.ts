export type centerTargetProps = {
  coordinates: number[];
  bounds?: {
    ne: number[];
    sw: number[];
  };
  addPadding?: boolean;
};
