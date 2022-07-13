import React, { HTMLAttributes } from "react";
import { View } from "react-native";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const CardDrag = ({ ...rest }: Props) => {
  return <View></View>;
};

export default CardDrag;
