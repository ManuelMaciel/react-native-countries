var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Text, TouchableOpacity } from "react-native";
export const CountryButton = (_a) => {
    var { item, name, style } = _a, rest = __rest(_a, ["item", "name", "style"]);
    return (<TouchableOpacity style={[styles.countryButton, style === null || style === void 0 ? void 0 : style.countryButtonStyles]} {...rest}>
        <Text style={[
            {
                flex: 0.2
            },
            style === null || style === void 0 ? void 0 : style.flag
        ]}>
            {item === null || item === void 0 ? void 0 : item.flag}
        </Text>
        <Text style={[{
                flex: 0.3,
            }, style === null || style === void 0 ? void 0 : style.dialCode]}>
            {item === null || item === void 0 ? void 0 : item.dial_code}
        </Text>
        <Text style={[{
                flex: 1
            }, style === null || style === void 0 ? void 0 : style.countryName]}>
            {name}
        </Text>
    </TouchableOpacity>);
};
const styles = {
    countryButton: {
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        width: '100%',
        height: 50,
        paddingHorizontal: 25,
        alignItems: 'center',
        marginVertical: 2,
        flexDirection: 'row',
        borderRadius: 10,
    },
};
