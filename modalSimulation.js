import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';

//import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';
import BouncingBalls from 'react-native-bouncing-ball';

//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';

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
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);
  const [collapsedInfectedPerson, setCollapsedInfectedPerson] = useState(true);
  const [collapsedRoomProp, setCollapsedRoomProp] = useState(true);
  const [collapsedEventDetails, setCollapsedEventDetails] = useState(true);
  const [showNoneVaccine, setShowNoneVaccine] = useState(false);
  const [showIndiviVaccine, setShowIndiviVaccine] = useState(false);
  const [showEveryoneVaccine, setShowEveryoneVaccine] = useState(false);
  const [showPeopleCount, setShowPeopleCount] = useState(false);

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={(styles.title, textColor)}>{item.title}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setValuesByEvent(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

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

  //function riskInfection(vaccine, Rpercentage) {
  function riskInfection(Rpercentage) {
    /* if (Rpercentage > 50) {
      setShowPeopleCount(!showPeopleCount);
    } */
    if (vaccine == 'None') {
      setShowNoneVaccine(!showNoneVaccine);
    } else if (vaccine == 'Individual') {
      setShowIndiviVaccine(!showIndiviVaccine);
    } else if (vaccine == 'Everyone') {
      setShowEveryoneVaccine(!showEveryoneVaccine);
    }
  }
  //riskInfection();
  const Ripercentage = (1 - ri) * 100;

  const Rpercentage = (1 - r) * 100;
  const virus = parseInt(Rpercentage.toFixed(0));
  const CONTENT = [
    {
      title: 'Characteristics of infected person',
      content:
        'Speech volume - ' +
        {speechVolume} +
        'Mask efficiency of infected person - ' +
        {maskEfficiencyInfected} +
        'Speech Duration - ' +
        {speechDuration} +
        'Respiratory volume - 10',
    },
    {
      title: 'Room properties',
      content:
        ' Ventilation - ' +
        {ventilation} +
        'Room size - ' +
        {roomSize} +
        'Ceiling Height - ' +
        {ceilingHeight},
    },
    {
      title: 'Event details',
      content:
        'Duration of stay' +
        {durationOfStay} +
        'Mask efficiency of normal person' +
        {maskEfficiencyNormal} +
        'Number of people' +
        {noOfPeople},
    },
  ];
  const SELECTORS = [
    {title: 'Characteristics of infected person', value: 0},
    {title: 'Room properties', value: 1},
    {title: 'Event details', value: 2},
    {title: 'Reset all'},
  ];
  const toggleParams = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
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
  const setSections = sections => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{textAlign: 'center'}}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleParams}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Modal properties</Text>
        </View>
      </TouchableOpacity>
      <Collapsible align="center" collapsed={collapsed}>
        <TouchableOpacity onPress={toggleExpandedInfectedPerson}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Characteristics of infected person
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleExpandedRoomProp}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Room properties</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleExpandedEventDetails}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Event details</Text>
            {/*Heading of Single Collapsible*/}
          </View>
        </TouchableOpacity>
      </Collapsible>
      <Collapsible collapsed={collapsedInfectedPerson} align="center">
        <View style={styles.content}>
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
      </Collapsible>
      <Collapsible collapsed={collapsedRoomProp} align="center">
        <View style={styles.content}>
          <Text style={styles.modalPropertiesHeading}>Room properties</Text>
          <Text style={styles.modalProperties}>
            Ventilation - {ventilation}
            {'\n'}
            Room size - {roomSize}
            {'\n'}
            Ceiling Height - {ceilingHeight}
          </Text>
        </View>
      </Collapsible>
      <Collapsible collapsed={collapsedEventDetails} align="center">
        <View style={styles.content}>
          <Text style={styles.modalPropertiesHeading}>Event details</Text>

          <Text style={styles.modalProperties}>
            Duration of stay - {durationOfStay}
            {'\n'}
            Mask efficiency of normal person - {maskEfficiencyNormal}
            {'\n'}
            Number of people - {noOfPeople}
          </Text>
        </View>
      </Collapsible>
      <View style={styles.buttonStyle}>
        <Button
          title="Risk Infection"
          color="#2C76F0"
          onPress={() => {
            riskInfection();
            // riskInfection(vaccine, Rpercentage);
          }}
        />
      </View>

      {/*  <Accordion
        activeSections={activeSections}
        //for any default active section
     
    
      {/*  <Text>Event type {selectedeventType}</Text>
      <Text>Masks worn by {maskForCategory} people</Text>
      <Text>{vaccine}</Text>
      <Text>none{showNoneVaccine}</Text>
      <Text>indivi{showIndiviVaccine}</Text>
      <Text>everyone{showEveryoneVaccine}</Text> */}

      {showNoneVaccine ? (
        <View>
          <Text style={styles.RiskInfText}>
            Ri- individual infection risk if one person is infectious
          </Text>
          <Text style={styles.RiskInf}>{Ripercentage.toFixed(1)}%</Text>

          <Text style={styles.RiskInfText}>
            R- probability that at least one susceptible person gets infected
          </Text>
          <Text style={styles.RiskInf}>{Rpercentage.toFixed(1)} %</Text>
        </View>
      ) : null}
      {showIndiviVaccine ? (
        <View>
          <Text style={styles.RiskInfText}>
            Ri- individual infection risk if one person is infectious
          </Text>
          <Text style={styles.RiskInf}>
            {' '}
            lesser than {Ripercentage.toFixed(1)} %
          </Text>

          <Text style={styles.RiskInfText}>
            R- probability that at least one susceptible person gets infected
          </Text>
          <Text style={styles.RiskInf}>{Rpercentage.toFixed(1)} %</Text>
        </View>
      ) : null}
      {showEveryoneVaccine ? (
        <View>
          <Text style={styles.RiskInfText}>
            Ri- individual infection risk if one person is infectious
          </Text>
          <Text style={styles.RiskInf}>
            {' '}
            lesser than {Ripercentage.toFixed(1)} %
          </Text>

          <Text style={styles.RiskInfText}>
            R- probability that at least one susceptible person gets infected
          </Text>
          <Text style={styles.RiskInf}>
            lesser than {Rpercentage.toFixed(1)} %
          </Text>
        </View>
      ) : null}
      {/*  {showPeopleCount ? (
        <View>
          <Text style={styles.RiskInfText}>
            Number of people in room should be less than
          </Text>
          <Text style={styles.RiskInf}> {noOfPeople}</Text>
        </View>
      ) : null} */}
      {/*  <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      <Text>{ventilationandviruslftimeaerosol}</Text>
      <Text>
        Ri(%) individual infection risk if one person is infectious
        {Ripercentage}%
      </Text>
      <Text></Text>
      <Text>
        R(%) probability that at least one susceptible person gets infected
        {Rpercentage} %
      </Text> */}
      <ImageBackground style={styles.container}>
        <BouncingBalls
          amount={virus}
          animationDuration={10000}
          minSpeed={30}
          maxSpeed={50}
          minSize={5}
          maxSize={5}
          imageBall={require('./images/corona_virus.png')}
        />
        <BouncingBalls
          amount={noofpplinsimulation}
          animationDuration={10000}
          minSpeed={10}
          maxSpeed={30}
          minSize={20}
          maxSize={20}
          imageBall={require('./images/man.png')}
        />
        {/*  <BouncingBalls
          amount={50}
          animationDuration={100000}
          minSpeed={10}
          maxSpeed={30}
          minSize={20}
          maxSize={20}
          imageBall={require('./images/woman1.png')}
        /> */}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingTop: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  RiskInf: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    paddingLeft: 10,
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
    borderWidth: 1,
    borderColor: '#ffff',
    borderRadius: 25,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  content: {
    backgroundColor: '#ffff',
    borderColor: 'black',
    borderWidth: 1,
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
  },
  modalProperties: {
    fontSize: 16,
    textAlign: 'center',
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
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
