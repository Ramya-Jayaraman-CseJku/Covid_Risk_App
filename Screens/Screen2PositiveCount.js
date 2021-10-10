import React, {useState, useEffect} from 'react';

import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import * as dropdownvales from '../dropDownValues.json';

import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryBrushContainer,
  VictoryVoronoiContainer,
  VictoryAxis,
  createContainer,
} from 'victory-native';
import {Button, Header, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

export default function getPositiveCasesCountAPI() {
  const [visible, setVisible] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState('Monthly');
  const [selectedYear, setSelectedYear] = useState('2021');
  const [selectedDistrict, setselectedDistrict] = useState('Linz-Land');
  const [showLineChart, setShowLineChart] = useState(true);
  const [loading, setLoading] = useState(true);
  const [visibleYear, setVisibleYear] = useState(false);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const getSelectedInterval = Interval => {
    setSelectedInterval(Interval);
    hideMenu();
    //setLoading(true);
  };

  const showMenuYear = () => setVisibleYear(true);
  const hideMenuYear = () => setVisibleYear(false);
  const getSelectedYear = year => {
    setSelectedYear(year);
    hideMenuYear();
    // setLoading(true);
  };
  const [modalVisiblePlaces, setModalVisiblePlaces] = useState(false);
  const [state, setState] = useState({data: dropdownvales['Districts']});
  const [query, setQuery] = useState('');

  const getSelectedDistrict = district => {
    setselectedDistrict(district);

    setModalVisiblePlaces(!modalVisiblePlaces);
    //setLoading(true);
  };

  const ddvalues = dropdownvales['Districts'];

  const [districtWisePositiveCases, setDistrictWisePositiveCases] = useState(
    [],
  );

  function updateUrl() {
    if (selectedInterval == 'Yearly') {
      setShowLineChart(false);
      //setLoading(true);
    } else {
      setShowLineChart(true);
    }
    //setLoading(true);
  }

  /* const encodedDistrict = encodeURIComponent(selectedDistrictName);
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
    // if (loading) {
    async function getDistrictData() {
      await fetch(
        `https://967b-193-171-38-41.ngrok.io/api/positivecasesbydistrict/?districtname=${selectedDistrict}&year=${selectedYear}&interval=${selectedInterval}`,
      )
        .then(response => response.json())
        .then(json => setDistrictWisePositiveCases(json.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }

    getDistrictData();
    updateUrl();
    // }
  }, [selectedDistrict, selectedYear, selectedInterval]);

  function searchData(text) {
    console.log(text);
    const newData = ddvalues.filter(item => {
      const itemData = item.districtName.toUpperCase();
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
        <Text style={[textColor, styles.row]}>{item.districtName}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
  const renderItem = ({item}) => {
    const color = item.districtName === selectedDistrict ? 'green' : 'black';

    return (
      <Item
        item={item}
        onPress={() => getSelectedDistrict(item.districtName)}
        textColor={{color}}
      />
    );
  };
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  else {
    return (
      <SafeAreaProvider>
        {showLineChart ? (
          <View style={styles.container}>
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisiblePlaces}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisiblePlaces(!modalVisiblePlaces);
                }}>
                <View style={styles.centeredView1}>
                  <View style={styles.modalView}>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={text => searchData(text)}
                      value={query}
                      underlineColorAndroid="transparent"
                      placeholder="Search for a city"
                    />

                    <FlatList
                      data={state.data}
                      keyExtractor={id => id.toString()}
                      ItemSeparatorComponent={itemSeparator}
                      initialNumToRender={5}
                      renderItem={renderItem}
                      style={{marginTop: 10}}
                    />
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() =>
                        setModalVisiblePlaces(!modalVisiblePlaces)
                      }>
                      <Text style={styles.ModalButtontextStyle}>
                        Hide Modal
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>

              <View style={styles.row1}>
                <View>
                  <Text style={styles.heading}>
                    COVID-19 Positive Cases Count {'\n'}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                textAlign: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={styles.textStyle}
                onPress={()=>setModalVisiblePlaces(true)}>
                {selectedDistrict}
              </Text>

              {/* <Pressable onPress={() => setModalVisiblePlaces(true)}>
                <Text style={styles.textStyle} onPress={() => setModalVisiblePlaces(true)}>{selectedDistrict} </Text>
              </Pressable> */}
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
                <MenuItem onPress={() => getSelectedYear('2020')}>
                  2020
                </MenuItem>
                <MenuItem onPress={() => getSelectedYear('2021')}>
                  2021
                </MenuItem>
              </Menu>
            </View>

            <VictoryChart
              theme={VictoryTheme.material}
              width={390}
              height={400}
              domainPadding={{y: [0, 10]}}
              padding={{top: 60, left: 70, right: 30, bottom: 60}}
              containerComponent={
                <VictoryZoomVoronoiContainer
                  zoomDimension="x"
                  zoomDomain={zoomDomain}
                  onZoomDomainChange={handleZoom}
                  labels={({datum}) => `cases:${datum.AnzahlFaelle}`}
                  labelComponent={<VictoryTooltip />}
                />
              }>
              <VictoryAxis
                dependentAxis
                fixLabelOverlap={true}
                label={'Positive Cases'}
                style={{
                  axis: {stroke: 'black'},
                  ticks: {stroke: 'black'},

                  axisLabel: {
                    fontSize: 15,
                    padding: 50,
                    fontWeight: 'bold',
                    fill: 'black',
                  },
                  tickLabels: {
                    fill: 'black',
                    fontSize: 13,
                  },
                  grid: {
                    stroke: 'transparent',
                  },
                }}
              />
              <VictoryAxis
                fixLabelOverlap={true}
                independentAxis
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

              <VictoryLine
                data={districtWisePositiveCases}
                x={'Interval'}
                y={'AnzahlFaelle'}
                style={{
                  data: {stroke: 'teal', strokeWidth: 3},
                  parent: {border: '1px solid #ccc'},
                }}
                interpolation="catmullRom"
              />
            </VictoryChart>
            <VictoryChart
              domainPadding={{y: [0, 10]}}
              width={380}
              height={160}
              scale={{x: 'linear'}}
              padding={{top: 30, left: 60, right: 10, bottom: 50}}
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

              <VictoryLine
                style={{
                  data: {stroke: 'teal'},
                }}
                data={districtWisePositiveCases}
                x={'Interval'}
                y={'AnzahlFaelle'}
                interpolation="catmullRom"
              />
            </VictoryChart>
          </View>
        ) : (
          <View style={styles.container}>
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisiblePlaces}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisiblePlaces(!modalVisiblePlaces);
                }}>
                <View style={styles.centeredView1}>
                  <View style={styles.modalView}>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={text => searchData(text)}
                      value={query}
                      underlineColorAndroid="transparent"
                      placeholder="Search for a city"
                    />

                    <FlatList
                      data={state.data}
                      keyExtractor={id => id.toString()}
                      ItemSeparatorComponent={itemSeparator}
                      initialNumToRender={5}
                      renderItem={renderItem}
                      style={{marginTop: 10}}
                    />
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() =>
                        setModalVisiblePlaces(!modalVisiblePlaces)
                      }>
                      <Text style={styles.ModalButtontextStyle}>
                        Hide Modal
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <View style={styles.row1}>
                <View>
                  <Text style={styles.heading}>
                    COVID-19 Positive Cases Count {'\n'}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',

                textAlign: 'center',
                justifyContent: 'center',
              }}>
              <Pressable onPress={() => setModalVisiblePlaces(true)}>
                <Text style={styles.textStyle}>{selectedDistrict} </Text>
              </Pressable>
              <Menu
                visible={visible}
                anchor={
                  <Pressable onPress={() => showMenu}>
                    <Text style={styles.textStyle}>{selectedInterval}</Text>
                  </Pressable>
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
                  <Pressable onPress={() => showMenuYear}>
                    <Text style={styles.textStyle}>{selectedYear}</Text>
                  </Pressable>
                }
                onRequestClose={hideMenuYear}>
                <MenuItem onPress={() => getSelectedYear('2020')}>
                  2020
                </MenuItem>
                <MenuItem onPress={() => getSelectedYear('2021')}>
                  2021
                </MenuItem>
              </Menu>
            </View>

            <VictoryChart
              padding={{top: 50, left: 80, right: 30, bottom: 70}}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({datum}) => `cases:${datum.AnzahlFaelle}`}
                  labelComponent={<VictoryTooltip />}
                />
              }>
              {districtWisePositiveCases.length < 2 ? (
                setLoading(true)
              ) : (
                <VictoryBar
                  theme={VictoryTheme.material}
                  width={350}
                  height={450}
                  style={{data: {fill: 'teal'}}}
                  data={districtWisePositiveCases}
                  x={'YearlyInterval'}
                  y={'AnzahlFaelle'}
                />
              )}
              <VictoryAxis
                dependentAxis
                fixLabelOverlap={true}
                label={'Positive Cases'}
                style={{
                  axis: {stroke: 'black'},
                  ticks: {stroke: 'black'},

                  axisLabel: {
                    fontSize: 15,
                    padding: 50,
                    fontWeight: 'bold',
                    fill: 'black',
                  },
                  tickLabels: {
                    fill: 'black',
                    fontSize: 13,
                  },
                  grid: {
                    stroke: 'transparent',
                  },
                }}
              />
              <VictoryAxis
                fixLabelOverlap={true}
                independentAxis
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
            </VictoryChart>
          </View>
        )}
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  parametersRow: {
    flexDirection: 'row',
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
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
    width: 100,
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
    backgroundColor: '#F194FF',
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
  iconSetting: {
    width: 50,
    height: 50,
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
  flatlistcontainer: {
    height: 300,
  },
  row: {
    fontSize: 18,
    padding: 10,
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 5,
    width: 120,
  },
  buttonOpen: {
    backgroundColor: 'dodgerblue',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  ModalButtontextStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
