import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ImageBackground,
  Modal,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';

import {Icon, Card} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import BouncingBalls from 'react-native-bouncing-ball';

export default function Simulation({route}) {
  const {
    selectedeventType,
    maskForCategory,
    roomSize,
    durationOfStay,
    noOfPeople,
    maskEfficiencyInfected,
    maskEfficiencyNormal,
    vaccine,
    ventilation,
    ceilingHeight,
    speechDuration,
    speechVolume,
  } = route.params;

  const [selectedId, setSelectedId] = useState(null);
  const [activeSections, setActiveSections] = useState([]);
  //modal
  const [modalVisibleIP, setModalVisibleIP] = useState(false);
  const [modalVisibleRP, setModalVisibleRP] = useState(false);
  const [modalVisibleED, setModalVisibleED] = useState(false);
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);
  const [showRiskInfo, setShowRiskInfo] = useState(true);
  const [collapsedInfectedPerson, setCollapsedInfectedPerson] = useState(true);
  const [collapsedRoomProp, setCollapsedRoomProp] = useState(true);
  const [collapsedEventDetails, setCollapsedEventDetails] = useState(true);
  const [showNoneVaccine, setShowNoneVaccine] = useState(true);
  const [showIndiviVaccine, setShowIndiviVaccine] = useState(false);
  const [showEveryoneVaccine, setShowEveryoneVaccine] = useState(false);
  const [showPeopleCount, setShowPeopleCount] = useState(false);

  //constant values
  const Depositionprobability = 0.5;
  const respiratoryrate = 10;
  const RNAContentAerosol = 0.0327;
  const conc_b = 0.06;
  const conc_s = 0.6;

  //formulas
  const speechFraction = speechDuration / 100;
  const sf = 1 - speechFraction;
  const speechVolCal = Math.pow(2, speechVolume - 2);
  const Aerosolemission1 = conc_b * sf + conc_s * speechFraction * speechVolCal;
  const Aerosolemission2 = 1000 * 10 * 60 * (1 - maskEfficiencyInfected);
  const Aerosolemission = Aerosolemission1 * Aerosolemission2;

  const roomparam = roomSize * ceilingHeight * 1000;
  const Aerosolconc = Aerosolemission / roomparam;
  const RNAContentAerosolconc = Aerosolconc * RNAContentAerosol;
  const RNADosis =
    respiratoryrate * 60 * RNAContentAerosolconc * Depositionprobability;
  const ventilationandviruslftimeaerosol = ventilation + 0.5882;
  const Depisode = RNADosis / ventilationandviruslftimeaerosol;
  const dosishrs = 1 - maskEfficiencyNormal;
  const depisodehrs = Depisode * dosishrs;
  const Dosisinfepisodehrs = depisodehrs * durationOfStay;
  const Depisoden = Dosisinfepisodehrs * noOfPeople;
  const noofpplinsimulation = parseInt(noOfPeople);
  let exponent = Dosisinfepisodehrs;
  let number = 0.9978;
  let ri = Math.pow(number, exponent);
  let r = Math.pow(number, Depisoden);

  function RiskInfection() {
    /*if (vaccine == 'None') {
     setShowNoneVaccine(!showNoneVaccine);
    }else if (vaccine == 'Individual') {
      setShowIndiviVaccine(!showIndiviVaccine);
    } else if (vaccine == 'Everyone') {
      setShowEveryoneVaccine(!showEveryoneVaccine);
    } */
    return (
      <View>
        <Card containerStyle={styles.cardContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.RiskInfText}>Risk Infection </Text>
            <TouchableOpacity onPress={toggleRiskInfo}>
              <Icon
                name="information"
                type="material-community"
                color="#ED471C"
              />
            </TouchableOpacity>
          </View>
          {showNoneVaccine ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.RiskInfText}>
                Ri -{' '}
                <Text style={styles.RiskInf}>{Ripercentage.toFixed(1)}%</Text> R
                - <Text style={styles.RiskInf}>{Rpercentage.toFixed(1)} %</Text>{' '}
              </Text>
            </View>
          ) : null}
          {showIndiviVaccine ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.RiskInfText}>
                Ri -{' '}
                <Text style={styles.RiskInf}>{Ripercentage.toFixed(1)}%</Text> R
                - <Text style={styles.RiskInf}>{Rpercentage.toFixed(1)} %</Text>{' '}
              </Text>
            </View>
          ) : null}
          {showEveryoneVaccine ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.RiskInfText}>
                Ri -{' '}
                <Text style={styles.RiskInf}>{Ripercentage.toFixed(1)}%</Text> R
                - <Text style={styles.RiskInf}>{Rpercentage.toFixed(1)} %</Text>{' '}
              </Text>
            </View>
          ) : null}
          {riskInfo()}
        </Card>
      </View>
    );
  }
  const Ripercentage = (1 - ri) * 100;
  const Rpercentage = (1 - r) * 100;
  const virus = parseInt(Rpercentage.toFixed(0));

  const toggleParams = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };
  const toggleRiskInfo = () => {
    //Toggling the state of single Collapsible
    setShowRiskInfo(!showRiskInfo);
  };
  const toggleExpandedInfectedPerson = () => {
    //Toggling the state of single Collapsible
    setCollapsedInfectedPerson(!collapsedInfectedPerson);
  };
  const toggleExpandedRoomProp = () => {
    //Toggling the state of single Collapsible
    setCollapsedRoomProp(!collapsedRoomProp);
  };
  const toggleExpandedEventDetails = () => {
    //Toggling the state of single Collapsible
    setCollapsedEventDetails(!collapsedEventDetails);
  };
  function riskInfo() {
    return (
      <View>
        <Collapsible collapsed={showRiskInfo}>
          <Text style={styles.RiskInfText}>
            Ri-
            <Text style={{color: 'black'}}>
              individual infection risk if one person is infectious {'\n'}
            </Text>
            R-
            <Text style={{color: 'black'}}>
              probability that at least one susceptible person gets infected
            </Text>{' '}
          </Text>
        </Collapsible>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={toggleParams}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Modal properties</Text>
        </View>
      </TouchableOpacity>
      <Collapsible align="center" collapsed={collapsed}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <TouchableOpacity onPress={() => setModalVisibleIP(true)}>
              <View style={styles.modalProps}>
                <Text style={styles.headerText}>Infected person</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => setModalVisibleRP(true)}>
              <View style={styles.modalProps}>
                <Text style={styles.headerText}>Room properties</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => setModalVisibleED(true)}>
              <View style={styles.modalProps}>
                <Text style={styles.headerText}>Event details</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleIP}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisibleIP(!modalVisibleIP);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                <View style={styles.content}>
                  <View style={styles.cardImgContainer}>
                    <Image
                      source={require('./images/sick-boy-covid-infected.png')}
                      style={styles.imgDimensions}
                    />
                  </View>

                  <Text style={styles.modalPropertiesHeading}>
                    Characteristics of infected person
                  </Text>
                  <Text style={styles.modalProperties}>
                    Speech volume - {speechVolume}
                    {'\n'}
                    Mask efficiency - {maskEfficiencyInfected}
                    {'\n'}
                    Speech Duration - {speechDuration} {'\n'}
                    Respiratory volume - 10
                  </Text>
                </View>
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisibleIP(!modalVisibleIP)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleRP}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisibleRP(!modalVisibleRP);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                <View style={styles.content}>
                  <View style={styles.cardImgContainer}>
                    <Image
                      source={require('./images/door.png')}
                      style={styles.imgDimensions}
                    />
                  </View>

                  <Text style={styles.modalPropertiesHeading}>
                    Room properties
                  </Text>
                  <Text style={styles.modalProperties}>
                    Ventilation - {ventilation}
                    {'\n'}
                    Room size - {roomSize}
                    {'\n'}
                    Ceiling Height - {ceilingHeight}
                  </Text>
                </View>
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisibleRP(!modalVisibleRP)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleED}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisibleED(!modalVisibleED);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                <View style={styles.content}>
                  <View style={styles.cardImgContainer}>
                    <Image
                      source={require('./images/peopleingroup.png')}
                      style={styles.imgDimensions}
                    />
                  </View>

                  <Text style={styles.modalPropertiesHeading}>
                    Event details
                  </Text>

                  <Text style={styles.modalProperties}>
                    Duration of stay - {durationOfStay}
                    {'\n'}
                    Mask efficiency of normal person - {maskEfficiencyNormal}
                    {'\n'}
                    Number of people - {noOfPeople}
                  </Text>
                </View>
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisibleED(!modalVisibleED)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Collapsible>

      {RiskInfection()}

      <ImageBackground style={styles.simulationContainer}>
        <BouncingBalls
          amount={virus}
          animationDuration={5000}
          minSpeed={30}
          maxSpeed={40}
          minSize={5}
          maxSize={5}
          imageBall={require('./images/corona_virus.png')}
        />
        <BouncingBalls
          amount={noofpplinsimulation}
          animationDuration={5000}
          minSpeed={30}
          maxSpeed={40}
          minSize={20}
          maxSize={20}
          imageBall={require('./images/man.png')}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingTop: 10,
  },
  cardContainer: {
    borderRadius: 10,
    width: 375,
  },
  simulationContainer: {
    backgroundColor: '#ffff',
    flex: 1,
  },
  imgDimensions: {
    width: 50,
    height: 50,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonStyle: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  RiskInfText: {
    fontSize: 17,
    fontWeight: 'bold',
    padding: 2,
    textAlign: 'left',
    color: '#1C6BED',
  },
  RiskInf: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ED471C',
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#dbdbdb',
    padding: 10,
    marginLeft: 5,
    //width: 380,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffff',
    borderRadius: 20,
  },
  cardImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalProps: {
    padding: 10,
    marginLeft: 5,
    paddingLeft: 5,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    //backgroundColor: '#ffff',
    // borderColor: 'black',
    //borderWidth: 1,
    borderRadius: 25,
    marginTop: 5,

    justifyContent: 'center',
    width: 370,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  modalPropertiesHeading: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  modalProperties: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  modalView: {
    margin: 40,
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
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
