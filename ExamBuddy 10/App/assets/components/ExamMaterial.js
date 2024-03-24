import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import expicitColors from '../colors';

const images = {
    Blueprint: require('../images/exam_material/blueprint.jpg'),
    Past: require('../images/exam_material/past.jpg'),
    Sample: require('../images/exam_material/sample.jpg')

  };

const ExamMaterials = ({navigation,title}) => {
const picloc=images[title.split(' ')[0]];

  return (
    <View style={styles.container}>
      <Image style={styles.subImage} source={picloc}  resizeMode='cover'/>
      <Text style={styles.subject_name}>{title}</Text>
    </View>

  )
}
const styles=StyleSheet.create({
container:{
    width:90,
    height:150,
    padding:5,
    backgroundColor:'white',
    borderRadius:10,
    shadowColor:'black',
    // elevation:5,
    margin:10,
    borderColor:'black',
    borderWidth:1,
},
subImage:{
    width:'100%',
    height:'65%',
    borderRadius:10,
},
subject_name:{
    textAlign:'center',
    color:expicitColors.darkblue,
    fontWeight:'bold',
    paddingVertical:5,
}
});

export default ExamMaterials;