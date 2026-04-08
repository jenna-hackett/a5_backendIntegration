// HOME SCREEN.
/**
 * TODO:
 * 1. Implement welcome message telling user to sign in/sign up.
 * 2. 2 buttons (pressables or a new component?). One for sign up, one for sign in.
 * 3. Sign up button will reroute to signUp page. Upon successful sign up, will reroute to signIn page, will reroute to infoForm page.
 * 4. Sign in button will reroute to  singIn page. Upon successful sign in, will reroute to infoForm page.
 * ********** NOTE: Should signUp/signIn not be successful, user will receive an error asking to try again(?)
 */

import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome!</Text>
        <Text>Please sign up or sign in to access the Information Form.</Text>
        <Pressable onPress={() => router.push("/infoForm")}>
          <Text>InfoForm</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
