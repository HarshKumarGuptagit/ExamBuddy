import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import expicitColors from '../colors';

const images = {
  Maths: require('../images/subject/Maths.jpg'),
  Science: require('../images/subject/Science.jpg'),
};

const NotesSubject = ({ subjectName }) => {
  const picloc = images[subjectName];



  return (
    <View style={styles.container}>
      <Image style={styles.subImage} source={picloc} />
      <Text style={styles.subject_name}>{subjectName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    // elevation: 5,
    margin: 10,
  },
  subImage: {
    width: 110,
    height: 125,
    borderRadius: 10,
  },
  subject_name: {
    fontSize: 16,
    textAlign: 'center',
    color: expicitColors.darkblue,
    paddingVertical: 5,
  },
});

export default NotesSubject;
