import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import backgroundStart from '../assets/images/science_bg.jpg';
import expicitColors from '../assets/colors';
import Back from '../assets/components/Back';
import chapterArrow from '../assets/icons/chapter-arrow.png';

const Science = ({navigation}) => {


 const chapters=[
    "Chemical Reactions and Equations",
    "Acids Bases and Salts",
    "Metals and Non Metals",
    "Carbon and its Compounds",
    "Life Processes",
    "Control and Coordination",
    "How do Organisms Reproduce",
    "Heredity and Evolution",
    "Light Reflection and Refraction",
    "Human Eye and Colourful World",
    "Electricity",
    "Magnetic Effects of Electric Current",
    "Our Environment"
  ];

  const handleChapterPress = ch => {
    let formattedChapterName =
      ch.replace(/\s+/g, '_');
    navigation.navigate('PdfViewScreen', { path: `Science/${formattedChapterName}`,chapterName:ch,exerciseName:'CLASS 10'});
  };

  return (
    <View style={styles.container}>
     <Back navigation={navigation}/>


      <Text style={styles.hedingtext}>Science 10</Text>
      <Image
        style={styles.bgimage}
        source={backgroundStart}
        resizeMode="cover"
      />
      <Text style={styles.hedingtext}>Chapters</Text>
      <ScrollView style={styles.chapterContainer}>
        {chapters.map((chapter, index) => (
          <View key={index}>
            <TouchableOpacity
              style={[
                styles.chapterButton,
              ]}
              onPress={() => handleChapterPress(chapter)}>
              <Text style={styles.chapterNumber}>{index + 1}</Text>
              <Text style={styles.chapterText}>{chapter}</Text>
              <Image source={chapterArrow} style={styles.chapterArrowcss}/>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: expicitColors.fadeblueBG,
    paddingHorizontal:10
  },
  hedingtext:{
    fontSize: 25,
    fontWeight:'bold',
    marginVertical:10,
    color:expicitColors.darkblue,
    paddingLeft:20
  },
  chapterArrowcss:{
    width:25,
    height:25,
    position:'absolute',
    right:10
  },
  bgimage: {
    width: '100vw',
    height:150,
    borderRadius:20,
  },
  chapterContainer: {
    padding: 10,
  },
  chapterButton: {
    borderRadius: 10,
    backgroundColor: expicitColors.white,
    marginVertical: 5,
    padding: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height:60,
    width:'100%',
    borderColor:expicitColors.black,
    borderWidth:1,

  },
  selectedChapter: {
    backgroundColor: expicitColors.lightgrey, // Change the color as needed
  },
  chapterNumber: {
    width: 50,
    textAlign:'center',
    fontSize:25,
    fontWeight:'700',
    paddingRight:10
  },
  chapterText: {
    fontSize: 18,
    color: expicitColors.black,
    fontWeight:'500',
  },
});

export default Science;
