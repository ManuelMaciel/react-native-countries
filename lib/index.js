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
import { useRef, useState, useEffect, useMemo } from 'react';
import { FlatList, TextInput, View, Text, Animated, Dimensions, Easing, Platform, Keyboard } from 'react-native';
import { countryCodes } from "./constants/countryCodes";
import { useKeyboardStatus } from "./helpers/useKeyboardStatus";
import { CountryButton } from "./components/CountryButton";
const height = Dimensions.get('window').height;
export const CountrySelector = (_a) => {
    var { show, selectorButtonOnPress, inputPlaceholder, searchMessage, lang = 'en', style, enableModalAvoiding, androidWindowSoftInputMode, onBackdropPress, disableBackdrop, excludedCountries, initialState, itemTemplate: ItemTemplate = CountryButton } = _a, rest = __rest(_a, ["show", "selectorButtonOnPress", "inputPlaceholder", "searchMessage", "lang", "style", "enableModalAvoiding", "androidWindowSoftInputMode", "onBackdropPress", "disableBackdrop", "excludedCountries", "initialState", "itemTemplate"]);
    const codes = countryCodes === null || countryCodes === void 0 ? void 0 : countryCodes.filter(country => {
        return !(excludedCountries === null || excludedCountries === void 0 ? void 0 : excludedCountries.find(short => (country === null || country === void 0 ? void 0 : country.code) === (short === null || short === void 0 ? void 0 : short.toUpperCase())));
    });
    const keyboardStatus = useKeyboardStatus();
    const animationDriver = useRef(new Animated.Value(0)).current;
    const animatedMargin = useRef(new Animated.Value(0)).current;
    const [searchValue, setSearchValue] = useState(initialState || '');
    const [visible, setVisible] = useState(show);
    useEffect(() => {
        if (show) {
            openModal();
        }
        else {
            closeModal();
        }
    }, [show]);
    useEffect(() => {
        if (enableModalAvoiding &&
            (keyboardStatus.keyboardPlatform === 'ios' ||
                (keyboardStatus.keyboardPlatform === 'android' &&
                    androidWindowSoftInputMode === 'pan'))) {
            if (keyboardStatus.isOpen)
                Animated.timing(animatedMargin, {
                    toValue: keyboardStatus.keyboardHeight,
                    duration: 290,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }).start();
            if (!keyboardStatus.isOpen)
                Animated.timing(animatedMargin, {
                    toValue: 0,
                    duration: 290,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }).start();
        }
    }, [keyboardStatus.isOpen]);
    const resultCountries = useMemo(() => {
        if (!searchValue)
            return codes.filter((country) => {
                if (country === null || country === void 0 ? void 0 : country.dial_code.includes(searchValue)) {
                    return country;
                }
            });
        const lowerCaseSearchValue = searchValue.toLowerCase();
        return codes.filter((country) => {
            if (country === null || country === void 0 ? void 0 : country.common_name[lang || 'en'].toLowerCase().includes(lowerCaseSearchValue)) {
                return country;
            }
        });
    }, [searchValue]);
    const modalPosition = animationDriver.interpolate({
        inputRange: [0, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
        outputRange: [height, 105, 75, 50, 30, 15, 5, 0],
        extrapolate: 'clamp',
    });
    const modalBackdropFade = animationDriver.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.5, 1],
        extrapolate: 'clamp'
    });
    const openModal = () => {
        setVisible(true);
        Animated.timing(animationDriver, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
        }).start();
    };
    const closeModal = () => {
        Animated.timing(animationDriver, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false,
        }).start(() => setVisible(false));
    };
    const renderItem = ({ item, index }) => {
        let itemName = item === null || item === void 0 ? void 0 : item.common_name[lang || 'en'];
        let checkName = itemName.length ? itemName : item === null || item === void 0 ? void 0 : item.common_name[lang || 'en'];
        return (<ItemTemplate key={index} item={item} style={style} name={checkName} onPress={() => {
                Keyboard.dismiss();
                typeof selectorButtonOnPress === 'function' && selectorButtonOnPress(item);
            }}/>);
    };
    const onStartShouldSetResponder = () => {
        onBackdropPress === null || onBackdropPress === void 0 ? void 0 : onBackdropPress();
        return false;
    };
    if (!visible)
        return null;
    return (<>
            {!disableBackdrop && (<Animated.View onStartShouldSetResponder={onStartShouldSetResponder} style={[
                {
                    flex: 1,
                    opacity: modalBackdropFade,
                    backgroundColor: 'rgba(116,116,116,0.45)',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'flex-end'
                },
                style === null || style === void 0 ? void 0 : style.backdrop
            ]}/>)}
            <Animated.View style={[
            styles.modal,
            style === null || style === void 0 ? void 0 : style.modal,
            {
                transform: [
                    {
                        translateY: modalPosition,
                    },
                ],
            },
        ]}>
                <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
                    <TextInput style={[styles.searchBar, style === null || style === void 0 ? void 0 : style.textInput]} value={searchValue} onChangeText={setSearchValue} placeholder={inputPlaceholder || 'Search your country'} {...rest}/>
                </View>
                <View style={[styles.line, style === null || style === void 0 ? void 0 : style.line]}/>
                {resultCountries.length === 0 ? (<View style={[styles.countryMessage, style === null || style === void 0 ? void 0 : style.countryMessageContainer]}>
                        <Text style={[
                {
                    color: '#8c8c8c',
                    fontSize: 16,
                },
                style === null || style === void 0 ? void 0 : style.searchMessageText,
            ]}>
                            {searchMessage || 'Sorry we cant find your country :('}
                        </Text>
                    </View>) : (<FlatList showsVerticalScrollIndicator={false} data={(resultCountries || codes)} keyExtractor={(item, index) => '' + item + index} initialNumToRender={10} maxToRenderPerBatch={10} style={[{
                    height: 250
                }, style === null || style === void 0 ? void 0 : style.itemsList]} keyboardShouldPersistTaps={'handled'} renderItem={renderItem} {...rest}/>)}
                <Animated.View style={[
            styles.modalInner,
            style === null || style === void 0 ? void 0 : style.modalInner,
            {
                height: animatedMargin,
            },
        ]}/>
            </Animated.View>
        </>);
};
const styles = {
    container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: 'white',
        width: '100%',
        maxWidth: Platform.OS === "web" ? 600 : undefined,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 10,
    },
    modalInner: {
        backgroundColor: 'white',
        width: '100%',
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        height: 40,
        padding: 5,
    },
    countryMessage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    line: {
        width: '100%',
        height: 1.5,
        borderRadius: 2,
        backgroundColor: '#eceff1',
        alignSelf: 'center',
        marginVertical: 5,
    },
};
