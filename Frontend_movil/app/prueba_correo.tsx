import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import sendEmailNotification from '../utils/sendEmailNotification';

const EmailNotificationScreen = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = () => {
    if (!email || !subject || !message) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    sendEmailNotification(email, subject, message);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Correo del destinatario"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Asunto"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Mensaje"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="Enviar Correo" onPress={handleSendEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default EmailNotificationScreen;
