import { Palette } from '@/constants/color';
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

interface Msg {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}
interface Wk {
  name: string;
  exercises: string[];
  duration: string;
}

export default function CreateWorkoutScreen() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState<Wk | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef<FlatList | null>(null);

  // Handle keyboard events
  useEffect(() => {
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

  // Mock AI service that generates workout JSON
  const mockAIService = async (userMessage: string, conversationHistory: Msg[]) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const workouts: Record<string, Wk> = {
      beginner: {
        name: 'Beginner Full Body Workout',
        duration: '30 minutes',
        exercises: [
          '5 minutes warm-up walk',
          '10 bodyweight squats',
          '5 push-ups (knees down if needed)',
          '30-second plank',
          '10 lunges (5 each leg)',
          '10 arm circles',
          '5 minutes cool-down stretch',
        ],
      },
      strength: {
        name: 'Strength Training Circuit',
        duration: '45 minutes',
        exercises: [
          '10 minutes dynamic warm-up',
          '3 sets of 8-12 deadlifts',
          '3 sets of 8-10 bench press',
          '3 sets of 10-15 squats',
          '3 sets of 8-10 rows',
          '3 sets of 30-60 second planks',
          '10 minutes stretching',
        ],
      },
      cardio: {
        name: 'High-Intensity Cardio',
        duration: '25 minutes',
        exercises: [
          '5 minutes light jogging warm-up',
          '30 seconds jumping jacks',
          '30 seconds mountain climbers',
          '30 seconds burpees',
          '30 seconds rest',
          'Repeat circuit 4 times',
          '5 minutes walking cool-down',
        ],
      },
      upper: {
        name: 'Upper Body Focus',
        duration: '40 minutes',
        exercises: [
          '5 minutes arm swings and stretches',
          '3 sets of 10-12 push-ups',
          '3 sets of 8-10 pull-ups or assisted pull-ups',
          '3 sets of 12-15 dumbbell rows',
          '3 sets of 10-12 shoulder press',
          '3 sets of 12-15 tricep dips',
          '10 minutes upper body stretching',
        ],
      },
    };

    // Simple keyword matching for demo
    const message = userMessage.toLowerCase();
    let selectedWorkout;

    if (message.includes('beginner') || message.includes('start') || message.includes('easy')) {
      selectedWorkout = workouts.beginner;
    } else if (message.includes('strength') || message.includes('weights') || message.includes('muscle')) {
      selectedWorkout = workouts.strength;
    } else if (message.includes('cardio') || message.includes('running') || message.includes('heart')) {
      selectedWorkout = workouts.cardio;
    } else if (message.includes('upper') || message.includes('arms') || message.includes('chest')) {
      selectedWorkout = workouts.upper;
    } else {
      // Default to beginner if no keywords match
      selectedWorkout = workouts.beginner;
    }

    // Modify workout based on conversation history
    if (conversationHistory.length > 1) {
      selectedWorkout = {
        ...selectedWorkout,
        name: `${selectedWorkout.name} (Refined)`,
        exercises: [...selectedWorkout.exercises, 'Added: 2 minutes breathing exercises'],
      };
    }

    return {
      message: `I've created a ${selectedWorkout.name} for you! This workout focuses on your requested goals and should take about ${selectedWorkout.duration}. Feel free to ask for modifications!`,
      workout: selectedWorkout,
    };
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
      const response = await mockAIService(inputText, messages);

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

  const renderWorkoutStep = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.workoutStep}>
      <Text style={styles.stepNumber}>{index + 1}.</Text>
      <Text style={styles.stepText}>{item}</Text>
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
              <Text style={styles.workoutName}>{currentWorkout.name}</Text>
              <Text style={styles.workoutDuration}>Duration: {currentWorkout.duration}</Text>
              <FlatList
                data={currentWorkout.exercises}
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
