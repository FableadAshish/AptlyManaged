import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../themes/Colors';

const FeedCard = props => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const renderPhoto = ({index, item}) => {
    return index !== 0 ? (
      <Image style={styles.image} source={{uri: item}} />
    ) : null;
  };
  const {
    owner,
    createDate,
    description,
    images,
    likesCount,
    commentsCount,
    onDelete,
    isCurrentUser,
    onEdit,
    onLike,
    onPressComment,
    selected,
    userimage,
    liked,
  } = props;
  return (
    <>
      <View style={styles.item}>
        <View style={styles.leftView}>
          {userimage ? (
            <Image style={styles.iconContainer} source={{uri: userimage}} />
          ) : (
            <Icon name="person" style={styles.iconSize} />
          )}
        </View>
        <View style={styles.rightView}>
          <View style={styles.editOptions}>
            <View style={styles.nameWrap}>
              <Text style={styles.name}>{owner}</Text>
              <Text>{Moment(createDate, 'YYYY.MM.DD HH:II').fromNow()}</Text>
            </View>
            <View style={styles.iconsWrap}>
              {!props.hideEditOptions && isCurrentUser && (
                <View style={styles.editBtn}>
                  <Icon
                    name="pencil"
                    style={[styles.iconSize, styles.padding]}
                    onPress={onEdit}
                  />
                  <Icon
                    name="trash"
                    style={[styles.iconSize, styles.padding]}
                    onPress={onDelete}
                  />
                </View>
              )}
            </View>
          </View>
          <Text style={styles.description}>{description}</Text>
          {images && images.length > 0 && (
            <>
              <Image
                source={{uri: images[0]}}
                style={styles.descriptionImage}
              />
              <FlatList
                data={images}
                horizontal
                renderItem={renderPhoto}
                keyExtractor={(item, index) => `${index}`}
              />
            </>
          )}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.actionBtn} onPress={onLike}>
              <Icon
                name="heart"
                style={[
                  styles.hearticonSize,
                  {color: liked ? Colors.primarColor : '#999'},
                ]}
              />
              <Text style={styles.actionText}>{likesCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={onPressComment}>
              <Icon name="chatbubble" style={styles.iconSize} />
              <Text style={styles.actionText}>{commentsCount} comments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon
                name="flag"
                style={styles.iconSize}
                onPress={() => setIsModalVisible(!isModalVisible)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.modalOverlay}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.modalContainer}>
              <View style={styles.content}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Report Post</Text>
                </View>
                <View style={styles.guidelines}>
                  <Text style={styles.guidelinesText}>
                    This post will be reported. Please confirm
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  height: 55,
                }}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.yesButton}>
                  <Text style={{color: Colors.primarColor}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.noButton}>
                  <Text style={{color: Colors.primarColor}}>NO</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FeedCard;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingLeft: 15,
    paddingVertical: 15,
  },
  leftView: {
    width: '10%',
  },
  rightView: {
    width: '90%',
    paddingLeft: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2CBB8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#999',
  },
  image: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 5,
  },
  hearticonSize: {
    fontSize: 22,
    color: '#999',
  },
  iconSize: {
    fontSize: 20,
    color: '#999',
  },
  actionBtn: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
  padding: {
    padding: 10,
    marginLeft: -5
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  description: {
    fontWeight: '200',
  },
  editOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameWrap: {
    flex: 1,
  },
  iconsWrap: {
    width: 90,
  },
  editBtn: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  description: {
    marginVertical: 20,
    fontWeight: '200',
  },
  descriptionImage: {
    height: 200,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginVertical: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
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
    backgroundColor: '#f7f7f7',
  },
  guidelines: {
    height: 120,
  },
  guidelinesText: {
    // paddingHorizontal: 5,
    margin: 25,
    // marginTop: 25,
    fontSize: 16,
  },
  cancelButton: {
    borderRightWidth: 1,
    borderRightColor: Colors.primarColor,
  },
  modalContainer: {
    marginHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal:30

  },
  yesButton: {
    // paddingLeft: 100,
    // backgroundColor:'red',
    width: '50%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  noButton: {
    width: '50%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
