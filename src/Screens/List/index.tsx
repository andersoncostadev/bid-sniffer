import React, {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {View,StyleSheet, Text, Image, TouchableOpacity}  from "react-native";
import MapView, {Marker, Callout,} from "react-native-maps";
import {useNavigation}  from '@react-navigation/native'
import api from '../../Services/api';
import { IPosition, IList } from "../../Types";
import setNewStoreID from '../../Store/Modules/ListDetails/Actions';
import {IGlobalStoreId } from '../../Store/Modules/ListDetails/Types'


const List: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [position, setPosition] = useState<IPosition >({
    latitude: -23.673081449999998,
    longitude: -46.677047406643354,
    latitudeDelta: 0.0911,
    longitudeDelta: 0.0411,
  })
  const [list, setList] = useState<IList[]>([])
  
  console.log('Store', list);

  const handleStoreDetails = (val: number, screen: any) => {
    const newStore: IGlobalStoreId= {
      store_id: val,
    };
    dispatch(setNewStoreID(newStore));
    nav.navigate(screen)
  };

  useEffect(() => {
    api.get('stores').then( response => {
      setList(response.data)
    })
  }, [])

  return (
    <View style={styles.default}>
     <MapView
      style={styles.mapStyle}
      initialRegion={position}
     >
       {list.map(item => (
           <Marker
            key={item.id}
            coordinate={{
             latitude: item.localization.lat,
             longitude: item.localization.lng,
           }}
          >
            <Callout>
              <View style={styles.calloutStyle}>
                <Text style={styles.calloutTitle}>{item.label}</Text>
                <TouchableOpacity onPress={()=> handleStoreDetails(item.id, 'Detalhes')}>
                  <Text>
                    Ver Mais
                  </Text>
                </TouchableOpacity>
                <Image source={{uri:item.logo}} />
              </View>
            </Callout>
          </Marker>
       ))}
      
     </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  mapStyle: {
    height: '100%',
    width: '100%'
  },
  calloutStyle:{
    alignItems:'center',
    justifyContent: 'center',
  },
  calloutTitle:{
    fontWeight: 'bold',
    color:'#ff0055',
    fontSize: 14
  }
})

export default List;