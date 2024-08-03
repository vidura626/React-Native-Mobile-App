import React from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";

// Assume deleteVideoPost is your function to delete a video post
import { deleteVideoPost } from "./your-api-file"; // Adjust the path as necessary

const IconButton = ({ postId, onDeleted }) => {
  const handleDelete = () => {
    // Show confirmation popup
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteVideoPost(postId); // Call the delete API
              Alert.alert("Success", "Video post deleted successfully.");
              if (onDeleted) {
                onDeleted(postId); // Call the callback function to update the UI
              }
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete the video post. Please try again."
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="pt-2">
      <TouchableOpacity
        onPress={handleDelete}
        className="w-5 h-5"
        accessibilityLabel="Delete Button"
      >
        <Image
          source={icons.deleteIcon}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;
