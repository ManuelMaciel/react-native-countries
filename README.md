# react-native-country

This package provides a country selector with a search engine.

# Example

![selector1](https://i.imgur.com/zB4ETkK.jpg)
![selector2](https://i.imgur.com/9GUwIRr.jpg)
![selector3](https://i.imgur.com/gfQCitd.jpg)

# Basic usage

```JS
import { CountrySelector } from "react-native-countries-sel";

export default function App() {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [flag, setFlag] = useState('');
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
            width: '80%',
            height: 60,
            backgroundColor: 'white',
            padding: 10,
        }}
      >
        <Text style={{
            color: 'black',
            fontSize: 20
        }}>
            {countryCode ? 'Selected  country: ' + countryCode + ` ${flag}` : 'Click Here!'}
        </Text>
      </TouchableOpacity>

      {/* For showing picker just put show state to show prop */}
      <CountrySelector
        show={show}
        searchMessage={`No country was found`}
        onBackdropPress={() => setShow(false)}
        inputPlaceholder='Search for the country by name'
        // when selector button press you will get the country object with dial code
        selectorButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setFlag(item.flag);
          setShow(false);
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
```

# Props

Below are the props you can pass to the React Component.

| Prop                       | Type      | Default | Example                                    | Description                                                                                                                                                               |
| -------------------------- | --------- | ------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show                       | boolean   |         |                                            | this prop is used to show/hide the modal.                                                                                                    |
| selectorButtonOnPress        | function  |         | (country) => setCode(country.dial_code)    | Put your function here to get the result of the selected country.                                                                                                    |
| inputPlaceholder           | string    |         | inputPlaceholder={'Your placeholder'}      | If you want a custom placeholder                                                                                                   |
| searchMessage              | string    |         | searchMessage={'Some search message here'} | If you want a different message when you can't find a country                                                                                                          |
| lang                       | string    | 'en'    | lang={'pl'}                                | If you want to change the language, just 'en'/'es'. required lang just add them and make a PR :)                                        |
| enableModalAvoiding        | boolean   | false   | enableModalAvoiding={true}                 | For the modal to avoid the keyboard androidWindowSoftInputMode with value pan, by default android will avoid keyboard by itself      |
| androidWindowSoftInputMode | string    |         | androidWindowSoftInputMode={'pan'}         | Basically android bypasses the keyboard by itself, if you want to use the custom bypassing you can use this prop                                                                       |
| itemTemplate               | ReactNode |    CountryButton     | itemTemplate={YourTemplateComponentsHere}  | This parameter gets a React Node element to render as a template for each item in the list. These properties are sent to the element: key, element, style, name and onPress. |
| style                      | Object    |         | style={{yoursStylesHere}}                  | If you want to change the styles of the components you probably need this props. You can check the styling part below.                                                            |
| disableBackdrop                      | boolean    |     false    | disableBackdrop   | if you don't want to show the modal background pass this prop.|
| onBackdropPress                      | function    |     null    | onBackdropPress={() => setShow(false)}  | If you want to close the modal by pressing outside the modal. |
| initialState  | string    |         | initialState={'+380'}  | Sometimes it is necessary to pre-select the country, for example, because of the user's current location, so you can use this option. |
| excludedCountries  | array    |         | excludedCountries={['RU', 'AF']}  | In this option you can define the list of countries to be deleted by adding their codes. |

You can also use all the other FlatList and TextInput props if you need to. 

# Styling

```JS
<CountrySelector
    show={show}
    lang={'es'}
    style={{
        // styles for the modal
        modal: {
            height: 800,
            backgroundColor: '#17bebb'
        },
        // Styles for modal backdrop [View]
        backdrop: {
        
        },
        // Styles for bottom input line [View]
        line: {
        
        },
        // Styles for list of countries [FlatList]
        itemsList: {
        
        },
        // Styles for input [TextInput]
        textInput: {
              height: 80,
              borderRadius: 0,
        },
        // Styles for country button [TouchableOpacity]
        countryButtonStyles: {
              height: 80
        },
        // Styles for search message [Text]
        searchMessageText: {

        },
        // Styles for search message container [View]
        countryMessageContainer: {
        
        },
        // Flag styles [Text]
        flag: {

        },
        // Dial code styles [Text]
        dialCode: {

        },
        // Country name styles [Text]
        countryName: {

        }
    }}
    selectorButtonOnPress={(item) => {
        setCountryCode(item.dial_code);
        setShow(false);
    }}
/>
```