import { StyleSheet } from "react-native";

export default StyleSheet.create({
  h1: {
    fontSize: 18,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    color: "#7a7b86",
    fontWeight: "bold",
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#495e57",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  primaryButton: {
    height: 40,
    width: 100,
    backgroundColor: "#495e57",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: "auto",
  },
  primaryButtonText: {
    fontWeight: "500",
    color: "white",
  },
  outlineButton: {
    height: 40,
    width: 100,
    borderColor: "#4b4d4f",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: "auto",
  },
  outlineButtonText: {
    fontWeight: "500",
    color: "#4b4d4f",
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    borderColor: "#4b4d4f",
    color: "#4b4d4f",
  },
  errorInput: {
    borderColor: "red",
    color: "red",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
  },
});
