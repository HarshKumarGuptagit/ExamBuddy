import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import expicitColors from '../assets/colors';
import Back from '../assets/components/Back';

const Subjects = ({ navigation,route }) => {
  const { folder } = route.params;

  const subjects = ['Maths', 'Science', 'Social Sciences', 'English', 'Alternative English', 'Book Keeping', 'FIT', 'Tenyidie'];

  const handleSubjectPress = (sub) => {
    let formattedSubjectName=sub.replace(/\s+/g, '_'); ;
    if(folder==='QuestionPapers'){

      navigation.navigate('QuestionPaperScreen', { path: `${folder}/${formattedSubjectName}`,subject:sub});
    }

    else{navigation.navigate('PdfViewScreen', { path: `${folder}/${formattedSubjectName}`,chapterName:sub,exerciseName:folder});};
  };

  return (
    
    <View style={[styles.container]}>
      <Back navigation={navigation}/>
      <Text style={styles.titletext}>Select Subject</Text>
      <View style={styles.buttonContainer}>
        {subjects.map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleSubjectPress(subject)}
          >
            <Text style={styles.buttonText}>{subject}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titletext: {
    width: '100%',
    alignItems: 'center',
    padding: 5,
    fontSize:25,
    fontWeight:'bold',
    color:expicitColors.black,
    marginTop:20,

  },
  container: {
    paddingHorizontal: 20,
    height: '100%',
    backgroundColor: expicitColors.white,
  },
  buttonContainer: {

    marginTop: 20,

  },
  button: {
    backgroundColor:expicitColors.selectedBlue,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor:expicitColors.black,
    elevation:10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: expicitColors.white,
  },
});

export default Subjects;
