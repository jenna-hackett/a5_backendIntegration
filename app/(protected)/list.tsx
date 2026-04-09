import { db } from "@/config/firebase";
import { useRouter } from "expo-router";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { infoValues } from "./infoForm";

type EmployeeInfo = infoValues & {
  id: string;
  userId: string;
};

export default function Submissions() {
  const [items, setItems] = useState<EmployeeInfo[]>([]);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "employeeInfo"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data() as Omit<EmployeeInfo, "id">;
          return {
            id: doc.id,
            ...docData,
          };
        });
        setItems(data);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <ScrollView style={styles.scrollArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Employee Info Submissions</Text>
          <Pressable onPress={() => router.back()} style={styles.smallButton}>
            <Text style={styles.buttonText}>Back to Form</Text>
          </Pressable>
        </View>

        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardName}>
              {item.firstName} {item.lastName}
            </Text>

            <Text style={styles.field}>Email: {item.email}</Text>
            <Text style={styles.field}>Phone: {item.phone}</Text>
            <Text style={styles.field}>SIN: {item.sin}</Text>
            <Text style={styles.field}>User ID: {item.userId}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    margin: 10,
    padding: 16,
    gap: 10,
  },
  header: {
    paddingVertical: 35,
    flexDirection: "column",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  field: {
    fontSize: 16,
    marginBottom: 4,
  },
  smallButton: {
    width: "35%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
    backgroundColor: "black",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});
