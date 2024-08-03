import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Alert } from "react-native";

import { deleteVideoPost } from "../lib/appwrite";

import { icons } from "../constants";

const VideoCard = ({ title, creator, avatar, thumbnail, video, postId }) => {
  const [play, setPlay] = useState(false);
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
              await deleteVideoPost(postId);
              Alert.alert("Success", "Video post deleted successfully");
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete the video post. Please try again."
              );
            } finally {
              if (onDeleted) {
                onDeleted(postId);
              }
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        {/* <View className="pt-2">
          <Image
            source={icons.deleteIcon}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View> */}
        <View className="pt-2">
          <TouchableOpacity
            onPress={() => {
              handleDelete();
            }}
            className="w-5 h-5"
          >
            <Image
              source={icons.deleteIcon}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
