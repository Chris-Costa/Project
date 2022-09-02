import { Injectable } from "@angular/core";

@Injectable()
export class TransferService {

  constructor( ) { }

  private titleData : string;
  private liftsData : string[];
  private bool: boolean;

  setTitle(titleData){
    this.titleData = titleData;
  }
  getTitleData(){
    let temp = this.titleData;
    this.clearTitleData();
    return temp;
  }
  clearTitleData(){
    this.titleData = undefined;
  }


  setLifts(liftsData){
    this.liftsData = liftsData;
  }
  getLiftsData(){
    let temp = this.liftsData;
    this.clearLiftsData();
    return temp;
  }
  clearLiftsData(){
    this.liftsData = undefined;
  }

  setBool(bool){
    this.bool = bool;
  }
  getBool(){
    let temp = this.bool;
    this.clearBool();
    return temp;
  }
  clearBool(){
    this.bool = undefined;
  }
}