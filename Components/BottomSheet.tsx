import React, { forwardRef, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "../constants/Colors";
import { Link } from "expo-router";

export type Ref = BottomSheetModal;

// Тут создаётся нижне модальное окно, которым можно управлять, используя "BottomSheetModal" с помощью "ref"
// "forwardRef" - оберачиваю, чтобы передать ref извне
const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  // useMemo - необходим для оптимизации вычислений, принимает два аргумента: первый - это ф-ия, которая возвращает значение, которое нужно мемоизировать, а второй - это массив зависимостей. После первого рендера массив будет вычислен, и при последующих рендерах будет использован закэшированный результат, если массив зависимостей (второй аргумент) не измениться. В моём случае, snapPoints будет равен ["50%"], и ф-ия useMemo помогает избежать лишних вычислений (50% от экрана)

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  ); // работает так же как и useMemo, но для ф-ий

  const { dismiss } = useBottomSheetModal();

  // "overDragResistanceFactor" отвечает за то насколько сопротивляется смешению панелей при перетаскивании.
  return (
    <BottomSheetModal
      handleIndicatorStyle={{ display: "none" }} // убирает черту у верхней границы модального окна
      backgroundStyle={{ borderRadius: 0, backgroundColor: Colors.lightGrey }}
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      // этот атрибут помогает настроить компонент, который будет отображаться как задний фон (backdrop) за моей нижней панелью (модалкой). Ф-ия "renderBackdrop", которая создает "BottomSheetBackdrop", чтобы настроить внешний вид фона.
    >
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.activeText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleInactive}>
            <Text style={styles.inactiveText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subheader}>Your Location</Text>
        <Link href={"/"} asChild>
          <TouchableOpacity>
            <View>
              <Text>Use current location</Text>
            </View>
          </TouchableOpacity>
        </Link>
        <Text style={styles.subheader}>Arival Time</Text>

        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 32,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
  toggleInactive: {
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  inactiveText: {
    color: Colors.primary,
    fontWeight: "700",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
});

export default BottomSheet;
