/// <reference types="react" />
import { ICountry, ItemTemplateProps, Style } from "./types/Types";
/**
 * Country selector component
 * @param {?boolean} show Hide or show component by using this props
 * @param {?boolean} disableBackdrop Hide or show component by using this props
 * @param {?boolean} enableModalAvoiding Is modal should avoid keyboard ? On android to work required to use with androidWindowSoftInputMode with value pan, by default android will avoid keyboard by itself
 * @param {?string} androidWindowSoftInputMode Hide or show component by using this props
 * @param {?string} inputPlaceholder Text to showing in input
 * @param {?string} searchMessage Text to show user when no country to show
 * @param {?string} lang Current selected lang by user
 * @param {?string} initialState Here you should define initial dial code
 * @param {?array} excludedCountries Array of countries which should be excluded from selector
 * @param {Function} selectorButtonOnPress Function to receive selected country
 * @param {Function} onBackdropPress Function to receive selected country
 * @param {?Object} style Styles
 * @param {?ReactNode} itemTemplate Country list template
 * @param rest
 */
interface Props {
    show: boolean;
    selectorButtonOnPress: (item: ICountry) => any;
    lang: 'en' | 'es';
    inputPlaceholder?: string;
    searchMessage?: string;
    style?: Style;
    enableModalAvoiding?: boolean;
    androidWindowSoftInputMode?: string;
    onBackdropPress?: (...args: any) => any;
    disableBackdrop?: boolean;
    excludedCountries?: [key: string];
    initialState?: string;
    itemTemplate?: (props: ItemTemplateProps) => JSX.Element;
}
export declare const CountrySelector: ({ show, selectorButtonOnPress, inputPlaceholder, searchMessage, lang, style, enableModalAvoiding, androidWindowSoftInputMode, onBackdropPress, disableBackdrop, excludedCountries, initialState, itemTemplate, ...rest }: Props) => JSX.Element | null;
export {};
