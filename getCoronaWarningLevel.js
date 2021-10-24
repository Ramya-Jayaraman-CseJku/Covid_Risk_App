import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SearchBar, Card, Header} from 'react-native-elements';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Circle,
  Polyline,
} from 'react-native-maps';

import {VictoryLegend} from 'victory-native';
import * as warnlevelDates from './dropDownValues.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function getWarningLevelDataAPI() {
  const [districtName, setDistrictName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date('2021-09-09'));
  
  const [selectedWarnLevelDate, setSelectedWarnLevelDate] = useState('');
  useEffect(() => {
    async function getDistrictNames() {
      await fetch(
        `https://covidinfoapi.appspot.com/api/warnLevelRegion/?date=${selectedWarnLevelDate}`,
      )
        .then(response => response.json())
        .then(json => setDistrictName(json))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }

    getDistrictNames();
  }, [selectedWarnLevelDate]);
  console.log(selectedWarnLevelDate);
  let wld = warnlevelDates['WarnLevelDates'];
  let wldates = wld.map(d => d.Date);
  const sdates = wldates;
  let result = [];
  function parseddates() {
    for (let i = 0; i < sdates.length; i++) {
      result[i] = new Date(sdates[i]);
    }

    return result.reverse();
  }
  parseddates();
  const Item = ({
    item,
    onPress,
    backgroundColor,
    textColor,
    getMonth,
    dayNumber,
    dayString,
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wldates, backgroundColor]}>
      <Text style={[styles.dateOutput, backgroundColor && textColor]}>
        {getMonth}
      </Text>
      <Text style={[styles.dateOutput, backgroundColor && textColor]}>
        {dayNumber}
      </Text>
      <Text style={[styles.dayStyle, backgroundColor && textColor]}>
        {isToday(item) ? 'today' : dayString}
      </Text>
    </TouchableOpacity>
  );
 
  function dateSubtractDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  function getDayString(date) {
    return date.toString().split(' ')[0];
  }

  function getMonthName(date) {
    return date.toString().split(' ')[1];
  }
  function isSameDay(date1, date2) {
   
    if (
      date1.getDate() == date2.getDate() &&
      date1.getMonth() == date2.getMonth()
    )
      return true;
    else false;
  }
  function isToday(date) {
    if (
      new Date().getDate() == new Date(date).getDate() &&
      new Date().getMonth() == new Date(date).getMonth()
    )
      return true;
  }

  function parseDate(selectedDate) {
    const format =
      new Date(selectedDate).getFullYear().toString() +
      '-' +
      ('0' + (new Date(selectedDate).getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + new Date(selectedDate).getDate()).slice(-2);
    return format;
  }
  const onDatePress = date => {
    setSelectedDate(date);
    setSelectedWarnLevelDate(parseDate(date));
    setLoading(true);
  };
  const renderItem = ({item}) => {
    const dayNumber = item.getDate();
    const dayString = getDayString(item);
    const getMonth = getMonthName(item);
    const isActive = isSameDay(new Date(selectedDate), item);
    const backgroundColor = isActive ? 'white' : '#0346a6';
    const color = isActive ? 'green' : 'white';

    return (
      <Item
        item={item}
        onPress={() => onDatePress(item)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        getMonth={getMonth}
        dayNumber={dayNumber}
        dayString={dayString}
      />
    );
  };

  const ItemView = ({item}) => {
    return (
      <View>
        <Text style={styles.itemStyle} onPress={() => getItem(item)}>
          {item.Dates}
        </Text>
      </View>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  const getItem = item => {
    setSelectedDate(item.Dates);
    setLoading(true);
  };
  if (loading)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          backgroundColor="#005fff"
          centerComponent={{
            text: 'Corona Warning Level',
            style: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
            color: '#fff',

            textColor: '#fff',
            fontWeight: 'bold',
          }}
        />
        <View>
          <Card containerStyle={styles.cardStyle1}>
            <Card.Title style={styles.cardTitle}>
              Risk Level Indicators
            </Card.Title>
            <VictoryLegend
              x={1}
              y={1}
            
              orientation="horizontal"
              gutter={30}
             
              data={[
                {name: 'High', symbol: {fill: 'red', type: 'circle'}},
                {name: 'Medium', symbol: {fill: 'orange', type: 'circle'}},
                {name: 'Low', symbol: {fill: 'gold', type: 'circle'}},
                {name: 'Very Low', symbol: {fill: 'green', type: 'circle'}},
              ]}
            />
          </Card>
        </View>

        <View style={styles.map}>
        
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 47.333333,
              longitude: 13.333333,
              latitudeDelta: 6.5,
              longitudeDelta: 1.5,
            }}>
            {districtName.map((report, i) => (
              <Circle
                key={i}
                center={{
                  latitude: report.Latitude,
                  longitude: report.Longitude,
                }}
                radius={8000}
                strokeWidth={1}
                strokeColor={report.MarkerColor}
                fillColor={report.MarkerColor}
                zIndex={1}
                lineCap={'square'}
              />
            ))}
          </MapView>
        
        </View>

        <View style={{paddingTop: 391}}>
          <Card containerStyle={styles.cardStyle}>
            <Card.Title style={styles.cardTitle}>
              Corona Warning Level on - {selectedWarnLevelDate}
            </Card.Title>
            <Text>Choose a date</Text>
            <FlatList
              style={styles.FlatlistContainer}
              data={result}
              renderItem={renderItem}
              keyExtractor={item => item.toDateString()}
              horizontal={true}
              initialNumToRender={15}
              maxToRenderPerBatch={25}
              showsHorizontalScrollIndicator={true}
              initialScrollIndex={result.length - 8}
              contentContainerStyle={[{paddingLeft: 4, paddingRight: 4}]}
            />
          
          </Card>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    paddingTop: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 60,
    height: 500,
  },
  itemStyle: {
    paddingLeft: 50,
    alignItems: 'center',
  },
  searchbarstyle: {
    height: 30,
  },
  inputParametersContainer: {
    paddingTop: 20,
  },
  FlatlistContainer: {
    backgroundColor: '#0346a6',
  },
  cardStyle: {
    paddingTop: 5,
    borderRadius: 20,
    height: 170,
    width: 380,
    marginRight: 0,
    marginLeft: 5,
    borderColor: 'lightgrey',
    marginBottom: 5,
  },
  cardStyle1: {
    marginTop: 3,
    paddingTop: 5,
    borderRadius: 20,
    height: 90,
    width: 382,
    marginRight: 0,
    marginLeft: 5,
    borderColor: 'lightgrey',
  },
  cardTitle: {
    color: '#0087ff',
    fontSize: 17,
  },
  flatListStyle: {
    padding: 45,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    height: '60%',
    borderRadius: 20,

    backgroundColor: '#d4d4d4',
    flexGrow: 0,
  },
  dateOutput: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  dayStyle: {
    color: 'white',
    fontSize: 18,

    textTransform: 'lowercase',
  },
  activeText: {
    color: 'green',
  },
  wldates: {
    width: 60,
    height: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});
