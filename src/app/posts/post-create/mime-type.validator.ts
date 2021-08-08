import { AbstractControl } from "@angular/forms";
// import { truncateSync } from "fs";
import { Observable, Observer } from "rxjs";

//asynchronos validator
// this will take in the key that is not specific reather generic
export const  mimeType= (control:AbstractControl ):
 Promise<{[key:string] :any}> | Observable<{[key:string] :any}> => {
  const file = control.value as File;
  const fileReader = new FileReader;
  //observer is a tool that is used to knwo when new data is emmited
  const frObs = Observable.create((observer: Observer<{ [key:string] :any}>) =>{
    fileReader.addEventListener("loadend", ()=>{
      // unit8array differe the file type
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0,4);
      let header = "";
      let isValid = false;
      for(let i = 0; i<arr.length; i++){
        header += arr[i].toString(16);

      }
      switch(header){
        case "89504e47":
          isValid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        default:
          isValid = false;
          break;
      }
      if(isValid){
        observer.next(null);
      }else{
        observer.next({invalidMimeType :true});
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
   return frObs;
};
