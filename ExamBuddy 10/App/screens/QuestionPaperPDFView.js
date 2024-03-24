import React, { useState, useEffect } from 'react';
import {
  Image,
  Animated,
  Text,
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Pdf from 'react-native-pdf';
import Header from '../assets/components/Header';
import back_button from '../assets/icons/back-button.png';
import home_button from '../assets/icons/home-button.png';
import not_available from '../assets/icons/Not_available.png';
import expicitColors from '../assets/colors';

const QuestionPaperPDFView = ({ navigation, route }) => {
  const { subject, path } = route.params;
  const years = [2018, 2019, 2020, 2021, 2022, 2023];

  // State for selected year and formatted file name
  const [selectedYear, setSelectedYear] = useState(2023);
  const [buttonsSlideAnim] = useState(new Animated.Value(Dimensions.get('window').width));
  const [pdfPath, setPdfPath] = useState({
    uri: `bundle-assets://${path}_${selectedYear}.pdf`,
    cache: true,
  });

  const [fileExists, setFileExists] = useState(true); // Default to true, assuming the file exists

  // Function to handle year press
  const yearPress = (year) => {
    // Update state with new formatted file name and PDF source
    setSelectedYear(year);
    const formattedFileName = `bundle-assets://${path}_${year}.pdf`;

    setPdfPath({
      uri: formattedFileName,
      cache: true,
    });

    checkFileExists(formattedFileName);
  };

  // Function to check if the file exists
  const checkFileExists = async (fileName) => {
    const exists = pdfPath.uri !== null && pdfPath.uri !== undefined;
    setFileExists(exists);
  };

  useEffect(() => {
    checkFileExists();
    Animated.timing(buttonsSlideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View>
      <Header mainHeading={subject.toUpperCase()} subHeading={'Past Year Questions'} />

    <ScrollView horizontal  contentContainerStyle={styles.yearBar}>
        <View style={styles.yearContainer}>
        {/* Map through the years array and create buttons */}
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            style={[
              styles.button,
              { backgroundColor: selectedYear === year ? expicitColors.selectedBlue : expicitColors.darkblue },
            ]}
            onPress={() => yearPress(year)}>
            <Text
              style={[
                styles.buttonText,
                { color: expicitColors.white },
              ]}>
              {year}
            </Text>
          </TouchableOpacity>
        ))}
        </View>
      </ScrollView>
      
      <View style={{ width: '100%', height: '85%', backgroundColor: expicitColors.fadeblueBG }}>
        {fileExists ? (
          <Pdf
            trustAllCerts={false}
            source={pdfPath}
            onLoadComplete={(numberOfPages, pdfPath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onError={(error) => {
              console.log(error);
              // If an error occurs, set fileExists to false
              setFileExists(false);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        ) : (
          // Display "Not available" message when the file does not exist
          <View style={styles.naview}>
            <Image source={not_available} style={styles.naicon} />
            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 50 }}>
              Not available
            </Text>
          </View>
        )}
      </View>

      {/* Header Navigation Component */}
      <Animated.View
        style={[
          styles.buttonsContainer,
          { transform: [{ translateX: buttonsSlideAnim }] },
        ]}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.navbutton}
          onPress={() => navigation.goBack()}>
          <Image source={back_button} style={styles.icon} />
        </TouchableOpacity>

        {/* Home Button */}
        <TouchableOpacity
          style={styles.navbutton}
          onPress={() => navigation.navigate('Home')}>
          <Image source={home_button} style={styles.icon} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  yearBar:{
    alignItems: 'center',
    padding: 10,
    backgroundColor: expicitColors.lightgrey,
  },
  yearContainer: {
    display: 'flex',
    flexDirection: 'row', // Align buttons in a row
    gap: 5,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 65,
    height:40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pdf: {
    padding: 10,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: expicitColors.fadeblueBG,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 500,
  },
  naicon: {
    width: 100,
    height: 200,
    marginBottom: 50,
  },
  naview: {
    backgroundColor: expicitColors.fadeblueBG,
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 100,
  },
  navbutton: {
    width: 45,
    height: 45,
    borderRadius: 35,
    alignItems: 'center',
    backgroundColor: expicitColors.white,
    justifyContent: 'center',
    margin: 10,
  },
  buttonsContainer: {
    backgroundColor: expicitColors.darkblue,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    right: 0,
    width: 60,
    height: 180,
    bottom: 50,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default QuestionPaperPDFView;
