import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import back from '../icons/arrow-left.svg';
import logotext from'../images/ExamBuddy_logo_text.png';


const Back = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={()=>navigation.goBack()}>

      <Image source={back} style={styles.icon}/>
      </TouchableOpacity>
      <Image source={logotext} style={styles.logo} resizeMode='contain'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // backgroundColor: 'black',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10, // Add padding for icon alignment
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:10
  },
  icon:{
    width:30,
    height:30,
    marginLeft:-10
  },
  logo:{
    width:250,
    height:35,

    marginRight:50
  }
});

export default Back;
