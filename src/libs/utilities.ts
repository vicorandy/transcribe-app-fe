import Cookies from 'js-cookie';
import moment from 'moment'


export function getUserToken() {
    const token = Cookies.get('usertoken')
    return token
  }

  export function formatDate( date:Date){
    if(!date){
        return 'no date for chat'
    }

      // Parse the sentAt timestamp
  const messageTime = moment(date);

  // Format the message time as desired
  return messageTime.format('MMMM Do YYYY'); 
}

export function convertFloat32ToInt16(buffer:any) {
  const int16Buffer = new Int16Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    int16Buffer[i] = Math.min(1, buffer[i]) * 0x7fff;
  }
  return int16Buffer;
}


export function mergeBuffers(lhs:any, rhs:any) {
  const mergedBuffer = new Int16Array(lhs.length + rhs.length)
  mergedBuffer.set(lhs, 0)
  mergedBuffer.set(rhs, lhs.length)
  return mergedBuffer
}
