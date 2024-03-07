import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Stack, useGlobalSearchParams, useNavigation } from "expo-router";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BookPage = () => {
  const { id } = useGlobalSearchParams();
  const [book, setBook] = useState<any>(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  useEffect(() => {
    if (!book) return;
    const favorite = book.favorite;
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={28}
            color="#BB0210"
          />
        </TouchableOpacity>
      ),
    });
  }, [book]);

  const toggleFavorite = () => {
    const isFavorite = book.favorite;
    const fbDoc = doc(FIRESTORE_DB, `users/` + user?.uid + `/books/${id}`);
    updateDoc(fbDoc, { favorite: !isFavorite });
    setBook({ ...book, favorite: !isFavorite });
  };

  const removeBook = () => {
    const fbDoc = doc(FIRESTORE_DB, `users/` + user?.uid + `/books/${id}`);
    deleteDoc(fbDoc);
    navigation.goBack();
  };

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const fbDoc = await getDoc(
        doc(FIRESTORE_DB, `users/` + user?.uid + `/books/${id}`)
      );
      if (!fbDoc.exists()) return;
      const data = await fbDoc.data();
      console.log("data:", data);
      setBook(data);
    };
    load();
  }, [id]);
  return (
    <ScrollView>
      <Stack.Screen
        options={{ headerTitle: book ? `${book.volumeInfo.title}` : "..." }}
      />
      <View style={styles.card}>
        {book && (
          <>
            {book.volumeInfo.industryIdentifiers[0].identifier && (
              <Image
                source={{
                  uri: `https://covers.openlibrary.org/b/isbn/${book.volumeInfo.industryIdentifiers[0].identifier}-M.jpg`,
                }}
                style={styles.image}
                resizeMode="contain"
              />
            )}
            {!book.volumeInfo.industryIdentifiers[0].identifier && (
              <Image
                source={require("../../assets/images/placeholder.png")}
                style={styles.image}
                resizeMode="contain"
              />
            )}
            <Text style={styles.title}>{book.volumeInfo.title}</Text>
            <Text style={styles.description}>
              {book.volumeInfo.description}
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
              }}
              onPress={removeBook}
            >
              <MaterialIcons name="delete" size={40} color="#BB0210" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 4,
    marginBottom: 20,
    alignSelf: "center",
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
    alignSelf: "center",
  },
});

export default BookPage;
