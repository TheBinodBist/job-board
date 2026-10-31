
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchFilterCardProps {
  onSearch?: (keyword: string, location: string) => void;
}

const locations = [
  "Anywhere",
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Remote",
];

export default function SearchFilterCard({
  onSearch,
}: SearchFilterCardProps) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Anywhere");
  const [modalVisible, setModalVisible] = useState(false);

  const selectLocation = (selected: string) => {
    setLocation(selected);
    setModalVisible(false);
  };

  return (
    <>
      <View className="rounded-3xl border border-gray-200 bg-white p-2.5">
        {/* Keyword */}
        <View className="flex-row items-center px-3 py-2">
          <Ionicons name="search-outline" size={23} color="#899B93" />

          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Role, company, or keyword"
            placeholderTextColor="#9CA3AF"
            className="ml-3 flex-1 text-base text-[#193C32]"
            returnKeyType="search"
            onSubmitEditing={() => onSearch?.(keyword, location)}
          />
        </View>

        {/* Location selector */}
        <Pressable
          onPress={() => setModalVisible(true)}
          className="mt-2 flex-row items-center rounded-2xl bg-[#F5F7F5] px-4 py-4"
        >
          <Ionicons
            name="location-outline"
            size={22}
            color="#71877D"
          />

          <Text className="ml-3 flex-1 text-base text-[#71877D]">
            {location}
          </Text>

          <Ionicons
            name="chevron-down"
            size={20}
            color="#71877D"
          />
        </Pressable>

        {/* Search button */}
        <Pressable
          onPress={() => onSearch?.(keyword, location)}
          className="mt-2 flex-row items-center justify-center rounded-2xl bg-[#20483B] py-4 active:opacity-80"
        >
          <Ionicons name="search-outline" size={21} color="white" />

          <Text className="ml-2 text-base font-bold text-white">
            Search
          </Text>
        </Pressable>
      </View>

      {/* Location modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 justify-end bg-black/40"
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            className="rounded-t-3xl bg-white p-6"
            onPress={(event) => event.stopPropagation()}
          >
            <View className="mb-5 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-[#193C32]">
                Select Location
              </Text>

              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={25} color="#193C32" />
              </Pressable>
            </View>

            <FlatList
              data={locations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => selectLocation(item)}
                  className="flex-row items-center justify-between border-b border-gray-100 py-4"
                >
                  <View className="flex-row items-center">
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color="#71877D"
                    />

                    <Text className="ml-3 text-base text-[#193C32]">
                      {item}
                    </Text>
                  </View>

                  {location === item && (
                    <Ionicons
                      name="checkmark-circle"
                      size={21}
                      color="#78952F"
                    />
                  )}
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
