import React, {Fragment, useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {ChonseSelect} from 'react-native-chonse-select';
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
//import DropDownPicker from 'react-native-dropdown-picker';
import {Card} from 'react-native-elements';
//import Icon from 'react-native-vector-icons/Feather';
import {Button, Header, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

export default function getReffectiveValue() {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showLineChart, setShowLineChart] = useState(true);
  const [loading, setLoading] = useState(true);
  const [rEffAustria, setREffAustria] = useState([]);

  const [selectedYear, setSelectedYear] = useState('2021');
  const [selectedInterval, setSelectedInterval] = useState('Monthly');

  const encodedYear = encodeURIComponent(2020);
  const encodedInterval = encodeURIComponent('monthly');
  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const getSelectedInterval = Interval => {
    setSelectedInterval(Interval);
    hideMenu();
    //  setLoading(true);
  };
  const [visibleYear, setVisibleYear] = useState(false);

  const showMenuYear = () => setVisibleYear(true);
  const hideMenuYear = () => setVisibleYear(false);
  const getSelectedYear = year => {
    setSelectedYear(year);
    hideMenuYear();
    // setLoading(true);
  };
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  const [selectedDomain, setSelectedDomain] = useState();
  const [zoomDomain, setZoomDomain] = useState();
  const handleZoom = domain => {
    setSelectedDomain(domain);
  };
  const handleBrush = domain => {
    setZoomDomain(domain);
  };

  const [url, setUrl] = useState({
    districtName: 'Austria',
    year: 2021,
    interval: 'Monthly',
  });
  useEffect(() => {
    //if (loading) {
    async function getDistrictData() {
      await fetch(
        `https://967b-193-171-38-41.ngrok.io/api/R_eff_Austria/?year=${selectedYear}&interval=${selectedInterval}`,
      )
        .then(response => response.json())
        .then(json => setREffAustria(json.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false), []);
    }

    getDistrictData();
    updateUrl();
    //   }
  }, [selectedYear, selectedInterval]);
  // const sampleurl = `https://ecfd241ea67c.ngrok.io/api/R_eff_Austria/?year=${url.year}&interval=${url.interval}`;

  function updateUrl() {
    if (selectedInterval == 'Yearly') {
      setShowLineChart(false);
      //   setLoading(true);
    } else {
      setShowLineChart(true);
      // setLoading(true);
    }
  }

  if (loading)
    return (
      <View>
        <Text>'Loading...'</Text>
      </View>
    );

  //console.log('selectedYear',selectedYear,rEffAustria)
  return (
    <SafeAreaProvider>
      {showLineChart ? (
        <View style={styles.container}>
          <View>
            <View style={styles.row1}>
              <View>
                <Text style={styles.heading}>
                  R_Effective_Value - Austria{'\n'}
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
            <Menu
              visible={visible}
              anchor={
                <Text style={styles.textStyle} onPress={() => showMenu}>
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
          <View>
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
                  labels={({datum}) => `r_eff: ${datum.R_eff}`}
                  labelComponent={<VictoryTooltip />}
                />
              }>
              <VictoryAxis
                dependentAxis
                fixLabelOverlap={true}
                label={'R_Effective'}
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
                style={{
                  data: {stroke: '#32a846', strokeWidth: 4},
                  parent: {border: '1px solid #ccc'},
                }}
                data={rEffAustria}
                x={'Interval'}
                y={'R_eff'}
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
                  data: {stroke: 'green'},
                }}
                data={rEffAustria}
                x={'Interval'}
                y={'R_eff'}
                interpolation="catmullRom"
              />
            </VictoryChart>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <View style={styles.row1}>
              <View>
                <Text style={styles.heading}>
                  R_Effective_Value - Austria{'\n'}
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
            <Menu
              visible={visible}
              anchor={
                <Pressable onPress={showMenu}>
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
                <Pressable onPress={showMenuYear}>
                  <Text style={styles.textStyle}>{selectedYear}</Text>
                </Pressable>
              }
              onRequestClose={hideMenuYear}>
              <MenuItem onPress={() => getSelectedYear('2020')}>2020</MenuItem>
              <MenuItem onPress={() => getSelectedYear('2021')}>2021</MenuItem>
            </Menu>
          </View>

          <VictoryChart
            padding={{top: 50, left: 80, right: 30, bottom: 70}}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({datum}) => `r_eff: ${datum.R_eff}`}
                labelComponent={<VictoryTooltip />}
              />
            }>
            <VictoryBar
              theme={VictoryTheme.material}
              width={350}
              height={450}
              style={{data: {fill: 'teal'}}}
              data={rEffAustria}
              x={'YearlyInterval'}
              y={'R_eff'}
            />
            <VictoryAxis
              dependentAxis
              fixLabelOverlap={true}
              label={'R_Effective'}
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
                  //strokeDasharray: '7',
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
  parametersRow: {
    flexDirection: 'row',
  },

  centeredView: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    //padding: '10',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    //alignItems: 'center',
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
  heading: {
    fontSize: 16,
    color: '#4c70e6',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },
  subHeading: {
    fontSize: 16,
    color: '#4c70e6',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
