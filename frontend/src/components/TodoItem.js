import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <View style={styles.card}>
      <Pressable
        style={styles.main}
        onPress={() => onToggle(todo)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.completed }}
      >
        <View style={[styles.box, todo.completed && styles.boxChecked]}>
          {todo.completed && <Text style={styles.tick}>✓</Text>}
        </View>
        <Text style={[styles.title, todo.completed && styles.titleDone]}>
          {todo.title}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onDelete(todo)}
        hitSlop={10}
        accessibilityLabel={`Delete ${todo.title}`}
      >
        <Text style={styles.delete}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  main: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  box: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: { backgroundColor: colors.accent },
  tick: { color: '#fff', fontSize: 14, fontWeight: '700' },
  title: { flex: 1, fontSize: 16, color: colors.ink },
  titleDone: { textDecorationLine: 'line-through', color: colors.muted },
  delete: { color: colors.danger, fontSize: 14, fontWeight: '500', marginLeft: 12 },
});
