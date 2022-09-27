import { ViewStyle } from "react-native";

export interface ICountry {
    common_name: {[key: string]: string},
    dial_code: string,
    code: string,
    flag: string
}
