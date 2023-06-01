import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Draggable from 'react-native-draggable';

const DragAndDropScreen = (props:any) => {
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);

  const onDragRelease = (index: number) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    newOrder.push(index);
    setOrder(newOrder);
  };

  return (
    <View style={styles.container}>
      {order.map((index) => (
        <Draggable key={index} x={0} y={0} onDragRelease={() => onDragRelease(index)}>
          <View style={styles.draggableContainer}>
            <Text style={styles.draggableText}>Draggable View {index}</Text>
          </View>
        </Draggable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draggableContainer: {
    backgroundColor: 'lightgray',
    padding: 20,
    marginBottom: 10,
  },
  draggableText: {
    fontSize: 16,
  },
});

export default DragAndDropScreen;
