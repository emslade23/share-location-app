import React from 'react';
import {Button} from 'react-native';

//FetchLocation is a component just like a button or text

function fetchLocation(props)
{
    return (
        <Button title="Get Location" onPress={props.onGetLocation} color="indigo"/> //touch events
        //don't handle onPress event in this file, instead we will use props to deal with an onPress event in App.js
        //SO -> MUST: set up prop on component named onGetLocation and set up method there

    );
};

export default fetchLocation;
