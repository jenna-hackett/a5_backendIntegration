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
import FormError from "../src/utils/FormError";

// TODO: ADD A LOGOUT BUTTON ON THIS PAGE!!!!!!!!

type infoValues = {
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
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number cannot be longer than 10 digits"),
  email: Yup.string().email("Must be a valid email"),
  sin: Yup.string()
    .required("SIN cannot be blank")
    .min(9, "SIN must be at least 10 digits")
    .max(9, "SIN cannot be longer than 9 digits"),
});

const initialValues: infoValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  sin: "",
};
export default function InfoForm() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Employee Information Form</Text>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={infoSchema}
          onSubmit={(values, { setStatus, resetForm }) => {
            setStatus(undefined);
            try {
              console.log("Submitted:", values);
              Alert.alert("Success", "Form submitted!");
              resetForm();
            } catch (error) {
              setStatus("Error. Please try again.");
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
});
