import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { db, collection, addDoc, getDocs, deleteDoc, doc } from "./firebaseConfig"; 
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(notesList);
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  };

  const addNote = async () => {
    if (noteText.trim() === 'a') {
      alert('Note cannot be empty');
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        text: noteText,
        created: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setNoteText('');
      fetchNotes();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      console.log("Document deleted with ID: ", id);
      fetchNotes();
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const renderNoteItem = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{item.text}</Text>
      {/* <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity> */}
      <AntDesign name="delete" size={30} color="red"
      onPress={() => deleteNote(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new note"
        value={noteText}
        onChangeText={setNoteText}
      />
      <AntDesign name="pluscircle" size={30} color="blue" onPress={addNote} />
      {/* <Button title="Add Note" onPress={addNote} /> */}
      <FlatList
        data={notes}
        renderItem={renderNoteItem}
        keyExtractor={item => item.id}
        style={styles.notesList}
        contentContainerStyle={styles.notesListContent}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  notesList: {
    width: '100%',
  },
  notesListContent: {
    paddingBottom: 20,
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});