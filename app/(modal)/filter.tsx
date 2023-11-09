import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useNavigation } from "expo-router";
import categories from "../../assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const ItemBox = () => (
  <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Hygiene rating</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Dietary</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Category</Text>
  </>
);

const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories);
  // Дополнительный стейт, если у меня есть выбранные позиции массива "items"
  const [selected, setSelected] = useState<Category[]>([]);
  // flexWidth - это анимируемое значение, которое начинается с 0. Можно использовать для анимации изменения его значения, например, для изменения ширины и высоты.
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }

    setSelected(selectedItems);
  }, [items]);

  // Ф-ия для отмены нажатия всех элементов в массиве "items" (для сброса всех отмеченных галочек)
  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;

      return item;
    });

    setItems(updatedItems);
  };

  // Определяю ширину компонента на основе значения "flexWidth". Когда значение "felxWidth" изменяется, анимированный стиль автоматически обновляется, что приводит к изменению ширины компонента с анимаццией
  const animatedStyles = useAnimatedStyle(() => {
    return { width: flexWidth.value, opacity: flexWidth.value > 0 ? 1 : 0 };
  });

  const animatedText = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] };
  });

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      {/* disableBuiltInState - атрибут, который отключает встроенное состояние чекбокса, предоставляя контроль над состоянием*/}
      <BouncyCheckbox
        isChecked={items[index].checked}
        fillColor={Colors.primary}
        unfillColor="#fff"
        disableBuiltInState
        iconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
          borderWidth: 2,
        }}
        innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
        onPress={() => {
          const isChecked = items[index].checked;
          // Если я нажимаю на кнопку, состояние изменяется:
          // Определяю, был ли элемент (категория) в массиве "items" ранее отмечен как "checked"
          // Затем создается новый массив "updatedItems", который копирует все элементы из оригинального массива "items", и для элемента с тем же именем, что и нажатый элемент, инвертирует его состояние (checked)
          const updatedItems = items.map((item) => {
            if (item.name === items[index].name) {
              item.checked = !isChecked;
            }

            return item;
          });
          // Тут новый созданный массив "updatedItems" затем устанавливает в качестве нового состояния с помощью "setItems"
          setItems(updatedItems);
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Button title="Clear all" onPress={handleClearAll} /> */}
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox />}
      />
      <View style={{ height: 76 }} />

      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          {/* FIRST BUTTON */}
          <Animated.View style={[animatedStyles, styles.outlineButton]}>
            <TouchableOpacity onPress={handleClearAll}>
              <Animated.Text style={[animatedText, styles.outlineButtonText]}>
                Clear all
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          {/* SECOND BUTTON */}
          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    height: 56,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundClip: "#fff",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  outlineButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 56,
  },
  outlineButtonText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Filter;
