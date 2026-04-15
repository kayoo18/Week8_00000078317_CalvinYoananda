import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { postData } from "./services/api";
import { router } from "expo-router";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!title || !body) return Alert.alert("Error", "Isi semua field!");

    postData({ title, body, userId: 1 }).then((res) => {
      if (res.status === 201) {
        alert("Berhasil Menambah Post!");
        router.back(); // Balik ke halaman utama
      }
    });
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Create New Post</Text>
      
      <TextInput 
        placeholder="Title" 
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15 }}
        onChangeText={setTitle}
      />
      <TextInput 
        placeholder="Body" 
        multiline
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, height: 100, marginBottom: 20 }}
        onChangeText={setBody}
      />

      <Pressable onPress={handleSubmit} style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 5, marginBottom: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Submit</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ padding: 15 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>Cancel</Text>
      </Pressable>
    </View>
  );
}