import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import QuestionItem from './QuestionItem';
import expicitColors from '../assets/colors';
import {mathsData, scienceData} from '../assets/questions/QuestionsBank';

const {height, width} = Dimensions.get('window');

const Quiz = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState([]);
  const listRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const selectMaths = () => {
    setSelectedOption('maths');
    setQuestions(mathsData);
  };

  const selectScience = () => {
    setSelectedOption('science');
    setQuestions(scienceData);
  };

  const OnSelectOption = (index, x) => {
    const tempData = [...questions];
    tempData.forEach((item, ind) => {
      if (index === ind) {
        item.marked = item.marked !== -1 ? -1 : x;
      }
    });
    setQuestions(tempData);
  };

  const getTextScore = () => {
    let totalQuestions = 0;
    let correctAnswers = 0;

    questions.forEach(item => {
      if (item.marked !== -1) {
        totalQuestions++;
        if (item.marked === item.correct) {
          correctAnswers++;
        }
      }
    });

    return {
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswers,
      score: correctAnswers * 5, // Each correct answer is worth 5 marks
    };
  };

  const reset = () => {
    const tempData = [...questions];
    tempData.forEach(item => {
      item.marked = -1;
    });
    setQuestions(tempData);
  };

  return (
    <View style={{flex: 1, backgroundColor: expicitColors.lightgrey}}>
      <View style={{width: '100%', height: 35, padding: 0}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
            reset();
          }}
          style={{padding: 10, backgroundColor: 'blue'}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              alignSelf: 'center',
              fontSize: 15,
              fontWeight: '700',
            }}>
            Home
          </Text>
        </TouchableOpacity>
      </View>
      {selectedOption === null ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: expicitColors.darkblue,
              fontWeight: 800,
              fontSize: 30,
              textAlign: 'center',
              marginBottom: 50,
            }}>
            Choose a subject
          </Text>
          <TouchableOpacity
            onPress={selectMaths}
            style={{
              borderRadius: 20,
              width: '80%',
              padding: 15,
              marginBottom: 10,
              backgroundColor: 'blue',
            }}>
            <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
              {' '}
              Maths
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={selectScience}
            style={{
              borderRadius: 20,
              width: '80%',
              padding: 15,
              marginBottom: 10,
              backgroundColor: 'blue',
            }}>
            <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
              Science
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginLeft: 20,
                color: '#000',
              }}>
              {selectedOption === 'maths' ? 'Maths' : 'Science'} Questions:{' '}
              {currentIndex}/{questions.length}
            </Text>
            <Text
              style={{
                marginRight: 20,
                fontSize: 20,
                fontWeight: '600',
                color: 'black',
              }}
              onPress={() => {
                reset();
                listRef.current.scrollToIndex({animated: true, index: 0});
              }}>
              Reset
            </Text>
          </View>
          <View style={{marginTop: 30}}>
            <FlatList
              ref={listRef}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x / width + 1;
                setCurrentIndex(x.toFixed(0));
              }}
              data={questions}
              renderItem={({item, index}) => {
                return (
                  <QuestionItem
                    data={item}
                    selectedOption={x => {
                      OnSelectOption(index, x);
                    }}
                  />
                );
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              bottom: 50,
              width: '100%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  currentIndex > 1 ? expicitColors.selectedBlue : 'gray',
                height: 50,
                width: 100,
                borderRadius: 10,
                marginLeft: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                if (currentIndex > 1) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: parseInt(currentIndex) - 2,
                  });
                }
              }}>
              <Text style={{color: '#fff'}}>Previous</Text>
            </TouchableOpacity>
            {currentIndex == questions.length ? (
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  height: 50,
                  width: 100,
                  borderRadius: 10,
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={{color: '#fff'}}>Submit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: expicitColors.darkblue,
                  height: 50,
                  width: 100,
                  borderRadius: 10,
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (questions[currentIndex - 1].marked !== -1) {
                    if (currentIndex < questions.length) {
                      listRef.current.scrollToIndex({
                        animated: true,
                        index: currentIndex,
                      });
                    }
                  }
                }}>
                <Text style={{color: expicitColors.white, fontWeight: 800}}>
                  Next
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: expicitColors.lightgrey,
              width: '90%',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '800',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              Test Score
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: '800',
                alignSelf: 'center',
                marginTop: 20,
                color: 'green',
              }}>
              {getTextScore().score}
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '800',
                alignSelf: 'center',
                color: expicitColors.selectedBlue,
                marginTop: 20,
              }}>
              Correct answer: {getTextScore().correctAnswers} /{' '}
              {getTextScore().totalQuestions}
            </Text>

            <TouchableOpacity
              style={{
                alignSelf: 'center',
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
                backgroundColor: expicitColors.darkblue,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: 'white', fontSize: 20, alignSelf: 'center'}}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Quiz;
