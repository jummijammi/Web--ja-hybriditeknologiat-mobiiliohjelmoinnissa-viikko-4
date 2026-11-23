import {Pressable, Text, StyleSheet} from 'react-native'
import { Task } from '../types/Task'
interface TodoRowProps {
    item: Task
    onPress: () => void
}



export default function Row({item, onPress}: TodoRowProps) {
    return (
        <Pressable style={styles.todoRow} onPress={onPress}>
          <Text
    key={item.completed}
    style={[
        styles.todoText,
        item.completed === 1 && styles.completed
    ]}
>
    {item.text}
</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    todoRow: {
      
      backgroundColor:'#f5f5f5',
      padding: 12,
      borderColor: '#c1c0c0',
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1

    },
    todoText: {
      color: '#000'
    },
      completed: {
        color: '#f50808',
        textDecorationLine: 'line-through'
}
})
