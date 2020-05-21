import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

export default function ModalLoading({ status }) {
    return (
        <View>
            <Modal isVisible={status} backdropColor={'transparent'} >
                <View>
                    <ActivityIndicator size='large' color='darkblue' />
                </View>
            </Modal>
        </View>
    )
}