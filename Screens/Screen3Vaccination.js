import React, {useState, useEffect} from 'react';
//import DropDownPicker from 'react-native-dropdown-picker';
import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {
  VictoryBar,
  VictoryGroup,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryBrushContainer,
  VictoryVoronoiContainer,
  VictoryAxis,
  createContainer,
} from 'victory-native';
import {Button, Header, Icon} from 'react-native-elements';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {ChonseSelect} from 'react-native-chonse-select';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as dropdownvales from '../dropDownValues.json';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

export default function getFullyVaccinatedCountAPI() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(null);
  const [countryWiseVaccCount, setcountryWiseVaccCount] = useState([]);
  const [selectedStateName, setSelectedStateName] = useState('Wien');
  const [query, setQuery] = useState('');
  const getSelectedState = district => {
    setSelectedStateName(district);

    setModalVisible(!modalVisible);
    setLoading(true);
  };
  const [state, setState] = useState({
    data: dropdownvales['States'],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState('Monthly');
  const [selectedYear, setSelectedYear] = useState('2021');
  const [year, setYear] = useState('2021');
  const [interval, setInterval] = useState('Monthly');
  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const getSelectedInterval = Interval => {
    setSelectedInterval(Interval);
    hideMenu();
    setLoading(true);
  };
  const [visibleYear, setVisibleYear] = useState(false);

  const showMenuYear = () => setVisibleYear(true);
  const hideMenuYear = () => setVisibleYear(false);
  const getSelectedYear = year => {
    setSelectedYear(year);
    hideMenuYear();
    setLoading(true);
  };
  const ddvalues = dropdownvales['States'];
  const [url, setUrl] = useState({
    stateName: 'Wien',
    year: 2021,
    interval: 'Monthly',
  });
  /* const encodedDistrict = encodeURIComponent(selectedStateName);
  const encodedYear = encodeURIComponent(year);
  const encodedInterval = encodeURIComponent(interval); */
  //brush and zoomDomain
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  const [selectedDomain, setSelectedDomain] = useState();
  const [zoomDomain, setZoomDomain] = useState();
  const handleZoom = domain => {
    setSelectedDomain(domain);
  };
  const handleBrush = domain => {
    setZoomDomain(domain);
  };
  useEffect(() => {
    if (loading) {
      async function getVaccinationData() {
        await fetch(
          `https://eb79-193-171-38-41.ngrok.io/api/Vaccination/?statename=${selectedStateName}&year=${selectedYear}&interval=${selectedInterval}`,
        )
          .then(response => response.json())
          .then(json => setcountryWiseVaccCount(json.data))
          .catch(error => console.error(error))
          .finally(() => setLoading(false), []);
      }

      getVaccinationData();
    }
  }, [loading]);

  //const url1 = `https://ecfd241ea67c.ngrok.io/api/Vaccination/?statename=${url.stateName}&year=${url.year}&interval=${url.interval}`;

  const updateUrl = () => {
    if ((year != null) & (interval != null))
      setUrl(url => {
        return {
          ...url,
          stateName: selectedStateName,
          year: year,
          interval: interval,
        };
      });
  };
  function searchData(text) {
    console.log(text);
    const newData = ddvalues.filter(item => {
      const itemData = item.stateName.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setState({
      data: newData,
    });
    setQuery(text);
  }
  const itemSeparator = () => {
    return (
      <View
        style={{
          height: 0.7,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };
  const Item = ({item, onPress, textColor}) => (
    <ScrollView>
      <TouchableOpacity onPress={onPress}>
        <Text style={[textColor, styles.row]}>{item.stateName}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
  const renderItem = ({item}) => {
    const color = item.stateName === selectedStateName ? 'green' : 'black';

    return (
      <Item
        item={item}
        onPress={() => getSelectedState(item.stateName)}
        textColor={{color}}
      />
    );
  };
  // console.log(encodedDistrict, encodedYear, encodedInterval);
  if (loading)
    return (
      <View>
        <Text>'Loading...'</Text>
      </View>
    );
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              //Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView1}>
              <View style={styles.modalView}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => searchData(text)}
                  value={query}
                  underlineColorAndroid="transparent"
                  placeholder="Search for a state"
                />

                <FlatList
                  data={state.data}
                  keyExtractor={(item, id) => id.toString()}
                  ItemSeparatorComponent={itemSeparator}
                  initialNumToRender={5}
                  renderItem={renderItem}
                  style={{marginTop: 10}}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.ModalButtontextStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View style={styles.row1}>
            <View>
              <Text style={styles.heading}>Vaccination Count {'\n'}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'center',
          }}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>{selectedStateName} </Text>
          </Pressable>
          <Menu
            visible={visible}
            anchor={
              <Text style={styles.textStyle} onPress={showMenu}>
                {selectedInterval}
              </Text>
            }
            onRequestClose={hideMenu}>
            <MenuItem onPress={() => getSelectedInterval('Weekly')}>
              Week
            </MenuItem>
            <MenuItem onPress={() => getSelectedInterval('Monthly')}>
              Month
            </MenuItem>
            <MenuItem onPress={() => getSelectedInterval('Yearly')}>
              Year
            </MenuItem>
          </Menu>
          <Menu
            visible={visibleYear}
            anchor={
              <Text style={styles.textStyle} onPress={showMenuYear}>
                {selectedYear}
              </Text>
            }
            onRequestClose={hideMenuYear}>
            <MenuItem onPress={() => getSelectedYear('2020')}>2020</MenuItem>
            <MenuItem onPress={() => getSelectedYear('2021')}>2021</MenuItem>
          </Menu>
        </View>

        <VictoryChart
          theme={VictoryTheme.material}
          width={390}
          height={400}
          domainPadding={{x: [10, 0]}}
          padding={{top: 60, left: 60, right: 30, bottom: 60}}
          containerComponent={
            <VictoryZoomVoronoiContainer
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
              labels={({datum}) =>
                `vaccinated: ${datum.GemeldeteImpfungenLaender}`
              }
              labelComponent={<VictoryTooltip />}
            />
          }>
          <VictoryAxis
            dependentAxis
            fixLabelOverlap={true}
            label={'Vaccination Count'}
            // tickValues={countryWiseVaccCount}
            tickFormat={t => `${Math.round(t) / 1000000}M`}
            style={{
              axis: {stroke: 'black'},
              ticks: {stroke: 'purple'},

              axisLabel: {
                fontSize: 15,
                fontWeight: 'bold',
                fill: 'black',
                padding: 40,
              },
              tickLabels: {
                fill: 'black',
                fontSize: 13,
              },
            }}
          />
          <VictoryAxis
            independentAxis
            fixLabelOverlap={true}
            label={selectedInterval + '-' + selectedYear}
            style={{
              axis: {stroke: 'black'},
              ticks: {stroke: 'black'},
              axisLabel: {
                padding: 30,
                fontSize: 15,
                fontWeight: 'bold',
                fill: 'black',
              },
              tickLabels: {
                fill: 'black',
                fontSize: 13,
              },
              label: {fontsize: 15},
            }}
          />

          <VictoryBar
            style={{data: {fill: 'purple'}}}
            data={countryWiseVaccCount}
            x={'Interval'}
            y={'GemeldeteImpfungenLaender'}
          />
        </VictoryChart>
        <VictoryChart
          width={380}
          height={160}
          scale={{x: 'linear'}}
          padding={{top: 30, left: 80, right: 30, bottom: 50}}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
              brushDimension="x"
              brushStyle={{fill: 'teal', opacity: 0.2}}
              brushDomain={selectedDomain}
              onBrushDomainChange={handleBrush}
            />
          }>
          <VictoryAxis
            independentAxis
            fixLabelOverlap={true}
            label={selectedInterval + '-' + selectedYear}
            style={{
              axis: {stroke: 'black'},
              ticks: {stroke: 'black'},

              axisLabel: {
                padding: 30,
                fontSize: 15,
                fontWeight: 'bold',
                fill: 'black',
              },
              tickLabels: {
                fill: 'black',
                fontSize: 13,
              },
              label: {fontsize: 15},
            }}
          />
          <VictoryBar
            style={{data: {fill: 'purple'}}}
            data={countryWiseVaccCount}
            x={'Interval'}
            y={'GemeldeteImpfungenLaender'}
            interpolation="catmullRom"
          />
        </VictoryChart>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 3,
    backgroundColor: '#eeeeee',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  row: {
    fontSize: 18,
    padding: 10,
  },
  parametersRow: {
    flexDirection: 'row',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 320,
  },
  button: {
    marginLeft: 5,
    width: 120,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  normalButton: {
    width: 70,
    height: 30,
    borderRadius: 50,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 5,
    paddingLeft: 0,
  },
  buttonOpen: {
    backgroundColor: 'dodgerblue',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontSize: 15,
    color: '#008080',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  heading: {
    fontSize: 16,
    color: '#4c70e6',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  ModalButtontextStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 280,
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 50,
    backgroundColor: '#FFFF',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
