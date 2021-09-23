import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Card, Header} from 'react-native-elements';

const dataOverview = () => {
  const positiveCases =
    'https://www.data.gv.at/katalog/dataset/4b71eb3d-7d55-4967-b80d-91a3f220b60c';
  const warnLevel =
    'https://www.data.gv.at/katalog/dataset/52abfc2b-031c-4875-b838-653abbfccf4e';
  const vaccination =
    'https://www.data.gv.at/katalog/dataset/7effe370-ce79-4286-b299-c5d851f546ff';
  const REffective = 'https://sites.google.com/view/corona-at/startseite';
  const modalCalculation = 'https://www.mpic.de/4747361/risk-calculator';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          backgroundColor="#005fff"
          centerComponent={{
            text: 'Feature Overview',
            style: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
            color: '#fff',

            textColor: '#fff',
            fontWeight: 'bold',
          }}
        />

        <View style={styles.cardRow}>
          <TouchableOpacity onPress={() => Linking.openURL(positiveCases)}>
            <Card containerStyle={styles.cardStyle}>
              <Card.Title style={styles.cardTitle}>Positive Cases</Card.Title>
              <Text>
                <Text style={styles.subHeading}>Granularity:</Text> City-Wise
              </Text>
              <Text>
                <Text style={styles.subHeading}>Update Interval:</Text>
                Daily
              </Text>
              <Text style={styles.subHeading}>Availability:</Text>
              <Text>Lagging By Two Days</Text>
              <Text style={styles.subHeading}>Graph Interval:</Text>
              <Text> Week-Month-Year</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(warnLevel)}>
            <Card containerStyle={styles.cardStyle}>
              <Card.Title style={styles.cardTitle}> Warning Level </Card.Title>
              <Text>
                <Text style={styles.subHeading}>Granularity:</Text> City-Wise
              </Text>
              <Text>
                <Text style={styles.subHeading}>Update Interval:</Text>
                Weekly
              </Text>
              <Text style={styles.subHeading}>Availability:</Text>
              <Text>For Specific Date</Text>
              <Text style={styles.subHeading}>Map Interval:</Text>
              <Text>Specific Date</Text>
            </Card>
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity onPress={() => Linking.openURL(vaccination)}>
            <Card containerStyle={styles.cardStyle}>
              <Card.Title style={styles.cardTitle}>Vaccination </Card.Title>
              <Text>
                <Text style={styles.subHeading}>Granularity:</Text> State-Wise
              </Text>
              <Text>
                <Text style={styles.subHeading}>Update Interval:</Text>
                Daily
              </Text>
              <Text style={styles.subHeading}>Availability:</Text>
              <Text>Lagging By Two Days</Text>
              <Text style={styles.subHeading}>Graph Interval: </Text>
              <Text>Week-Month-Year</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(REffective)}>
            <Card containerStyle={styles.cardStyle}>
              <Card.Title style={styles.cardTitle}>REffective</Card.Title>
              <Text>
                <Text style={styles.subHeading}>Granularity:</Text> Country
              </Text>
              <Text>
                <Text style={styles.subHeading}>Update Interval:</Text>
                Daily
              </Text>
              <Text style={styles.subHeading}>Availability:</Text>
              <Text>Lagging By One Week</Text>
              <Text style={styles.subHeading}>Graph Interval: </Text>
              <Text>Week-Month-Year</Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => Linking.openURL(modalCalculation)}>
            <Card containerStyle={styles.modelCard}>
              <Card.Title style={styles.cardTitle}>
                Model Simulation Parameters
              </Card.Title>

              <View>
                <Text style={styles.subHeading}>Room:</Text>
                <Text>Size ,Ventilation and Ceiling Height</Text>
                <Text style={styles.subHeading}>People: </Text>
                <Text>People Count, Speech Volume and Duration</Text>
                <Text style={styles.subHeading}>Duration:</Text>
                <Text>Stay Duration in Room</Text>
                <Text style={styles.subHeading}>Own Behavior:</Text>
                <Text>Masks and Vaccination</Text>
                <Text style={styles.subHeading}>COVID-19 Info:</Text>
                <Text>Positive Cases and Vaccination Count</Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default dataOverview;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#eeeeee',
  },

  Heading: {
    fontWeight: 'bold',
    color: '#0087ff',
    fontSize: 16,
  },
  cardRow: {
    //flex: 1,
    flexDirection: 'row',
  },
  modelCard: {
    borderRadius: 20,
    borderColor: 'lightgrey',
    paddingBottom: 8,
  },
  cardStyle: {
    borderRadius: 20,
    width: 180,
    marginRight: 0,
    marginLeft: 10,
    borderColor: 'lightgrey',
  },
  cardTitle: {
    color: '#0087ff',
    fontSize: 15,
  },
  subHeading: {
    fontWeight: 'bold',
  },
});
