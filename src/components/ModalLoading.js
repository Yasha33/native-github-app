import React, { useContext } from 'react';
import Modal from 'react-native-modal';
import { View, Text, ActivityIndicator,StyleSheet } from 'react-native';


export default function ModalLoading({status}) {
    return (
        <View>
            <Modal isVisible={status} backdropColor={null} >
                <View style={styles.box}>
                    <ActivityIndicator size='large' color='darkblue' />
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    box:{
        
    }
})