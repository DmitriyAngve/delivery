import React, { forwardRef, useCallback, useMemo } from "react";
import { View, Text } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";

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
  ); // раотает так же как и useMemo, но для ф-ий
  // "overDragResistanceFactor" отвечает за то насколько сопротивляется смешению панелей при перетаскивании.
  return (
    <BottomSheetModal
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop} // этот атрибут помогает настроить компонент, который будет отображаться как задний фон (backdrop) за моей нижней панелью (модалкой). Ф-ия "renderBackdrop", которая создает "BottomSheetBackdrop", чтобы настроить внешний вид фона.
    >
      <View>
        <Text>Bottom Sheet</Text>
      </View>
    </BottomSheetModal>
  );
});
export default BottomSheet;
