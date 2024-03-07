import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  CollectionReference,
  DocumentData,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Header({ title }: { title: string }) {
  const { user } = useAuth();
  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.title}>{title}</Text>
      <TouchableOpacity onPress={() => console.log("pressed search")}>
        <Ionicons style={headerStyles.iconButton} name="search" size={24} />
      </TouchableOpacity>

      <View style={headerStyles.avatar}>
        <Text>{user?.email?.[0]}</Text>
      </View>
    </View>
  );
}

function Card({ title, book }: { title: string; book: any }) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate(`/(book)/${book.id}`);
      }}
      style={{
        backgroundColor: "#f8f8f8",
        width: "45%",
        height: 200,

        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      {book.volumeInfo.industryIdentifiers[0].identifier && (
        <Image
          source={{
            uri: `https://covers.openlibrary.org/b/isbn/${book.volumeInfo.industryIdentifiers[0].identifier}-M.jpg`,
          }}
          style={{ width: "100%", height: "60%" }}
          resizeMode="contain"
        />
      )}
      {!book.volumeInfo.industryIdentifiers[0].identifier && (
        <Image
          source={require("../../assets/images/placeholder.png")}
          resizeMode="contain"
          style={{ width: "100%", height: "60%" }}
        />
      )}
      <Text>{title}</Text>
      <Text>{book.volumeInfo.authors[0]}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const [books, setBooks] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const uuid = user?.uid;
    if (!uuid) return;

    const booksCollection = collection(
      FIRESTORE_DB,
      "users",
      uuid,
      "books"
    ) as CollectionReference<DocumentData>;

    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const books = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setBooks(books);
    });

    // Cleanup function for unsubscribing from the snapshot listener
    return () => unsubscribe();
  }, [user]);

  // Filtration of favorite books
  const favoriteBooks = books.filter((book) => book.favorite);

  return (
    <SafeAreaView>
      <Header title="Home" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Welcome to LibraryTrack</Text>
        <View
          style={{
            marginTop: 16,
            width: "100%",
            height: 200,
            backgroundColor: "#f8f8f8",
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,

            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 32,
              textAlign: "left",
              marginLeft: 8,
            }}
          >
            Track your daily
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "normal",

              textAlign: "left",
              marginLeft: 8,
            }}
          >
            Monitor your daily reading
          </Text>
          <Image
            source={require("@/assets/images/book.png")}
            width={80}
            height={80}
            style={{
              width: "50%",
              height: "50%",
              position: "absolute",
              right: 0,
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              position: "absolute",
              left: 8,
              bottom: 32,
              fontSize: 24,

              padding: 8,
              borderRadius: 8,
            }}
          >
            %76
          </Text>
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              bottom: 16,
              flexDirection: "row",
              left: "5%",
              gap: 8,
              alignSelf: "flex-start",
              width: "76%",
              height: 16,
              backgroundColor: "#7568B1",
              borderRadius: 100,
            }}
          />
          <View
            style={{
              position: "absolute",

              bottom: 16,
              flexDirection: "row",
              gap: 8,
              alignSelf: "flex-start",
              width: "90%",
              left: "5%",
              height: 16,
              backgroundColor: "#BFBFBF",
              borderRadius: 100,
            }}
          />
        </View>
        <View style={{ gap: 16 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 16,
            }}
          >
            Favorite Books
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              marginLeft: "5%",
              gap: 8,
            }}
          >
            {favoriteBooks.map((val) => {
              return (
                <Card book={val} title={val.volumeInfo.title} key={val.id} />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    gap: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  iconButton: {},
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
  },
});
