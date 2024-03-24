import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Text,
} from 'react-native';
import expicitColors from '../assets/colors';
import Pdf from 'react-native-pdf';
import back_button from '../assets/icons/back-button.png';
import home_button from '../assets/icons/home-button.png';
import not_available from '../assets/icons/Not_available.png';
import Header from '../assets/components/Header';

const PdfView = ({navigation, route}) => {
  const {path, chapterName, exerciseName} = route.params;

  let pdfPath = {
    uri: `bundle-assets://${path}.pdf`,
    cache: true,
  };

  const [buttonsSlideAnim] = useState(
    new Animated.Value(Dimensions.get('window').width),
  );

  const [fileExists, setFileExists] = useState(true);

  useEffect(() => {
    checkFileExists();
    Animated.timing(buttonsSlideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  const checkFileExists = async () => {
    const exists = pdfPath.uri !== null && pdfPath.uri !== undefined;
    setFileExists(exists);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <View style={styles.container}>
      <Header mainHeading={chapterName} subHeading={exerciseName} />

      {fileExists ? (
        // Display PDF Viewer when the file exists
        <Pdf
           
          trustAllCerts={false}
          maxScale={3}
          source={pdfPath}
          onLoadComplete={(numberOfPages, pdfPath) => {
            console.log(`Number of pages: ${numberOfPages}`);
            setTotalPages(numberOfPages);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current Page: ${page}, Total Pages: ${numberOfPages}`);
            setCurrentPage(page);
          }}
          onError={error => {
            console.log(error);
            // If an error occurs, set fileExists to false
            setFileExists(false);
          }}
          style={styles.pdf}

        />
      ) : (
        // Display "Not available" message when the file does not exist
        <View style={styles.notAvailableContainer}>
          <Image source={not_available} style={styles.naicon} />
          <Text style={styles.notAvailableText}>Not available</Text>
        </View>
      )}

      <Animated.View
        style={[
          styles.buttonsContainer,
          {transform: [{translateX: buttonsSlideAnim}]},
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
      <View style={styles.pageIndicator}>
        <Text
          style={styles.pageText}>{`Page ${currentPage} / ${totalPages}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageIndicator: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  pageText: {
    color: 'white',
  },
  notAvailableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAvailableText: {
    fontSize: 20,
    textAlign: 'center',
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
    opacity:0.8,
    width: 60,
    height: 180,
    bottom: 50,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: expicitColors.fadeblueBG,
  },
  pdf: {
    padding: 10,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: expicitColors.fadeblueBG,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 40,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius:30,
  },
  naicon: {
    width: 100,
    height: 200,
    marginBottom: 50,
  },
});

export default PdfView;
