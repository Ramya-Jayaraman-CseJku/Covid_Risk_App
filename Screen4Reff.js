import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';

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
  VictoryLabel,
} from 'victory-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

export default function getReffectiveValue() {
  const [visible, setVisible] = useState(false);

  const [showLineChart, setShowLineChart] = useState(true);
  const [loading, setLoading] = useState(true);
  const [rEffAustria, setREffAustria] = useState([]);

  const [selectedYear, setSelectedYear] = useState('2021');
  const [selectedInterval, setSelectedInterval] = useState('Monthly');

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const getSelectedInterval = Interval => {
    setSelectedInterval(Interval);
    hideMenu();
  };
  const [visibleYear, setVisibleYear] = useState(false);

  const showMenuYear = () => setVisibleYear(true);
  const hideMenuYear = () => setVisibleYear(false);
  const getSelectedYear = year => {
    setSelectedYear(year);
    hideMenuYear();
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
  const getREffectiveValue = async () => {
    try {
      const response = await fetch(
        `https://covidinfoapi.appspot.com/api/R_eff_Austria/?year=${selectedYear}&interval=${selectedInterval}`,
      );
      const json = await response.json();
      setREffAustria(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getREffectiveValue();
  }, [selectedYear, selectedInterval]);
  var MyChart = (
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
  );
  if (loading)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  return (
    <SafeAreaProvider>
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
              <Text style={styles.textStyle} onPress={showMenu}>
                {selectedInterval}
              </Text>
            }
            onRequestClose={hideMenu}>
            <MenuItem
              onPress={() => getSelectedInterval('Weekly')}
              textStyle={{color: 'black'}}
              pressColor="#008787">
              Group By Week
            </MenuItem>
            <MenuItem
              onPress={() => getSelectedInterval('Monthly')}
              textStyle={{color: 'black'}}
              pressColor="#008787">
              Group By Month
            </MenuItem>
          </Menu>
        </View>

        <VictoryChart
          theme={VictoryTheme.material}
          width={390}
          height={460}
          domainPadding={{x: [0, 30]}}
          padding={{top: 60, left: 60, right: 30, bottom: 70}}
          containerComponent={
            <VictoryZoomVoronoiContainer
              allowPan={true}
              allowZoom={true}
              responsive={false}
              zoomDimension="x"
              /*  zoomDomain={zoomDomain}
                  onZoomDomainChange={handleZoom} */
              labels={({datum}) => `r_eff: ${datum.R_eff}`}
            />
          }>
          <VictoryAxis
            dependentAxis
            fixLabelOverlap={true}
            style={{
              axis: {stroke: 'black'},
              ticks: {stroke: 'black'},

              tickLabels: {
                fill: 'black',
                fontSize: 13,
              },
            }}
          />
          <VictoryAxis
            fixLabelOverlap={true}
            independentAxis
            tickLabelComponent={<VictoryLabel angle={-45} y={420} />}
            style={{
              axis: {stroke: 'black'},
              ticks: {stroke: 'black'},

              tickLabels: {
                fill: 'black',
                fontSize: 13,
              },
            }}
          />
          {MyChart}
        </VictoryChart>

        {/*  <VictoryChart
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
              
                style={{
                  axis: {stroke: 'black'},
                  ticks: {stroke: 'black'},

                 
                  tickLabels: {
                    fill: 'black',
                    fontSize: 13,
                  },
                
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
            </VictoryChart> */}
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
    color: '#226dd3',
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
