import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../themes/Colors';

export const validURL = str => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};

const AddFeed = props => {
  const [title, setTitle] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);
  const [photos, setPhoto] = React.useState([]);
  const [height, setHeight] = React.useState(0);
  const [deletedPhotos, setDeletedPhotos] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (props.feed) {
      setTitle(props.feed.description ? props.feed.description : '');
      setPhoto(props.feed.properties);
      setShowSubmit(true);
    }
  }, [props.feed]);

  useEffect(() => {
    if (!props.feed) {
      setShowSubmit(photos.length > 0 || title.length > 0);
    }
  }, [photos]);

  const handleChoosePhoto = () => {
    const options = {
      includeBase64: true,
      maxWidth: 500,
      maxHeight: 500,
    };
    ImagePicker.openCamera(options).then(response => {
      console.log('images', response);

      console.log(response);
      if (photos.length === 0) {
        setPhoto([response]);
      } else {
        setPhoto([...photos, response]);
      }

      console.log([...photos, response]);
    });

    // ImagePicker.launchCamera(options, (response) => {
    //   if (response.uri) {
    //     console.log(response);
    //     if (photos.length === 0) {
    //       setPhoto([response]);
    //     } else {
    //       setPhoto((arr) => [...arr, response]);
    //     }
    //   }
    //   console.log(photos);
    // });
  };

  const handleChooseGallery = () => {
    const options = {
      includeBase64: true,
      // maxWidth: 500,
      // maxHeight: 500,
      multiple: true,
    };

    ImagePicker.openPicker(options)
      .then(response => {
        // if (response.uri) {
        console.log('response[]', response);
        if (photos.length === 0) {
          setPhoto(response);
        } else {
          setPhoto([...photos, ...response]);
        }
        // }
        // console.log(photos);
      })
      .catch(ex => {
        // alert(ex)
      });

    // ImagePicker.launchImageLibrary(options, (response) => {
    //   if (response.uri) {
    //     console.log(response);
    //     if (photos.length === 0) {
    //       setPhoto([response]);
    //     } else {
    //       setPhoto((arr) => [...arr, response]);
    //     }
    //   }
    //   console.log(photos);
    // });
  };

  const reload = () => {
    setTitle('');
    setPhoto([]);
    setShowSubmit(false);
  };

  const renderPhoto = ({item}) => {
    var source = typeof item === 'object' ? item.path : item;
    console.log('source', source);
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: source}} />
        <Icon
          name="close-circle-sharp"
          onPress={() => {
            var newPhotos = photos.filter(photo => {
              return photo !== item;
            });
            setPhoto(newPhotos);
            if (validURL(item)) {
              setDeletedPhotos(arr => [...arr, item]);
            }
          }}
          style={styles.cancelIcon}
        />
      </View>
    );
  };
  let numOfLinesCompany = 0;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.orangeView}>
          <View style={styles.textInputContainer}>
            <View style={styles.leftView}>
              <View style={styles.iconContainer}>
                {props.currentUser && props.currentUser.image ? (
                  <Image
                    style={styles.iconContainer}
                    source={{uri: props.currentUser.image}}
                  />
                ) : (
                  <Icon name="person" style={styles.iconSize} />
                )}
              </View>
            </View>
            <TextInput
              multiline={true}
              placeholder="Post a message"
              style={[styles.textInput, {height: Math.max(40, height)}]}
              paddingLeft={12}
              paddingRight={12}
              value={title}
              // numberOfLines={numOfLinesCompany}
              onContentSizeChange={event => {
                // numOfLinesCompany = event.nativeEvent.contentSize.height / 18;

                setHeight(event.nativeEvent.contentSize.height);
              }}
              onChangeText={text => {
                setTitle(text);
                setShowSubmit(text.length > 0 || photos.length > 0);
              }}
            />
            {showSubmit && (
              <Icon
                name="send"
                style={styles.sendIcon}
                onPress={() => {
                  var data = {
                    description: title,
                    user_feed_image: photos,
                    deleted_images: deletedPhotos,
                  };

                  console.log('setShowSubmit', data);

                  props.onSubmit(data);
                  setTitle('');
                  setShowSubmit(false);
                  setPhoto([]);
                  setDeletedPhotos([]);
                }}
              />
            )}
          </View>

          <View style={styles.sendContainer}>
            <MaterialIcons
              name="groups"
              style={{fontSize: 30, color: 'white', marginHorizontal: 10}}
              onPress={() => navigation.navigate('MyClubs')}
            />
            <FlatList
              data={photos}
              horizontal
              renderItem={renderPhoto}
              keyExtractor={(item, index) => `${index}`}
            />
            <Icon
              name="camera"
              style={styles.sendIcon}
              onPress={handleChoosePhoto}
            />
            <Icon
              name="images"
              style={styles.sendIcon}
              onPress={handleChooseGallery}
            />
            <Icon
              name="information-outline"
              style={styles.sendIcon}
              onPress={() => setIsModalVisible(!isModalVisible)}
            />
            {showSubmit && (
              <Icon name="reload" style={styles.sendIcon} onPress={reload} />
            )}
          </View>
        </View>
      </View>
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.modalOverlay}>
          <Pressable
          onPressOut={()=>setIsModalVisible(!isModalVisible)}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.modalContainer}>
              <View style={styles.content}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Community Guidelines</Text>
                </View>
                <View style={styles.guidelines}>
                  <Text style={styles.guidelinesText}>
                    Our Aptly message board needs to be a safe and comfortable
                    place to post. Messages that threaten people or have the
                    ability to intimidate, exclude or silence others are not
                    permitted.
                  </Text>
                  <Text style={styles.guidelinesText}>
                    Please be respectful with message content, discrimination of
                    any kind will not be tolerated
                  </Text>
                  <Text style={styles.guidelinesText}>
                    A message deemed inappropriate can be reported by app users
                    through the report button. A message reported three times is
                    automatically deleted. OK apologise for any inconvenience
                    this may cause.
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                style={styles.cancelButton}>
                <Text>OK</Text>
              </Pressable>
            </View>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default AddFeed;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  leftView: {},
  imageContainer: {
    width: 60,
    height: 60,
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 10,
    borderRadius: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSize: {
    fontSize: 20,
    color: '#999',
  },
  orangeView: {
    backgroundColor: '#EDB43C',
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 40,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  sendIcon: {
    fontSize: 25,
    color: '#FFF',
    marginHorizontal: 10,
  },
  textInput: {
    fontSize: 18,
    backgroundColor: '#FFF',
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: 8,
    borderRadius: 30,
  },
  cancelIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 25,
    color: 'white',
  },
  titleContainer: {
    height: 60,
    backgroundColor: Colors.primarColor,
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  title: {
    fontWeight: '700',
    color: 'white',
    fontSize: 22,
  },
  content: {
    backgroundColor: '#f2f2f2',
    borderBottomColor: Colors.primarColor,
    borderBottomWidth: 1,
  },
  guidelinesText: {
    paddingHorizontal: 5,
    margin: 5,
    marginTop: 10,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor:'white'
  },
  modalContainer: {
    marginHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
