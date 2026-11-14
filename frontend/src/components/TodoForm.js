import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const trimmed = title.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    try {
      await onAdd(trimmed);
      setTitle('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="What needs doing?"
        placeholderTextColor={colors.muted}
        onSubmitEditing={submit}
        returnKeyType="done"
        maxLength={200}
      />
      <Pressable
        onPress={submit}
        disabled={!title.trim() || busy}
        style={({ pressed }) => [
          styles.button,
          (!title.trim() || busy) && styles.buttonDisabled,
          pressed && { opacity: 0.8 },
        ]}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10 },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  buttonDisabled: { backgroundColor: colors.muted, opacity: 0.5 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
