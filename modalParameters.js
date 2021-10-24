import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
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

  const showHideParameters = selectedValue => {
    if (selectedValue == 'vaccine') {
      setShowVaccine(!showVaccine);
      setShowMasks(false);
      setShowWindow(false);
      setShowCeilingHeight(false);
      setShowSpeechTime(false);
      setShowSpeechVolume(false);
    } else if (selectedValue == 'mask') {
      setShowMasks(!showMasks);
      setShowVaccine(false);
      setShowWindow(false);
      setShowCeilingHeight(false);
      setShowSpeechTime(false);
      setShowSpeechVolume(false);
    } else if (selectedValue == 'window') {
      setShowWindow(!showWindow);
      setShowMasks(false);
      setShowVaccine(false);
      setShowCeilingHeight(false);
      setShowSpeechTime(false);
      setShowSpeechVolume(false);
    } else if (selectedValue == 'ceilingHeight') {
      setShowCeilingHeight(!showCeilingHeight);
      setShowWindow(false);
      setShowMasks(false);
      setShowVaccine(false);
      setShowSpeechTime(false);
      setShowSpeechVolume(false);
    } else if (selectedValue == 'speechTime') {
      setShowSpeechTime(!showSpeechTime);
      setShowCeilingHeight(false);
      setShowWindow(false);
      setShowMasks(false);
      setShowVaccine(false);
      setShowSpeechVolume(false);
    } else {
      setShowSpeechVolume(!showSpeechVolume);
      setShowSpeechTime(false);
      setShowCeilingHeight(false);
      setShowWindow(false);
      setShowMasks(false);
      setShowVaccine(false);
    }
  };
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
  const [vaccination, setVaccination] = useState('None');
  const [ventilation, setVentilation] = useState(0);
  const [speechVolume, setSpeechVolume] = useState(0);
  const [speechDuration, setSpeechDuration] = useState(0);
  const [ceilingHeight, setCeilingHeight] = useState(2.2);
  const [roomSize, setRoomSize] = useState(10);
  const [durationofStay, setDurationofStay] = useState(1);
  const [noOfPeople, setNoOfPeople] = useState(2);

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
      <ScrollView>
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
            showBorder
            rounded={false}
            width={180}
            height={35}
            colorPress={'#48b9db'}
            colorLeft={'#367fd9'}
            colorRight={'#367fd9'}
            selectTextOnFocus={true}
            editable
            onMax={() => {
              alert('Maximum value is reached!');
            }}
            onMin={() => {
              alert('Minimum value is  reached!');
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subheading}>Duration of Stay in hr</Text>
          <InputSpinner
            max={24}
            min={1}
            step={0.5}
            colorMax={'#f04048'}
            colorMin={'#55f440'}
            value={durationofStay}
            onChange={num => setDurationofStay(Math.round(num))}
            background={'#dedcdc'}
            showBorder
            rounded={false}
            width={180}
            height={35}
            colorPress={'#48b9db'}
            colorLeft={'#367fd9'}
            colorRight={'#367fd9'}
            editable
            onMax={() => {
              alert('Maximum value is reached!');
            }}
            onMin={() => {
              alert('Minimum value is  reached!');
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subheading}>Number of people</Text>
          <InputSpinner
            max={60}
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
            editable
            onMax={() => {
              alert('Maximum value is reached!');
            }}
            onMin={() => {
              alert('Minimum value is  reached!');
            }}
          />
        </View>

        <Text style={styles.heading}>Model Parameters</Text>

        <View style={styles.cardrow}>
          <View style={styles.spaceImagesthree}>
            <TouchableOpacity
              onPress={() => showHideParameters('vaccine')}
              style={[styles.imageBground]}>
              <Image
                source={require('./images/injection.png')}
                style={styles.imgDimensions}
              />
              <Text style={styles.textStyle}>{'\n'}Vaccine</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesthree}>
            <TouchableOpacity
              onPress={() => showHideParameters('mask')}
              style={styles.imageBground}>
              <Image
                source={require('./images/ffp2.png')}
                style={styles.imgDimensions}
              />

              <Text style={styles.textStyle}>{'\n'}Mask</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceImagesthree}>
            <TouchableOpacity
              onPress={() => showHideParameters('window')}
              style={styles.imageBground}>
              <Image
                source={require('./images/windowicon.png')}
                style={styles.imgDimensions}
              />
              <Text style={styles.textStyle}>{'\n'}window</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardrow}>
          <View style={styles.spaceImagesthree}>
            <TouchableOpacity
              onPress={() => showHideParameters('ceilingHeight')}
              style={styles.imageBground}>
              <Image
                source={require('./images/ceiling_height_icon.png')}
                style={styles.imgDimensions}
              />
              <Text style={styles.textStyle}>
                {'\n'}Ceiling{'\n'}Height
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.spaceImagesthree}>
            <TouchableOpacity
              onPress={() => showHideParameters('speechTime')}
              style={styles.imageBground}>
              <Image
                source={require('./images/speech-bubble.png')}
                style={styles.imgDimensions}
              />
              <Text style={styles.textStyle}>
                {'\n'}Speech{'\n'}Time
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.spaceImagesthree}>
            <TouchableOpacity
              onPress={() => showHideParameters('speechVolume')}
              style={styles.imageBground}>
              <Image
                source={require('./images/speech.png')}
                style={styles.imgDimensions}
              />
              <Text style={styles.textStyle}>
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
              <Text style={styles.textStyle}>None</Text>
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
              <Text style={styles.textStyle}>Everyone</Text>
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
              <Text style={styles.textStyle}>Individual</Text>
            </View>
          </View>
        ) : null}
        {showMasks ? (
          <View style={styles.cardrow}>
            <View style={styles.spaceImagesinSubset}>
              <TouchableOpacity
                onPress={() => setMaskEfficiencyPeople(maskCateogoryPpl, 0.7)}
                style={styles.imageBground}>
                <Image
                  source={require('./images/ffp2.png')}
                  style={styles.imgDimensionsinSubset}
                />
              </TouchableOpacity>
              <Text style={styles.textStyle}>FFP2 Mask</Text>
            </View>
            <View style={styles.spaceImagesinSubset}>
              <TouchableOpacity
                onPress={() => setMaskEfficiencyPeople(maskCateogoryPpl, 0.5)}
                style={styles.imageBground}>
                <Image
                  source={require('./images/mask_normal.png')}
                  style={styles.imgDimensionsinSubset}
                />
              </TouchableOpacity>
              <Text style={styles.textStyle}>Surgical Mask</Text>
            </View>
            <View style={styles.spaceImagesinSubset}>
              <TouchableOpacity
                onPress={() => setMaskEfficiencyPeople(maskCateogoryPpl, 0.2)}
                style={styles.imageBground}>
                <Image
                  source={require('./images/cloth-mask.png')}
                  style={styles.imgDimensionsinSubset}
                />
              </TouchableOpacity>
              <Text style={styles.textStyle}>Cloth Mask</Text>
            </View>
            <View style={styles.spaceImagesinSubset}>
              <TouchableOpacity
                onPress={() => setMaskEfficiencyPeople(maskCateogoryPpl, 0)}
                style={styles.imageBground}>
                <Image
                  source={require('./images/no-mask.png')}
                  style={styles.imgDimensionsinSubset}
                />
              </TouchableOpacity>
              <Text style={styles.textStyle}>No Mask</Text>
            </View>
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
              </TouchableOpacity>
              <Text style={styles.textStyle}>No{'\n'}Ventilation</Text>
            </View>
            <View style={styles.spaceImagesinSubset}>
              <TouchableOpacity style={styles.imageBground}>
                <Image
                  source={require('./images/window_crackedopen.png')}
                  style={styles.imgDimensionsinSubset}
                />
              </TouchableOpacity>
              <Text style={styles.textStyle}>Cracked{'\n'}Open</Text>
            </View>

            <View style={styles.spaceImagesinSubset}>
              <TouchableOpacity
                onPress={() => selectedVentilation(2.0)}
                style={styles.imageBground}>
                <Image
                  source={require('./images/window_fullopen.png')}
                  style={styles.imgDimensionsinSubset}
                />
              </TouchableOpacity>
              <Text style={styles.textStyle}> Burst{'\n'}Ventilation</Text>
            </View>

            <View style={styles.spaceImagesinSubset}>
              <TouchableOpacity
                onPress={() => selectedVentilation(6.0)}
                style={styles.imageBground}>
                <Image
                  source={require('./images/ventilation.png')}
                  style={styles.imgDimensionsinSubset}
                />
              </TouchableOpacity>
              <Text style={styles.textStyle}>Ventilation{'\n'}System</Text>
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
                <Text style={styles.textStyle}>{'\n'}2.2 m</Text>
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
                <Text style={styles.textStyle}>{'\n'}2.4 m</Text>
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
                <Text style={styles.textStyle}>{'\n'}3.3 m</Text>
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
                <Text style={styles.textStyle}>{'\n'}5 m</Text>
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
                <Text style={styles.textStyle}>{'\n'}None</Text>
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
                <Text style={styles.textStyle}>{'\n'}25 %</Text>
                <Text style={styles.textStyle}>1:15 hr</Text>
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
                <Text style={styles.textStyle}>{'\n'}50 %</Text>
                <Text style={styles.textStyle}>2:30 hr</Text>
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
                <Text style={styles.textStyle}>{'\n'}90 %</Text>
                <Text style={styles.textStyle}>4:30 hr</Text>
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
                <Text style={styles.textStyle}>{'\n'}Quiet</Text>
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
                <Text style={styles.textStyle}>{'\n'}Normal</Text>
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
                <Text style={styles.textStyle}>{'\n'}Loud</Text>
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
                <Text style={styles.textStyle}>{'\n'}Yelling</Text>
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
      </ScrollView>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkblue',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textStyle: {color: 'black'},
  row: {
    paddingTop: 15,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 20,
    textAlign: 'center',
    alignItems: 'center',
  },

  cardrow: {
    flexDirection: 'row',
    paddingTop: 10,
  },

  imgDimensions: {
    width: 45,
    height: 45,
  },
  spaceImagesthree: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 40,
    padding: 10,
  },
  spaceImagesinSubset: {
    paddingTop: 34,
    paddingLeft: 20,
    alignContent: 'center',
    alignItems: 'center',
  },

  imgDimensionsinSubset: {
    width: 45,
    height: 45,
  },
  imageBground: {
    backgroundColor: '#add8e6',
    borderRadius: 50,
    width: 70,
    height: 72,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonStyle: {
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
