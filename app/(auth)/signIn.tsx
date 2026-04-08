import { useAuth } from "@/contexts/authContext";
import FormError from "@/src/utils/FormError";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

type LoginValues = {
  email: string;
  password: string;
};

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const initialValues: LoginValues = { email: "", password: "" };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={async (values, { setStatus, resetForm }) => {
          setStatus(undefined);
          try {
            await login(values.email, values.password);
            router.replace("/(protected)/infoForm");
            console.log("Logged In");
            resetForm();
          } catch (err) {
            console.log(err);
            setStatus("Login failed. Please check your credentials.");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
        }) => (
          <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            ></TextInput>
            <FormError message={touched.email ? errors.email : undefined} />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            ></TextInput>
            <FormError
              message={touched.password ? errors.password : undefined}
            />

            <Pressable
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </Pressable>

            {/* Global Error */}
            {status && <FormError message={status} />}
          </View>
        )}
      </Formik>
      <View style={styles.footer}>
        <Text>Don&apos;t have an account?</Text>
        <Pressable onPress={() => router.push("/signUp")}>
          <Text style={styles.text}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
    paddingVertical: 35,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    backgroundColor: "black",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  text: {
    fontWeight: "bold",
    paddingLeft: 3,
  },
});
