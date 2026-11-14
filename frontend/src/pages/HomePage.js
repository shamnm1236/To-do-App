import { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todoApi';
import { showError, confirmDelete } from '../utils/dialog';
import { colors } from '../theme';

export default function HomePage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadTodos = useCallback(async () => {
    try {
      setError(null);
      setTodos(await getTodos());
    } catch (err) {
      setError(err.message || 'Could not reach the server');
    }
  }, []);

  useEffect(() => {
    loadTodos().finally(() => setLoading(false));
  }, [loadTodos]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTodos();
    setRefreshing(false);
  };

  const handleAdd = async (title) => {
    try {
      const created = await createTodo(title);
      setTodos((prev) => [created, ...prev]);
    } catch (err) {
      showError('Could not add task', err.message);
      throw err; // keeps the text in the form
    }
  };

  const handleToggle = async (todo) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === todo._id ? { ...t, completed: !t.completed } : t))
    );
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t._id === todo._id ? todo : t)));
      showError('Could not update task', err.message);
    }
  };

  const handleDelete = (todo) => {
    const remove = async () => {
      try {
        await deleteTodo(todo._id);
        setTodos((prev) => prev.filter((t) => t._id !== todo._id));
      } catch (err) {
        showError('Could not delete task', err.message);
      }
    };
    confirmDelete('Delete task?', `"${todo.title}" will be removed.`, remove);
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>My To-Do List</Text>
        <Text style={styles.subheading}>
          {todos.length === 0
            ? 'All clear'
            : `${remaining} of ${todos.length} left to do`}
        </Text>

        <View style={styles.form}>
          <TodoForm onAdd={handleAdd} />
        </View>

        {loading ? (
          <ActivityIndicator style={styles.loader} size="large" color={colors.accent} />
        ) : error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>Can't load your to-do list</Text>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable onPress={handleRefresh} style={styles.retry}>
              <Text style={styles.retryText}>Try again</Text>
            </Pressable>
          </View>
        ) : (
          <TodoList
            todos={todos}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 600, // keeps the layout tidy on a wide browser window
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  heading: { fontSize: 32, fontWeight: '700', color: colors.ink, textAlign: 'center' },
  subheading: { fontSize: 15, color: colors.muted, marginTop: 2, textAlign: 'center' },
  form: { marginVertical: 20 },
  loader: { marginTop: 40 },
  errorBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  errorTitle: { fontSize: 17, fontWeight: '600', color: colors.danger },
  errorText: { color: colors.muted, textAlign: 'center', marginTop: 6 },
  retry: {
    marginTop: 14,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: { color: colors.accent, fontWeight: '600' },
});