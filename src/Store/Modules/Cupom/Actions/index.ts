import { ICupom } from "../Types"

const ADD_CUPOM = "ADD_CUPOM";


export function AddCupom(cupom: ICupom){
  return {
    type: 'ADD_CUPOM',
    payload: cupom
  }
}