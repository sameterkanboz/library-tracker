import { getBookByISBN } from "@/api/books";
import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraView } from "expo-camera/next";
import { Stack, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const List = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    const booksCollection = collection(FIRESTORE_DB, "users", "erkan", "books");

    onSnapshot(booksCollection, (snapshot) => {
      const books = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setBooks(books);
    });
  }, []);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);
  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    // alert(
    //   `Bar code with type ${type} and data ${data} has been scanned!`
    // );
    const code = data;
    alert(code);
    const bookData = await getBookByISBN(code);
    console.log("bookData", bookData);
    setShowScanner(false);
    if (!bookData.items) return;
    addBook(bookData.items[0]);
  };

  const addBook = async (book: any) => {
    const newBook = {
      bookId: book.id,
      volumeInfo: book.volumeInfo,
      webReaderLink: book.accessInfo?.webReaderLink,
      textSnippet: book.searchInfo ? book.searchInfo.textSnippet : "",
      favorite: false,
      created: serverTimestamp(),
    };
    const db = await addDoc(
      collection(FIRESTORE_DB, "users", "erkan", "books"),
      newBook
    );
    console.log("Document written with ID: ", db);
  };

  const renderItem: ListRenderItem<any> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          router.push(`../(book)/${item.id}`);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {item.volumeInfo.industryIdentifiers[0].identifier && (
            <Image
              source={{
                uri: `https://covers.openlibrary.org/b/isbn/${item.volumeInfo.industryIdentifiers[0].identifier}-L.jpg`,
              }}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
          )}
          {!item.volumeInfo.industryIdentifiers[0].identifier && (
            <Image
              source={require("../../assets/images/placeholder.png")}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
          )}
          <View>
            <Text>{item.volumeInfo.title}</Text>
            <Text>{item.volumeInfo.authors[0]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => setShowScanner(false)}
            >
              {showScanner ? (
                <Ionicons name="close" size={28} color={"#252525"} />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          ),
        }}
      />
      {showScanner && (
        <>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["ean13", "qr"],
            }}
            style={{
              height: "100%",
              width: "100%",
              elevation: 2,
              zIndex: 2,
            }}
          />
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          )}
        </>
      )}
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {hasPermission && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowScanner(true)}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f5fcff",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#2196f3",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: "white",
  },
});
