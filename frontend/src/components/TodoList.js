import { FlatList, View, Text, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';
import { colors } from '../theme';

export default function TodoList({ todos, refreshing, onRefresh, onToggle, onDelete }) {
  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TodoItem todo={item} onToggle={onToggle} onDelete={onDelete} />
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={todos.length === 0 && styles.emptyContainer}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Nothing to do yet</Text>
          <Text style={styles.emptyText}>Add your first task above.</Text>
        </View>
      }
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: colors.ink },
  emptyText: { fontSize: 14, color: colors.muted, marginTop: 4 },
});
