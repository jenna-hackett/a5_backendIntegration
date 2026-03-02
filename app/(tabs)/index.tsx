<<<<<<< HEAD
=======

>>>>>>> 4f8741739fda7e8ce1fea995e77a9840e10e5b17
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../ui/components/Button";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View>
        <Text>Sign In</Text>
        <Button
          text="Sign In"
          textColor="black"
          bgColor="pink"
          onPress={() => router.push("/info-form")}
        ></Button>
      </View>
    </SafeAreaView>
  );
}

<<<<<<< HEAD
const styles = StyleSheet.create({});
=======
const styles = StyleSheet.create({})
>>>>>>> 4f8741739fda7e8ce1fea995e77a9840e10e5b17
