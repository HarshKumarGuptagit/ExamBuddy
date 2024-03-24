import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import background_start from '../assets/images/background_start.png';
import logo from '../assets/images/ExamBuddy_logo.png';
import expicitColors from '../assets/colors.js';

const StartPage = ({navigation}) => {
const btnPress=()=>{
    navigation.navigate("Home");
}

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgimage}
        source={background_start}
        resizeMode="cover"
      />
      <View style={styles.bgimage.containerContents}>
        <View style={styles.box}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.classText}>CLASS 10</Text>
          <Text style={styles.tagLine}>Get  Everythng you need</Text>
          <TouchableOpacity style={styles.btn} onPress={btnPress}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
              Let's Learn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  bgimage: {
    width: '100%',
    top:-2,
  },
  box: {
    position: 'relative',
    height: '100%',
    backgroundColor: expicitColors.white,
    marginTop: -50,
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  logo: {
    width: 295,
    height: 209,
  },
  classText: {
    fontSize: 67,
    fontWeight: 'bold',
    color: expicitColors.black,
    paddingVertical: 10,
    fontFamily:'Patua One',
  },
  tagLine: {
    paddingTop: 90,
    fontSize:20,
    paddingVertical:20,
    fontFamily:'Patrick Hand SC',
    fontStyle:'italic',
  },
  btn: {
    width: 300,
    height: 50,
    backgroundColor: expicitColors.darkblue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },
});

export default StartPage;
