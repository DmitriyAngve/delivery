import React, { forwardRef, useMemo } from "react";
import { View, Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export type Ref = BottomSheetModal;

// Тут создаётся нижне модальное окно, которым можно управлять, используя "BottomSheetModal" с помощью "ref"
// "forwardRef" - оберачиваю, чтобы передать ref извне
const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  // useMemo - необходим для оптимизации вычислений, принимает два аргумента: первый - это ф-ия, которая возвращает значение, которое нужно мемоизировать, а второй - это массив зависимостей. После первого рендера массив будет вычислен, и при последующих рендерах будет использован закэшированный результат, если массив зависимостей (второй аргумент) не измениться. В моём случае, snapPoints будет равен ["50%"], и ф-ия useMemo помогает избежать лишних вычислений

  return (
    <BottomSheetModal ref={ref} snapPoints={snapPoints}>
      <View>
        <Text>Bottom Sheet</Text>
      </View>
    </BottomSheetModal>
  );
});
export default BottomSheet;
