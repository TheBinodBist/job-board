
import { ScrollView, Pressable, Text } from "react-native";

const categories = [
  "All jobs",
  "Design",
  "Engineering",
  "Product",
  "Marketing",
  "Business",
];

interface Props {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function JobCategories({
  selectedCategory,
  onSelect,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10, paddingHorizontal: 24 }}
    >
      {categories.map((category) => {
        const active = selectedCategory === category;

        return (
          <Pressable
            key={category}
            onPress={() => onSelect(category)}
            className={`rounded-full border px-5 py-3 ${
              active
                ? "border-[#DDEBC0] bg-[#DDEBC0]"
                : "border-gray-200 bg-white"
            }`}
          >
            <Text
              className={`font-semibold ${
                active
                  ? "text-[#20483B]"
                  : "text-[#71877D]"
              }`}
            >
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
