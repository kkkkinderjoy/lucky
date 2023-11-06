'use client'
import React,{useState} from 'react';

export default function Home() {

  const[time,setTime] = useState<string>("") //기본값이 모름이기 때문에 빈문자열로 적음
  const[month,setMonth] =useState<string>("1"); // 1은 양력을 의미함
  const[gender,setGender] = useState<string>("");
  const[birthDate,setBirthDate] =useState<string>("");
  //생년월일은 숫자가 맞지만 데이터 전송할때 문자열로 보내져야해서 string으로 데이터타입을 설정함
  const[resultToday,setResultToday] = useState(null);
  const[resultTomorrow,setResultTomorrow] = useState(null);
  const[resultMonth,setResultMonth] = useState(null);
  const fetchData = async() =>{
    const res = await fetch (`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`);
    //데이터를 한번 숨기기 위해서 api로 데이터를 넘기 위해 (masking) >  보안적문제를 해결함 (클라이언트에서 정보수정 불가능하게 함 : 백엔드에서 데이터를 관리하니깐)
    const data = await res.json();
    // setResultMonth(data.result) > 데이터가 오늘의운세,내일의 운세, 이달의 운세로 나와서 위에 state 3가지로 나눠주기
    setResultToday(data.result.day);
    setResultTomorrow(data.result.tomorrow);
    setResultMonth(data.result.month)
    console.log(data.result.day)
    console.log(data.result.tomorrow)
    console.log(data.result.month)
  } 
  const birthChange = ((e : React.ChangeEvent<HTMLInputElement>) =>{
    // console.log("냐냐ㅑ양ㄴㅇ")
    const value = e.target.value; // input의 value를 가져오기위해
    if(value.length <= 8 && /^[0-9]*$/.test(value)){ //생년월일 6자리 or 8자리로 만들 수 있음 정규식은 외울필요없이 복붙하면됨
      setBirthDate(value);
    }
  })


  return (
    <>
      <h3 className='text-center text-3xl font-bold p-2'>오늘의 운세</h3>
      <div className="">
        <span>성별 : </span>
        <button onClick={()=>setGender('m')}>남자</button>
        <button onClick={()=>setGender('f')}>여자</button>
      </div>
      <div className="">
        <span>생년월일</span>
        <input type="text" onChange={birthChange} value={birthDate} placeholder='생년월일(8자리)' className='outline-none ring:border-purple-300'/>
      </div>
      <div className="">
        <span>달</span>
        <select value={month} onChange={(e)=>setMonth(e.target.value)}>
          <option value="1">양력</option>
          <option value="2">음력 평달</option>
          <option value="3">음력 윤달</option>
        </select>
      </div>
      <div className="">
        <span>시간</span>
        <select value={time} onChange={(e)=>setTime(e.target.value)}>
          <option value="">모름</option>
          <option value="0">23:30 ~ 01:29</option>
          <option value="1">01:30 ~ 03:29</option>
          <option value="2">03:30 ~ 05:29</option>
          <option value="3">05:30 ~ 07:29</option>
          <option value="4">07:30 ~ 09:29</option>
          <option value="5">09:30 ~ 11:29</option>
          <option value="6">11:30 ~ 13:29</option>
          <option value="7">13:30 ~ 15:29</option>
          <option value="8">15:30 ~ 17:29</option>
          <option value="9">17:30 ~ 19:29</option>
          <option value="10">19:30 ~ 21:29</option>
          <option value="11">21:30 ~ 23:29</option>
        </select>
      </div>
      <button className='border px-5 py-2' onClick={fetchData}>확인</button>
      <div className="">
        <p>성별 : {gender}</p>
        <p>생년월일 : {birthDate}</p>
        <p>달 : {month}</p>
        <p>시간 : {time}</p>
      </div>
      {resultToday && resultToday.content[0].desc}
    </>
  )
}
