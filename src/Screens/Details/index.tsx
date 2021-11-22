import React, {useState, useEffect} from "react";
import {View, Text, Image, StyleSheet, Button, Alert} from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import api from "../../Services/api";
import { IRootStore } from "../../Store";
import {IListStoreDetails} from '../../Types'
import { ICupom } from "../../Store/Modules/Cupom/Types";
import { AddCupom } from "../../Store/Modules/Cupom/Actions";

const Details: React.FC = () => {
  const dispatch = useDispatch();
  const storeId = useSelector((state: IRootStore) => state.GlobalStoreId.store_id);
  const cupom = useSelector((state: IRootStore) => state.GlobalCupons.cupom);
 
  const[storeData, setStoreData] = useState<IListStoreDetails>({} as IListStoreDetails);

  const handleCupom = () => {
    dispatch(AddCupom({ cupom: `${storeData.storeDetails?.label
      .trim().replace(/\s/g,'').toUpperCase()}${storeData.value}`}));
  };

  useEffect(()=> {
  dispatch(AddCupom({
  cupom:''
  }))
    api
    .get(`discounts?store=${storeId}`)
    .then( response => {
      if(response.data.length > 0){
      api
      .get(`stores/${storeId}`)
      .then(res => {
        setStoreData({...response.data[0], storeDetails: res.data})
      }).catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
  },[storeId]);

  

  const dateParse = (value: Date) => {
    return Intl.DateTimeFormat('pt-BR').format(new Date(value));
  }
  return (
    <View style={styles.default}>
           <Text style={styles.title}>{storeData.storeDetails?.label}</Text>
            <Image source={{uri: storeData.storeDetails?.logo}}
              style={styles.logoIMG}
            />
           <Text style={styles.discountLabel}>{storeData.value}% de desconto</Text>
          <Text
           style={styles.inforDeteails}
           >
            Valido até {storeData?.expires_in && dateParse(storeData?.expires_in)}
          </Text>
          <Button
            title="Gerar cupom"
            onPress={handleCupom}
          />
          <Text>{cupom}</Text>
          
          </View>   
  )
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontWeight: 'bold',
    fontSize: 25,
    color: 'red'
  },
  discountLabel: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'red'
  },
  inforDeteails:{
    fontSize: 18
  },
  logoIMG: {
    width: 200,
    height: 100,
    resizeMode: 'contain'
  }
})

export default Details;