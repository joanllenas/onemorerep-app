import { Palette } from '@/constants/color';
import { workoutDecoder } from '@/model/workout.decoder';
import { Workout, WorkoutElement } from '@/model/workout.types';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const FUNCTION_ID = '688f96f2003b7ee97283';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type GenerateWorkoutResponse = {
  assistantMessage: ChatMessage;
  tokensUsed: number;
};

interface Msg {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

export default function CreateWorkoutScreen() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef<FlatList | null>(null);

  // Handle keyboard events
  useEffect(() => {
    console.log('ok');
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // AI service that generates workout JSON
  const callAIService = async (userMessage: string, conversationHistory: Msg[]) => {
    try {
      console.log('trying...');
      /*const execution = await functions.createExecution(
        FUNCTION_ID,
        JSON.stringify([{ role: 'user', content: 'Create a short strength workout that targets chest and back' }])
      );*/
      const execution = { errors: undefined, responseBody: JSON.stringify(functionResponse()) };
      console.log('executed: Errors: ', execution.errors);
      if (execution.errors) {
        alert('Error1: ' + execution.errors);
        return {
          message: 'There has been an error: ' + execution.errors,
          workout: {
            id: 'bad',
            title: ' bad',
            description: 'bad',
            elements: [{ type: 'Rest', duration: 1000 }],
          } as Workout,
        };
      } else {
        console.log('executed: responseBody: ', execution.responseBody);
        const workoutResponse: GenerateWorkoutResponse = JSON.parse(execution.responseBody);
        console.log('parsed responseBody: ', workoutResponse);
        const workout = await workoutDecoder.decodePromise(workoutResponse.assistantMessage.content);

        return {
          message: `I've created the workout.\n${workout.title} - ${workout.description}\nFeel free to ask for modifications!`,
          workout,
        };
      }
    } catch (err) {
      alert('Error2: ' + err);
      return {
        message: 'There has been an error: ' + err,
        workout: {
          id: 'bad',
          title: ' bad',
          description: 'bad',
          elements: [{ type: 'Rest', duration: 1000 }],
        } as Workout,
      };
    }
  };

  const sendMessage = async () => {
    Keyboard.dismiss();

    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await callAIService(inputText, messages);

      const aiMessage = {
        id: Date.now() + 1,
        text: response.message,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setCurrentWorkout(response.workout);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Msg }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
      <Text style={[styles.messageText, item.sender === 'user' ? styles.userMessageText : styles.aiMessageText]}>
        {item.text}
      </Text>
    </View>
  );

  const renderWorkoutStep = ({ item, index }: { item: WorkoutElement; index: number }) => (
    <View style={styles.workoutStep}>
      <Text style={styles.stepNumber}>{index + 1}.</Text>
      <Text style={styles.stepText}>{item.type}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 90}
      >
        {/* Workout Display - Top Half */}
        <View style={[styles.workoutContainer, keyboardHeight > 0 && styles.workoutContainerKeyboard]}>
          <Text style={styles.workoutTitle}>Current Workout</Text>
          {currentWorkout ? (
            <ScrollView style={styles.workoutContent}>
              <Text style={styles.workoutName}>{currentWorkout.title}</Text>
              <FlatList
                data={currentWorkout.elements}
                renderItem={renderWorkoutStep}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
              />
            </ScrollView>
          ) : (
            <View style={styles.emptyWorkout}>
              <Text style={styles.emptyText}>Start a conversation to generate your workout!</Text>
              <Text style={styles.suggestionText}>Try: `Create a beginner workout` or `I want to build strength`</Text>
            </View>
          )}
        </View>

        {/* Chat Interface - Bottom Half */}
        <View style={[styles.chatContainer, keyboardHeight > 0 && styles.chatContainerKeyboard]}>
          <Text style={styles.chatTitle}>Workout Assistant</Text>

          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id.toString()}
            style={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              // Auto-scroll when content size changes
              if (messages.length > 0) {
                flatListRef.current?.scrollToEnd({ animated: true });
              }
            }}
          />

          {isLoading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>AI is thinking...</Text>
            </View>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask for a workout or modifications..."
              multiline
              maxLength={200}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!inputText.trim() || isLoading}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },

  // Workout Display Styles
  workoutContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    marginBottom: 5,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutContainerKeyboard: {
    flex: 0,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  workoutContent: {
    flex: 1,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 5,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  workoutStep: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 8,
    minWidth: 20,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  emptyWorkout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Chat Interface Styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatContainerKeyboard: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  messagesList: {
    flex: 1,
    marginBottom: 10,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#333',
  },
  loadingContainer: {
    padding: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

function functionResponse() {
  return {
    assistantMessage: {
      role: 'assistant',
      content: wkout(),
    },
    tokensUsed: 4000,
  };
}

function wkout() {
  return {
    id: 'w1',
    title: 'Short Chest and Back Strength Workout',
    description: 'A quick strength session targeting chest and back using supersets.',
    elements: [
      {
        id: 'e_warmup',
        type: 'Exercise',
        name: 'Dynamic Chest and Back Warm-up',
        properties: {
          time: 120,
          distance: 0,
          reps: null,
          weight: null,
          rir: 0,
          video: '',
        },
      },
      {
        id: 'block1',
        type: 'Block',
        name: 'Bench Press & Bent-over Row Superset',
        elements: [
          {
            id: 'e_bp',
            type: 'Exercise',
            name: 'Bench Press',
            properties: {
              time: 0,
              distance: 0,
              reps: 8,
              weight: 100,
              rir: 2,
              video: '',
            },
          },
          {
            id: 'e_br',
            type: 'Exercise',
            name: 'Bent-over Row',
            properties: {
              time: 0,
              distance: 0,
              reps: 8,
              weight: 80,
              rir: 2,
              video: '',
            },
          },
        ],
        properties: {
          sets: 4,
          restBetweenSets: 90,
        },
      },
      {
        id: 'block2',
        type: 'Block',
        name: 'Push-up & Pull-up Superset',
        elements: [
          {
            id: 'e_pushup',
            type: 'Exercise',
            name: 'Push-up',
            properties: {
              time: 0,
              distance: 0,
              reps: 'AMRAP',
              weight: 'bodyweight',
              rir: 0,
              video: '',
            },
          },
          {
            id: 'e_pullup',
            type: 'Exercise',
            name: 'Pull-up',
            properties: {
              time: 0,
              distance: 0,
              reps: 'AMRAP',
              weight: 'bodyweight',
              rir: 0,
              video: '',
            },
          },
        ],
        properties: {
          sets: 3,
          restBetweenSets: 90,
        },
      },
      {
        id: 'block3',
        type: 'Block',
        name: 'Dumbbell Fly & Single-arm Row Superset',
        elements: [
          {
            id: 'e_fly',
            type: 'Exercise',
            name: 'Dumbbell Fly',
            properties: {
              time: 0,
              distance: 0,
              reps: 12,
              weight: 15,
              rir: 1,
              video: '',
            },
          },
          {
            id: 'e_row_sa',
            type: 'Exercise',
            name: 'Single-arm Dumbbell Row',
            properties: {
              time: 0,
              distance: 0,
              reps: 12,
              weight: 20,
              rir: 1,
              video: '',
            },
          },
        ],
        properties: {
          sets: 3,
          restBetweenSets: 60,
        },
      },
    ],
  };
}
