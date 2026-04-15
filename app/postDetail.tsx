import { getPostDetail, getUserDetail, getPostComments } from "./services/api"; 
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, Pressable } from "react-native";

export default function PostDetail() {
  const { id, userId } = useLocalSearchParams<{ id: string; userId: string }>();
  const [user, setUser] = useState<any>(null);
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]); 

  useEffect(() => {
    if (id) {
      getPostDetailData();
      getUserData();
      getCommentsData(); 
    }
  }, [id]);

  const getUserData = () => {
    getUserDetail(Number(userId)).then((res) => {
      if (res.status === 200) setUser(res.data);
    });
  };

  const getPostDetailData = () => {
    getPostDetail(Number(id)).then((res) => {
      if (res.status === 200) setPost(res.data);
    });
  };

  const getCommentsData = () => {
    getPostComments(Number(id)).then((res) => {
      if (res.status === 200) setComments(res.data);
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Tombol Back agar bisa balik ke awal */}
      <Pressable onPress={() => router.back()} style={{ padding: 20 }}>
        <Text style={{ color: '#007AFF' }}>← Back to Home</Text>
      </Pressable>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}>{post?.title}</Text>
        <Text style={{ textAlign: "center", marginTop: 15, fontSize: 16, lineHeight: 24 }}>{post?.body}</Text>

        <View style={{ marginVertical: 30, padding: 20, backgroundColor: "#fbfbfb", borderRadius: 12, borderWidth: 1, borderColor: '#eee' }}>
          <Text style={{ fontWeight: "bold", color: "#999", marginBottom: 5 }}>Post Created By</Text>
          <Text style={{ fontSize: 17, fontWeight: '600' }}>{user?.name}</Text>
          <Text style={{ fontSize: 15, color: '#555' }}>{user?.email}</Text>
        </View>

        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>Comments ({comments.length})</Text>
        {comments.map((item) => (
          <View key={item.id} style={{ marginBottom: 15, padding: 15, backgroundColor: "#f0f7ff", borderRadius: 8 }}>
            <Text style={{ fontWeight: "bold", color: "#007AFF" }}>{item.email}</Text>
            <Text style={{ marginTop: 5, color: '#333' }}>{item.body}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}