import { db } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";
import FormError from "@/src/utils/FormError";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { Formik } from "formik";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

export type infoValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  sin: string;
};

const infoSchema = Yup.object({
  firstName: Yup.string().required("First name cannot be blank"),
  lastName: Yup.string().required("Last name cannot be blank"),
  phone: Yup.string()
    .required("Phone number cannot be blank")
    .length(10, "Phone number must be 10 digits"),
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email cannot be blank"),
  sin: Yup.string()
    .required("SIN cannot be blank")
    .length(10, "SIN must be 10 digits"),
});

const initialValues: infoValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  sin: "",
};
export default function InfoForm() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/signIn");
  };

  const handleFormSubmit = async (
    values: infoValues,
    setStatus: (msg: string | undefined) => void,
    resetForm: () => void,
  ) => {
    setStatus(undefined);
    try {
      await addDoc(collection(db, "employeeInfo"), {
        ...values,
        userId: user?.uid,
      });

      Alert.alert("Success", "Form Submitted");
      resetForm();
    } catch (error) {
      console.log(error);
      setStatus("Error submitting form");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Employee Information Form</Text>
          <View style={styles.buttonRow}>
            <Pressable
              onPress={() => router.push("/(protected)/list")}
              style={styles.smallButton}
            >
              <Text style={styles.buttonText}>View Entries</Text>
            </Pressable>
            <Pressable onPress={handleLogout} style={styles.smallButton}>
              <Text style={styles.buttonText}>Log Out</Text>
            </Pressable>
          </View>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={infoSchema}
          onSubmit={(values, { setStatus, resetForm }) =>
            handleFormSubmit(values, setStatus, resetForm)
          }
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
            <View>
              <View style={styles.field}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  placeholder="Enter first name..."
                  value={values.firstName}
                  autoCapitalize="words"
                  keyboardType="default"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  style={styles.input}
                />
                <FormError
                  message={touched.firstName ? errors.firstName : undefined}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  placeholder="Enter last name..."
                  value={values.lastName}
                  autoCapitalize="words"
                  keyboardType="default"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  style={styles.input}
                />
                <FormError
                  message={touched.lastName ? errors.lastName : undefined}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  placeholder="e.g. 403-123-1234"
                  keyboardType="number-pad"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  style={styles.input}
                />
                <FormError message={touched.phone ? errors.phone : undefined} />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="example@example.ca"
                  value={values.email}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  style={styles.input}
                />
                <FormError message={touched.email ? errors.email : undefined} />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Social Insurance Number (SIN)</Text>
                <TextInput
                  placeholder="e.g. 123-456-789"
                  value={values.sin}
                  keyboardType="number-pad"
                  onChangeText={handleChange("sin")}
                  onBlur={handleBlur("sin")}
                  secureTextEntry
                  style={styles.input}
                />
                <FormError message={touched.sin ? errors.sin : undefined} />
              </View>
              <View style={styles.submit}>
                <Pressable
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  style={[styles.button, isSubmitting && styles.disabled]}
                >
                  {isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                  )}
                </Pressable>

                {status && <FormError message={status} />}
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
  field: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 12,
    paddingTop: 4,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    paddingBottom: 10,
  },
  submit: {
    paddingTop: 10,
    alignItems: "center",
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
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.6,
  },
  smallButton: {
    width: "30%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    backgroundColor: "black",
  },
  buttonRow: {
    paddingTop: 10,
    flexDirection: "row",
    gap: 10,
  },
});
