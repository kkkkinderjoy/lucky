'use client'
import React,{useState, useEffect} from 'react';

interface contentInter {
  name: string;
  desc : string;
  keyword ?: string;
  index ?: string
}
interface today{
  title: string;
  date: string;
  content: contentInter[]

}
export default function Home() {

  const[time,setTime] = useState<string>("") //기본값이 모름이기 때문에 빈문자열로 적음
  const[month,setMonth] =useState<string>("1"); // 1은 양력을 의미함
  const[gender,setGender] = useState<string>("");
  const[birthDate,setBirthDate] =useState<string>("");
  //생년월일은 숫자가 맞지만 데이터 전송할때 문자열로 보내져야해서 string으로 데이터타입을 설정함
  const[resultToday,setResultToday] = useState<today | null>(null);
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
      // console.log(data.result.tomorrow)
      // console.log(data.result.month)
    } 
  const birthChange = ((e : React.ChangeEvent<HTMLInputElement>) =>{
    // console.log("냐냐")
    const value = e.target.value; // input의 value를 가져오기위해
    if(value.length <= 8 && /^[0-9]*$/.test(value)){ //생년월일 6자리 or 8자리로 만들 수 있음 정규식은 외울필요없이 복붙하면됨
      setBirthDate(value);
    }
  })

  return (
    <>
    <div className="w-full h-full bg-white">
      <div className="max-w-7xl mx-10">
      <h3 className='text-center text-3xl font-bold p-2'>오늘의 운세</h3>
      <div className="p-3">
        <ul className="flex">
          <li className=""><span className='font-bold'>성별 </span></li>
          <li className="ml-2 "><button onClick={()=>setGender('m')} className='border rounded-md'>남자</button></li>
          <li className="ml-2"><button onClick={()=>setGender('f')} className='border rounded-md'>여자</button></li>
        </ul>
      </div>
      <div className="p-3">
        <ul className="flex">
          <li className=""><span className='font-bold'>생년월일</span></li>
          <li className="ml-3"><input type="text" onChange={birthChange} value={birthDate} placeholder='생년월일(8자리)' className='text-center border-[1px] rounded-md'/></li>
          <li className="">
            <select value={month} onChange={(e)=>setMonth(e.target.value)} className='ml-2 text-center border-[1px] rounded-md'>
              <option value="1">양력</option>
              <option value="2">음력 평달</option>
              <option value="3">음력 윤달</option>
            </select>
          </li>
        </ul>
      </div>
      <div className="p-3">
        <ul className="flex">
          <li className="font-bold"><span className=''>태어난 시간</span></li>
          <li className="">
          <select value={time} onChange={(e)=>setTime(e.target.value)} className='ml-5 text-center border-[1px] rounded-md'>
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
          </li>
        </ul>
      </div>
      <div className="flex justify-center mt-4">
      <button className='border px-5 py-2 text-center' onClick={fetchData}>운세보기</button>
      </div>
      {/* <div className="max-w-full h-full">
        <p className=''>성별 : {gender}</p>
        <p className=''>생년월일 : {birthDate}</p>
        <p className=''>달 : {month}</p>
        <p className=''>시간 : {time}</p>
      </div> */}
      {resultToday && (
      <>
      <h2>{resultToday.title}</h2>
      <p>{resultToday.date}</p>
      {resultToday.content.map((item, idx) => (
        <div key={idx}>
          <h3 className='text-bold text-lg'>{item.name}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
     </>
    )}
    </div>
    </div>
    </>
  )
}
