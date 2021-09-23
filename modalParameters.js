import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Card, SearchBar, Icon, Avatar} from 'react-native-elements';

import SelectDropdown from 'react-native-select-dropdown';
import InputSpinner from 'react-native-input-spinner';

export default function modelParamSelection({navigation}) {
  //to show/hide modal parameters
  const [showVaccine, setShowVaccine] = useState(false);
  const [showMasks, setShowMasks] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [showCeilingHeight, setShowCeilingHeight] = useState(false);
  const [showSpeechTime, setShowSpeechTime] = useState(false);
  const [showSpeechVolume, setShowSpeechVolume] = useState(false);

  const onPressVaccine = () => setShowVaccine(!showVaccine);
  const onPressMask = () => setShowMasks(!showMasks);
  const onPressWindow = () => setShowWindow(!showWindow);
  const onPressCeiingHeight = () => setShowCeilingHeight(!showCeilingHeight);
  const onPressSpeechTime = () => setShowSpeechTime(!showSpeechTime);
  const onPressSpeechVolume = () => setShowSpeechVolume(!showSpeechVolume);

  const eventType = [
    'Classroom',
    'Office',
    'Reception',
    'Choir',
    'Supermarket',
  ];
  const MaskEfficiencyPeople = ['Infected', 'Normal', 'Infected and Normal'];
  //var for assigning values to modal parameters
  const [selectedEventType, setSelectedEventType] = useState('Classroom');
  const [maskCateogoryPpl, setMaskCategoryPpl] = useState(0);
  const [maskEfficiencyI, setMaskEfficiencyI] = useState(0);
  const [maskEfficiencyN, setMaskEfficiencyN] = useState(0);
  const [vaccination, setVaccination] = useState(0);
  const [ventilation, setVentilation] = useState(0);
  const [speechVolume, setSpeechVolume] = useState(0);
  const [speechDuration, setSpeechDuration] = useState(0);
  const [ceilingHeight, setCeilingHeight] = useState(0);
  const [roomSize, setRoomSize] = useState(0);
  const [durationofStay, setDurationofStay] = useState(0);
  const [noOfPeople, setNoOfPeople] = useState(0);
  //set modal parameter values
  const selectedVentilation = value => setVentilation(value);
  const selectedSpeechVolume = value => setSpeechVolume(value);
  const selectedCeilingHeight = value => setCeilingHeight(value);
  const selectedVaccinatin = value => setVaccination(value);
  const selectedSpeechDuration = value => setSpeechDuration(value);
  function setValuesByEvent(selectedId) {
    if (selectedId == 'Classroom') {
      setSelectedEventType(selectedId);
      setSpeechVolume(2);
      setMaskEfficiencyI(0);
      setMaskEfficiencyN(0);
      setSpeechDuration(10);
      setVentilation(0.35);
      setRoomSize(60);
      setCeilingHeight(3);
      setDurationofStay(12);
      setNoOfPeople(24);
    } else if (selectedId == 'Office') {
      setSelectedEventType(selectedId);
      setSpeechVolume(2);
      setMaskEfficiencyI(0);
      setMaskEfficiencyN(0);
      setSpeechDuration(10);
      setVentilation(0.35);
      setRoomSize(40);
      setCeilingHeight(3);
      setDurationofStay(16);
      setNoOfPeople(4);
    } else if (selectedId == 'Reception') {
      setSelectedEventType(selectedId);
      setSpeechVolume(2);
      setMaskEfficiencyI(0);
      setMaskEfficiencyN(0);
      setSpeechDuration(25);
      setVentilation(0.35);
      setRoomSize(100);
      setCeilingHeight(4);
      setDurationofStay(3);
      setNoOfPeople(100);
    } else if (selectedId == 'Choir') {
      setSelectedEventType(selectedId);
      setSpeechVolume(5.32);
      setMaskEfficiencyI(0);
      setMaskEfficiencyN(0);
      setSpeechDuration(60);
      setVentilation(0.35);
      setRoomSize(100);
      setCeilingHeight(4);
      setDurationofStay(3);
      setNoOfPeople(25);
    } else if (selectedId == 'Supermarket') {
      setSelectedEventType(selectedId);
      setSpeechVolume(3);
      setMaskEfficiencyI(0);
      setMaskEfficiencyN(0);
      setSpeechDuration(5);
      setVentilation(4);
      setRoomSize(200);
      setCeilingHeight(4.5);
      setDurationofStay(1);
      setNoOfPeople(10);
    }
  }
  function setMaskEfficiencyPeople(selectedPeopleCategory, maskEff) {
    if (selectedPeopleCategory == 'Infected') {
      setMaskEfficiencyI(maskEff);
    } else if (selectedPeopleCategory == 'Normal') {
      setMaskEfficiencyN(maskEff);
    } else if (selectedPeopleCategory == 'Infected and Normal') {
      setMaskEfficiencyI(maskEff);
      setMaskEfficiencyN(maskEff);
    }
  }

  return (
    <View styles={styles.container}>
      <View style={styles.cardrow}>
        <SelectDropdown
          data={eventType}
          onSelect={(selectedItem, index) => {
            setValuesByEvent(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
          defaultButtonText={'Choose an Event'}
        />
        <SelectDropdown
          data={MaskEfficiencyPeople}
          onSelect={(selectedItem, index) => {
            setMaskCategoryPpl(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
          defaultButtonText={'Choose Mask For'}
        />
      </View>

      <Text style={styles.heading}>Room Properties</Text>
      <View style={styles.row}>
        <Text style={styles.subheading}>Size in sq.m</Text>
        <InputSpinner
          max={2400}
          min={10}
          step={1}
          colorMax={'#f04048'}
          colorMin={'#66ed69'}
          value={roomSize}
          onChange={num => setRoomSize(Math.round(num))}
          background={'#dedcdc'}
          showBorder={true}
          rounded={false}
          width={180}
          height={35}
          colorPress={'#48b9db'}
          colorLeft={'#367fd9'}
          colorRight={'#367fd9'}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.subheading}>Duration of Stay in hr</Text>
        <InputSpinner
          max={24}
          min={0.5}
          step={1}
          colorMax={'#f04048'}
          colorMin={'#55f440'}
          value={durationofStay}
          onChange={num => setDurationofStay(Math.round(num))}
          background={'#dedcdc'}
          showBorder={true}
          rounded={false}
          width={180}
          height={35}
          colorPress={'#48b9db'}
          colorLeft={'#367fd9'}
          colorRight={'#367fd9'}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.subheading}>Number of people</Text>
        <InputSpinner
          max={36}
          min={2}
          step={1}
          colorMax={'#f04048'}
          colorMin={'#55f440'}
          value={noOfPeople}
          onChange={num => setNoOfPeople(Math.round(num))}
          background={'#dedcdc'}
          showBorder={true}
          rounded={false}
          width={180}
          height={35}
          colorPress={'#48b9db'}
          colorLeft={'#367fd9'}
          colorRight={'#367fd9'}
        />
      </View>

      <Text style={styles.heading}>Model Parameters</Text>

      <View style={styles.cardrow}>
        <View style={styles.spaceImagesthree}>
          <TouchableOpacity
            onPress={onPressVaccine}
            style={styles.imageBground}>
            <Image
              source={require('./images/injection.png')}
              style={styles.imgDimensions}
            />
            <Text>{'\n'}Vaccine</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.spaceImages}>
          <TouchableOpacity onPress={onPressMask} style={styles.imageBground}>
            <Image
              source={require('./images/ffp2.png')}
              style={styles.imgDimensions}
            />

            <Text>{'\n'}Mask</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardrow}>
        <View style={styles.spaceImagesthree}>
          <TouchableOpacity onPress={onPressWindow} style={styles.imageBground}>
            <Image
              source={require('./images/windowicon.png')}
              style={styles.imgDimensions}
            />
            <Text>{'\n'}window</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.spaceImages}>
          <TouchableOpacity
            onPress={onPressCeiingHeight}
            style={styles.imageBground}>
            <Image
              source={require('./images/ceiling_height_icon.png')}
              style={styles.imgDimensions}
            />
            <Text>
              {'\n'}Ceiling{'\n'}Height
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spaceImages}>
          <TouchableOpacity
            onPress={onPressSpeechTime}
            style={styles.imageBground}>
            <Image
              source={require('./images/speech-bubble.png')}
              style={styles.imgDimensions}
            />
            <Text>
              {'\n'}Speech{'\n'}Time
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spaceImages}>
          <TouchableOpacity
            onPress={onPressSpeechVolume}
            style={styles.imageBground}>
            <Image
              source={require('./images/speech.png')}
              style={styles.imgDimensions}
            />
            <Text>
              {'\n'}Speech{'\n'}Volume
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showVaccine ? (
        <View style={styles.cardrow}>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedVaccinatin('None')}
              style={styles.imageBground}>
              <Image
                source={require('./images/woman.png')}
                style={styles.imgDimensionsinSubset}
              />
            </TouchableOpacity>
            <Text>None</Text>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedVaccinatin('Everyone')}
              style={styles.imageBground}>
              <Image
                source={require('./images/crowd.png')}
                style={styles.imgDimensionsinSubset}
              />
            </TouchableOpacity>
            <Text>Everyone</Text>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedVaccinatin('Individual')}
              style={styles.imageBground}>
              <Image
                source={require('./images/peoplevaccinated.png')}
                style={styles.imgDimensionsinSubset}
              />
            </TouchableOpacity>
            <Text>Individual</Text>
          </View>
        </View>
      ) : null}
      {showMasks ? (
        <View style={styles.cardrow}>
          <View style={styles.spaceImagesinSubset}>
            <Avatar
              size={58}
              rounded
              activeOpacity={0.3}
              source={require('./images/ffp2.png')}
              overlayContainerStyle={{backgroundColor: '#72bcd4'}}
              onPress={() => setMaskEfficiencyPeople(maskCateogoryPpl, 0.7)}
              resizeMode={'contain'}
            />
            <Text>0.7</Text>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <Avatar
              size={58}
              rounded
              activeOpacity={0.3}
              source={require('./images/mask_normal.png')}
              overlayContainerStyle={{backgroundColor: '#72bcd4'}}
              onPress={() => setMaskEfficiencyPeople(maskCateogoryPpl, 0.5)}
              resizeMode={'contain'}
            />
            <Text>0.5</Text>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <Avatar
              size={58}
              rounded
              activeOpacity={0.3}
              source={require('./images/cloth-mask.png')}
              overlayContainerStyle={{backgroundColor: '#72bcd4'}}
              onPress={() => setMaskEfficiencyPeople(maskCateogoryPpl, 0.2)}
              resizeMode={'contain'}
            />
            <Text>0.2</Text>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <Avatar
              size={58}
              rounded
              activeOpacity={0.3}
              source={require('./images/no-mask.png')}
              overlayContainerStyle={{backgroundColor: '#72bcd4'}}
              onPress={() => setMaskEfficiencyPeople(maskCateogoryPpl, 0)}
              resizeMode={'contain'}
            />
            <Text>0</Text>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity onPress={onPressMask} style={styles.imageBground}>
              <Image
                source={require('./images/mask_human.png')}
                style={styles.imgDimensionsinSubset}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity onPress={onPressMask} style={styles.imageBground}>
              <Image
                source={require('./images/crowdmask.png')}
                style={styles.imgDimensionsinSubset}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedMaskEfficiency(0.7)}
              style={styles.imageBground}>
              <Image
                source={require('./images/ffp2.png')}
                style={styles.imgDimensionsinSubset}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedMaskEfficiency(0.5)}
              style={styles.imageBground}>
              <Image
                source={require('./images/mask_normal.png')}
                style={styles.imgDimensionsinSubset}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedMaskEfficiency(0.2)}
              style={styles.imageBground}>
              <Image
                source={require('./images/cloth-mask.png')}
                style={styles.imgDimensionsinSubset}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedMaskEfficiency(0)}
              style={styles.imageBground}>
              <Image
                source={require('./images/no-mask.png')}
                style={styles.imgDimensionsinSubset}
              />
            </TouchableOpacity>
          </View>
          <Avatar
            size={58}
            rounded
            activeOpacity={0.3}
            source={require('./images/ffp2.png')}
            imageProps={styles.imgDimensions}
            overlayContainerStyle={{backgroundColor: '#72bcd4'}}
            onPress={onPressMask}
            resizeMode={'contain'}
          />
        </View>
      ) : null}
      {showWindow ? (
        <View style={styles.cardrow}>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedVentilation(0.35)}
              style={styles.imageBground}>
              <Image
                source={require('./images/window_closed.png')}
                style={styles.imgDimensionsinSubset}
              />
              <Text>{'\n'}0.35</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity style={styles.imageBground}>
              <Image
                source={require('./images/window_crackedopen.png')}
                style={styles.imgDimensionsinSubset}
              />
              <Text>{'\n'}0</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedVentilation(2.0)}
              style={styles.imageBground}>
              <Image
                source={require('./images/window_fullopen.png')}
                style={styles.imgDimensionsinSubset}
              />
              <Text>{'\n'}2</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedVentilation(6.0)}
              style={styles.imageBground}>
              <Image
                source={require('./images/ventilation.png')}
                style={styles.imgDimensionsinSubset}
              />
              <Text>{'\n'}6</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {showCeilingHeight ? (
        <View style={styles.cardrow}>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedCeilingHeight(2.2)}
              style={styles.imageBground}>
              <Image
                source={require('./images/height.png')}
                style={styles.imgDimensions}
              />
              <Text>{'\n'}2.2 m</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedCeilingHeight(2.4)}
              style={styles.imageBground}>
              <Image
                source={require('./images/height.png')}
                style={styles.imgDimensions}
              />
              <Text>{'\n'}2.4 m</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedCeilingHeight(3.3)}
              style={styles.imageBground}>
              <Image
                source={require('./images/height.png')}
                style={styles.imgDimensions}
              />
              <Text>{'\n'}3.3 m</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedCeilingHeight(5)}
              style={styles.imageBground}>
              <Image
                source={require('./images/height.png')}
                style={styles.imgDimensions}
              />
              <Text>{'\n'}5 m</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {showSpeechTime ? (
        <View style={styles.cardrow}>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedSpeechDuration(0)}
              style={styles.imageBground}>
              <Image
                source={require('./images/00Time.png')}
                style={styles.imgDimensionsinSubset}
              />
              <Text>{'\n'}None</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedSpeechDuration(25)}
              style={styles.imageBground}>
              <Image
                source={require('./images/15mintime.png')}
                style={styles.imgDimensionsinSubset}
              />
              <Text>{'\n'}25 %</Text>
              <Text>{'\n'}1:15 hr</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedSpeechDuration(50)}
              style={styles.imageBground}>
              <Image
                source={require('./images/30mintime.png')}
                style={styles.imgDimensionsinSubset}
              />
              <Text>{'\n'}50 %</Text>
              <Text>{'\n'}2:30 hr</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedSpeechDuration(90)}
              style={styles.imageBground}>
              <Image
                source={require('./images/00Time.png')}
                style={styles.imgDimensionsinSubset}
              />
              <Text>{'\n'}90 %</Text>
              <Text>{'\n'}4:30 hr</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {showSpeechVolume ? (
        <View style={styles.cardrow}>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedSpeechVolume(1)}
              style={styles.imageBground}>
              <Image
                source={require('./images/volume-quiet.png')}
                style={styles.imgDimensions}
              />
              <Text>{'\n'}1</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedSpeechVolume(2)}
              style={styles.imageBground}>
              <Image
                source={require('./images/volume-low.png')}
                style={styles.imgDimensions}
              />
              <Text>{'\n'}2</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedSpeechVolume(3)}
              style={styles.imageBground}>
              <Image
                source={require('./images/volume-medium.png')}
                style={styles.imgDimensions}
              />
              <Text>{'\n'}3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesinSubset}>
            <TouchableOpacity
              onPress={() => selectedSpeechVolume(4)}
              style={styles.imageBground}>
              <Image
                source={require('./images/volume-high.png')}
                style={styles.imgDimensions}
              />
              <Text>{'\n'}4</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <View style={styles.buttonStyle}>
        <Button
          title="Start Simulation"
          color="#2C76F0"
          onPress={() => {
            navigation.navigate('Simulation', {
              selectedeventType: selectedEventType,
              maskForCategory: maskCateogoryPpl,

              roomSize: roomSize,

              durationOfStay: durationofStay,

              noOfPeople: noOfPeople,

              maskEfficiencyInfected: maskEfficiencyI,

              maskEfficiencyNormal: maskEfficiencyN,
              vaccine: vaccination,

              ventilation: ventilation,

              ceilingHeight: ceilingHeight,

              speechDuration: speechDuration,

              speechVolume: speechVolume,
            });
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },

  dropdown: {
    height: 150,
    width: 150,
    flexDirection: 'row',
  },
  dropdownRow: {
    height: 35,
    width: 180,
  },
  dropdownRowText: {fontSize: 18},
  dropdownButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    backgroundColor: '#d9dbde',
    height: 40,
    width: 180,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    margin: 7,
    flexDirection: 'row',
  },
  dropdownButtonText: {
    fontSize: 18,
  },

  heading: {
    //paddingTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkblue',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardStyle: {
    marginTop: 20,

    paddingTop: 20,
    height: 450,
    width: 350,
  },
  row: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 20,
    textAlign: 'center',

    alignItems: 'center',
  },
  searchBarStyle: {
    // backgroundColor: 'white',
    marginLeft: 0,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  inputStyle: {
    // backgroundColor: '#c9c9c9',
    width: 249,
    height: 40,

    color: 'black',
  },
  /*  container: {
    height: 60,
  }, */
  itemStyle: {
    marginLeft: 15,
    padding: 5,
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
  cardstyle: {
    borderRadius: 20,
    width: 280,

    marginLeft: 55,
    borderColor: 'lightgrey',
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardrow: {
    flexDirection: 'row',
    paddingTop: 30,
    //justifyContent: 'space-around',
  },
  columns: {
    flexDirection: 'column',
  },
  modelCard: {
    borderRadius: 20,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconRow: {
    flexDirection: 'row',
  },
  imgDimensions: {
    width: 50,
    height: 50,
    //paddingLeft: 10,
  },
  spaceImages: {
    flexDirection: 'row',
    paddingLeft: 10,
    //paddingRight: 8,
    padding: 10,
  },
  spaceImagesthree: {
    flexDirection: 'row',
    //paddingTop: 6,
    paddingLeft: 10,
    padding: 10,
  },
  spaceText: {
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 25,
  },
  spaceImagesinSubset: {
    paddingTop: 30,
    paddingLeft: 10,
    //paddingRight: 8,
    alignContent: 'center',
    alignItems: 'center',
  },
  circletag: {
    // display: block,
    width: 70,
    height: 70,
    // backgroundColor: '#add8e6',
    //textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
  },
  img: {
    height: 100,
    width: 100,
    width: 50,
    height: 50,
  },
  imgDimensionsinSubset: {
    /*  maxHeight: 100,
    maxWidth: 100, */
    width: 40,
    height: 40,
    //padding: 10,
  },
  ceilingHeightstd: {
    width: 40,
    height: 45,
    paddingLeft: 20,
  },
  ceilingHeightHigh: {
    width: 40,
    height: 55,
    paddingLeft: 20,
  },
  ceilingHeightAudi: {
    width: 40,
    height: 65,
    paddingLeft: 20,
  },
  imageBground: {
    backgroundColor: '#add8e6',
    borderRadius: 50,
    width: 70,
    height: 70,
    //textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imgBgroundonclick: {
    backgroundColor: '#72bcd4',
    borderRadius: 50,
    width: 70,
    height: 70,
    //textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  IconsText: {
    textAlign: 'center',
    paddingLeft: 10,
    paddingTop: 5,
  },
  btncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  btn: {
    //backgroundColor: '#2C76F0',
    width: 150,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    padding: 10,
  },
  btntxt: {
    color: '#ffffff',
  },
  buttonStyle: {
    paddingTop: 70,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
