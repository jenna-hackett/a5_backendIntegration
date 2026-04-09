import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>
          Please sign up or sign in to access the Information Form.
        </Text>
        <View style={styles.buttons}>
          <Pressable
            onPress={() => router.push("/signUp")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/signIn")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    paddingTop: 10,
    textAlign: "center",
  },
  safeArea: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "30%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    backgroundColor: "black",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});
