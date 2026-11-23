import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Task } from './types/Task';
import Row from './components/Row';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [input, setInput] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    loadTodos()
    }, [])
  
    const loadTodos = async () => {
    const data = await AsyncStorage.getItem('todos')
    if (data) {
      setTasks(JSON.parse(data))
    }
  }

  const addTask = async () =>{
    if (!input.trim()) return
    const id = Date.now()
    const task: Task = { id,text: input, completed: 0}
    const newTasks = [...tasks,task]
    
    setTasks(newTasks)
    await AsyncStorage.setItem('todos', JSON.stringify(newTasks))
    setInput("")
  }

   const toggleTask = async (id: number) => {
    const newTasks = tasks.map(task =>
      task.id === id
        ? { ...task, completed: task.completed === 0  ? 1 : 0 }
        : task
    )

    setTasks(newTasks)
    await AsyncStorage.setItem('todos', JSON.stringify(newTasks))
  }

  return (

    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.input} 
          value={input}
          onChangeText={setInput}
          placeholder= 'Add new task...'
          onSubmitEditing={addTask}

        />
      </View>
      <FlatList<Task>
        style={{ flex: 1, width: '100%' }}
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) =>  <Row item={item} onPress={() => toggleTask(item.id)} />
        }
      />
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});
