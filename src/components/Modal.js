import React from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Colors} from '../themes/Colors';

export const ModalView = ({
  visible,
  animationType,
  transparent,
  setIsModalVisible,
  cancel,
  title,
  text1,
  text2,
  text3,
  cancelText,
}) => {
  return (
    <Modal
      animationType={animationType}
      visible={visible}
      transparent={transparent}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.guidelines}>
              <Text style={styles.guidelinesText}>{text1}</Text>
              <Text style={styles.guidelinesText}>{text2}</Text>
              <Text style={styles.guidelinesText}>{text3}</Text>
            </View>
          </View>
          <Pressable onPress={cancel} style={styles.cancelButton}>
            <Text>{cancelText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: 60,
    backgroundColor: Colors.primarColor,
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderTopRightRadius:5,
    borderTopLeftRadius:5
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
    backgroundColor: 'white',
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
