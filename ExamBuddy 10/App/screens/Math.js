import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import backgroundStart from '../assets/images/maths_bg.jpg';
import expicitColors from '../assets/colors';
import Back from '../assets/components/Back';
import exerciseArrow from '../assets/icons/exercise-arrow.png';
import chapterArrow from '../assets/icons/chapter-arrow.png';

const Maths = ({navigation}) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  
  const chapters = [
    {
      chapterName: 'Real Numbers',
      exercises: ['Exercise 1.1', 'Exercise 1.2'],
    },
    {
      chapterName: 'Polynomials',
      exercises: ['Exercise 2.1', 'Exercise 2.2'],
    },
    {
      chapterName: 'Linear Equations in Two Variables',
      exercises: ['Exercise 3.1', 'Exercise 3.2', 'Exercise 3.3'],
    },
    {
      chapterName: 'Quadratic Equations',
      exercises: ['Exercise 4.1', 'Exercise 4.2', 'Exercise 4.3'],
    },
    {
      chapterName: 'Arithmetic Progressions',
      exercises: ['Exercise 5.1', 'Exercise 5.2', 'Exercise 5.3'],
    },
    {
      chapterName: 'Triangles',
      exercises: ['Exercise 6.1', 'Exercise 6.2', 'Exercise 6.3'],
    },
    {
      chapterName: 'Coordinate Geometry',
      exercises: ['Exercise 7.1', 'Exercise 7.2'],
    },
    {
      chapterName: 'Introduction to Trigonometry',
      exercises: ['Exercise 8.1', 'Exercise 8.2', 'Exercise 8.3'],
    },
    {
      chapterName: 'Application of Trigonometry',
      exercises: ['Exercise 9.1'],
    },
    {
      chapterName: 'Circles',
      exercises: ['Exercise 10.1', 'Exercise 10.2'],
    },
    {
      chapterName: 'Areas Related to Circles',
      exercises: ['Exercise 11.1'],
    },
    {
      chapterName: 'Surface Areas and Volumes',
      exercises: ['Exercise 12.1', 'Exercise 12.2'],
    },
    {
      chapterName: 'Statistics',
      exercises: ['Exercise 13.1', 'Exercise 13.2', 'Exercise 13.3'],
    },
    {
      chapterName: 'Probability',
      exercises: ['Exercise 14.1'],
    },
  ];
  
  const setfilePath = (ch,ex) => {
    let formattedChapterName =
      ch.replace(/\s+/g, '_') + '_' + ex.replace(/\s+/g, '_');
    console.log(formattedChapterName);
    navigation.navigate('PdfViewScreen', { path: `Maths/${formattedChapterName}`,chapterName:ch,exerciseName:ex });
  };

  const handleChapterPress = chapter => {
    if (selectedChapter === chapter.chapterName) {
      setSelectedChapter(null);

    } else {
      setSelectedChapter(chapter.chapterName);

    }
  };

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>

    <Text style={styles.hedingtext}>Maths 10</Text>
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
              selectedChapter === chapter.chapterName &&
                styles.selectedChapter,
            ]}
            onPress={() => handleChapterPress(chapter)}>
            <Text style={styles.chapterNumber}>{index + 1}</Text>
            <Text style={styles.chapterText}>{chapter.chapterName}</Text>
            <Image source={chapterArrow} style={[styles.chapterArrowcss,selectedChapter===chapter.chapterName&& {display:'none'}]}/>
          </TouchableOpacity>

          {selectedChapter === chapter.chapterName && (
            <View key={`exercises-${index}`} style={[styles.exerciseContainer,{height:'auto'}]}>
              {chapter.exercises.map((exercise, exerciseIndex) => (
                <TouchableOpacity
                  key={exerciseIndex}
                  style={styles.exerciseButton}
                  onPress={() => setfilePath(selectedChapter,exercise)}>
                  <Text style={styles.exerciseButtonText}>{exercise}</Text>
                  <Image source={exerciseArrow} style={styles.exerciseArrowcss}/>
                </TouchableOpacity>
              ))}
            </View>
          )}
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

  bgimage: {
    width: '100vw',
    height:150,
    borderRadius:20,
  },
  chapterContainer: {
    padding: 10,
    marginBottom:10,
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
  chapterArrowcss:{
    width:30,
    height:30,
    position:'absolute',
    right:20
  },

  exerciseContainer: {
    marginLeft: 40, // Adjust the indentation as needed
    marginTop: 5,
    marginBottom:20
  },
  exerciseButton: {
    backgroundColor: expicitColors.darkblue, // Change the color as needed
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
    paddingLeft:30,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  exerciseButtonText: {
    fontSize:18,
    color: expicitColors.white,

  },
  exerciseArrowcss:{
    marginRight:10,
    width:20,
    height:20
  }
});

export default Maths;
