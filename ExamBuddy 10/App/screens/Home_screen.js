import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Share,
  Linking,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import backgroundStart from '../assets/images/background_home.jpg';
import NotesSubject from '../assets/components/NotesSubject';
import expicitColors from '../assets/colors';
import logo from '../assets/images/ExamBuddy_logo.png';
import ExamMaterials from '../assets/components/ExamMaterial';
import hamburger from '../assets/icons/hamburger-menu.png';
import close from '../assets/icons/menu-close.png';
import sharebtn from '../assets/icons/share.png';
import logotext from '../assets/images/ExamBuddy_logo_text.png';

const HomeScreen = ({navigation}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWidth = 250; // Adjust the width of the menu as needed
  const menuAnimation = new Animated.Value(0);

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => setMenuOpen(!menuOpen));
  };

  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      setMenuOpen(false);
      menuAnimation.setValue(0); // Reset the animation value
    });
  };

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-menuWidth, 0],
  });
  const handleFeedback = () => {
    const emailAddress = 'exambuddytech@gmail.com';

    Linking.openURL(`mailto:${emailAddress}`).catch(err => {
      console.error('Error opening email client:', err);
      // Optionally handle the error, for example, by displaying a message to the user
    });
  };
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome app! Your Exam Buddy \n https://google.in',
        url: 'https://google.in', // Replace with your app's URL
        title: 'Share App',
      });

      if (result.action === Share.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share was dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };
  const handleRateMe = () => {
    const packageName = 'com.yourapp.package'; // Replace with your app's package name

    Linking.openURL(`market://details?id=${packageName}`).catch(err => {
      console.error('Error opening Google Play Store:', err);
      // Optionally handle the error, for example, by directing the user to your app's website
    });
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View
        style={[styles.menu, {transform: [{translateX: menuTranslateX}]}]}>
        <TouchableOpacity onPress={closeMenu}>
          <Image source={close} style={styles.hamburger} />
        </TouchableOpacity>
        <Image style={styles.menuImage} source={logo} />
        <Text style={styles.MenuQuote}>"Learning knows no age"</Text>

        <TouchableOpacity onPress={handleFeedback}>
          <Text style={styles.menuButton}>Feedback / Corrections</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRateMe}>
          <Text style={styles.menuButton}>Rate Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Text style={styles.menuButton}>
            Share <Image style={{width: 20, height: 20}} source={sharebtn} />
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Set alpha (transparency) value between 0 and 1
          // elevation: 5, // Add elevation for Android (will be ignored on iOS)
          borderRadius: 10,
        }}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image style={styles.hamburger} source={hamburger} />
        </TouchableOpacity>
        <Image source={logotext} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={handleShare}>
          <Image style={styles.share} source={sharebtn} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('StartPage')}>
        <Image
          style={styles.bgImage}
          source={backgroundStart}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={styles.notes}>
        <Text style={styles.sectionHeading}> Notes </Text>
        <ScrollView horizontal style={styles.notesList}>
          <TouchableOpacity onPress={() => navigation.navigate('MathsScreen')}>
            <NotesSubject style={styles.subjectBtn} subjectName="Maths" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ScienceScreen')}>
            <NotesSubject style={styles.subjectBtn} subjectName="Science" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.examMaterial}>
        <Text style={styles.sectionHeading}> Exam Materials </Text>
        <View style={styles.examList}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Subjects', {folder: 'QuestionPapers'})
            }>
            <ExamMaterials title="Past Question Paper" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Subjects', {folder: 'Blueprint'})
            }>
            <ExamMaterials title="Blueprint" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Subjects', {folder: 'SampleQuestionPapers'})
            }>
            <ExamMaterials title="Sample Question Paper" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.quizbtn} onPress={()=>navigation.navigate('Quiz')}>
        <Text style={styles.quizbtntxt}>Attempt Quiz</Text>
      </TouchableOpacity>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 35,
  },
  share: {
    width: 35,
    height: 35,
    margin: 5,
    marginRight: 10,
  },
  hamburger: {
    width: 40,
    height: 40,
    margin: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: expicitColors.fadeblueBG,
    padding: 10,
  },
  bgImage: {
    width: '100vw',
    height: 150,
    borderRadius: 10,
  },
  subjectBtn: {
    marginHorizontal: 10,
  },
  notesList: {
    borderRadius: 10,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  sectionHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: expicitColors.black,
  },
  examList: {
    borderRadius: 10,
    margin: 5,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250, // Adjust the width of the menu as needed
    height: '110%',
    backgroundColor: 'white', // Adjust the background color as needed
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
  },
  menuImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  menuButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
    padding: 10,
    borderBottomColor: expicitColors.selectedBlue,
    borderBottomWidth: 3,
    borderRadius: 10,
    backgroundColor: expicitColors.lightgrey,
    // Adjust the text color as needed
  },
  MenuQuote: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 50,
  },
  quizbtn: {
    width: '95%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: expicitColors.darkblue,
    bottom: 20,
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'white',
    display:'flex',
    alignContent:'center',
    justifyContent:'center'
  },
  quizbtntxt: {
    color: 'white',
    fontWeight:'bold',
    textAlign:'center',
    fontSize:20,
  },
});

export default HomeScreen;
