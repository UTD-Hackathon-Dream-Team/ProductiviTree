import React, { useState, useEffect } from 'react';
import { TouchableOpacity , Image } from 'react-native';
import { Container, Content, Text, Button , Thumbnail } from "native-base";

const GoogleAuth = ({navigate} : { navigate: any}) => {

    const signInWithGoogle = async () => {
        navigate.navigate('MainStack')
    };

    return (
        <Content>
            <TouchableOpacity onPress={signInWithGoogle}>
                <Image
                    source={require('../assets/googe_sign_in.png')}
                />
            </TouchableOpacity>
        </Content>
    );
}

export default GoogleAuth;
