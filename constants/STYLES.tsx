import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Containers and layout
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  spaceAround: {
    justifyContent: "space-around",
  },

  // Text styles
  heading: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    color: "#555",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  paragraph: {
    color: "#333",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },
  smallText: {
    color: "#777",
    fontSize: 12,
    lineHeight: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  textCenter: {
    textAlign: "center",
  },

  // Form input styles
  input: {
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputFocused: {
    borderColor: "#4CAF50",
  },

  // Button styles
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
  },
  secondaryButton: {
    backgroundColor: "#ccc",
  },
  dangerButton: {
    backgroundColor: "#F44336",
  },

  // Card styles
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 14,
    color: "#555",
  },

  // Badge styles
  badge: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Progress indicator
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    overflow: "hidden",
    marginBottom: 10,
  },
  progress: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },

  // Gradient styles
  gradient: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  // Fitness-specific styles
  workoutCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutCardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  workoutCardText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  workoutTime: {
    fontSize: 14,
    color: "#555",
  },

  // Utility styles
  roundedCircle: {
    borderRadius: 50,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 15,
  },
});

const {
  container,
  row,
  column,
  justifyContentCenter,
  alignItemsCenter,
  spaceBetween,
  spaceAround,
  input,
  inputFocused,
  button,
  primaryButton,
  secondaryButton,
  dangerButton,
  card,
  cardHeader,
  cardContent,
  badge,
  badgeText,
  progressBar,
  progress,
  gradient,
  workoutCard,
  workoutCardImage,
  workoutCardText,
  workoutTime,
  heading,
  subheading,
  paragraph,
  smallText,
  buttonText,
  linkText,
  textCenter,
  roundedCircle,
  shadow,
  separator,
} = styles;

export {
  container,
  row,
  column,
  justifyContentCenter,
  alignItemsCenter,
  spaceBetween,
  spaceAround,
  input,
  inputFocused,
  button,
  primaryButton,
  secondaryButton,
  dangerButton,
  card,
  cardHeader,
  cardContent,
  badge,
  badgeText,
  progressBar,
  progress,
  gradient,
  workoutCard,
  workoutCardImage,
  workoutCardText,
  workoutTime,
  heading,
  subheading,
  paragraph,
  smallText,
  buttonText,
  linkText,
  textCenter,
  roundedCircle,
  shadow,
  separator,
};
