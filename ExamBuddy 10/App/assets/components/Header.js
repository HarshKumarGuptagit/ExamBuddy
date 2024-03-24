import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import expicitColors from '../colors';

const Header = ({mainHeading,subHeading}) => {
  return (
    <View style={styles.headerbar}>
      <Text style={styles.headerChapterText}>{mainHeading}</Text>
      {(subHeading)&&<Text style={styles.headerExerciseText}>{subHeading}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  headerbar: {
    height: 60,
    backgroundColor: expicitColors.darkblue,
    alignItems: 'center',
    padding:5,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  headerChapterText: {
    color: expicitColors.white,
    fontSize: 20,
    fontWeight:'bold',
    paddingVertical:4
  },
  headerExerciseText: {
    color: expicitColors.white,
    fontSize: 16,
  },
});
export default Header;
