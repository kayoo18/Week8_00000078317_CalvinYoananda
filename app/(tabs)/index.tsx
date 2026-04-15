import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { getPosts } from "../services/api"; // postData dipindah ke halaman form nanti

export default function Index() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    getPosts().then((res) => {
      if (res.status === 200) {
        setPosts(res.data);
      }
    }).catch(err => console.log("Load Error:", err));
  };

  // TUGAS 1 (Kreativitas): Pindah ke halaman form isi data
  const handleNavigateToCreate = () => {
    router.push("/createPost");
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      
      {/* Tombol Add New Post yang navigasi ke Form */}
      <Pressable
        onPress={handleNavigateToCreate}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#0051a8" : "#007AFF",
          padding: 15,
          margin: 15,
          borderRadius: 10,
          elevation: 3, // Shadow untuk Android
          shadowColor: '#000', // Shadow untuk iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
        })}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 16 }}>
          + Add New Post
        </Text>
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {posts.map((post) => (
          <Pressable
            key={post.id}
            style={({ pressed }) => ({
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0',
              backgroundColor: pressed ? '#f9f9f9' : 'white'
            })}
            onPress={() =>
              router.push({
                pathname: "/postDetail", 
                params: { id: post.id, userId: post.userId },
              })
            }
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: "bold", color: "#007AFF" }}>Post #{post.id}</Text>
              <Text style={{ color: '#bbb' }}>{'>'}</Text>
            </View>
            
            <Text style={{ fontSize: 17, fontWeight: '700', marginVertical: 6, color: '#333' }}>
              {post.title}
            </Text>
            
            <Text style={{ color: "#666", lineHeight: 20 }} numberOfLines={2}>
              {post.body}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}