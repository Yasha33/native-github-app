import React, { useContext } from 'react';
import Modal from 'react-native-modal';
import { View, ActivityIndicator } from 'react-native';


export default function ModalLoading({status}) {
    return (
        <View>
            <Modal isVisible={status} backdropColor={null} >
                <View >
                    <ActivityIndicator size='large' color='darkblue' />
                </View>
            </Modal>
        </View>
    )
}