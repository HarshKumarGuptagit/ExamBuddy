// App.js

import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import StartPage from './App/screens/start_page';
import Home_screen from './App/screens/Home_screen';
import Maths from './App/screens/Math';
import Science from './App/screens/Science';
import PdfView from './App/screens/PdfView';
import QuestionPaperPDFView from './App/screens/QuestionPaperPDFView';
import Subjects from './App/screens/Subjects';
import Quiz from './App/screens/Quiz';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider style={{paddingBottom: -10}} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartPage" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="StartPage" component={StartPage} />
          <Stack.Screen name="Quiz" component={Quiz} />
         <Stack.Screen name="Home" component={Home_screen} />
          <Stack.Screen name="MathsScreen" component={Maths} />
          <Stack.Screen name="ScienceScreen" component={Science} />
          <Stack.Screen name="Subjects" component={Subjects} />
          <Stack.Screen name="PdfViewScreen" component={PdfView} />
          <Stack.Screen name="QuestionPaperScreen" component={QuestionPaperPDFView} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
