import { NextRequest , NextResponse} from "next/server";

interface Content  {
  name: string;
  keyword?: string;
  desc: string;
  index: string;
};

interface DateDetail  {
  title: string;
  date: string;
  content: Content[];
};

interface UserData  {
  year: string;
  constellation: string;
};

interface Result  {
  day: DateDetail;
  tomorrow: DateDetail;
  month: DateDetail;
  userData: UserData;
};

interface JsonResponse {
  result: Result;
  resultMSG: string;
};

export const GET = async (req:NextRequest) : Promise<NextResponse> =>{
    // console.log(req.nextUrl.searchParams)
    const query  =  req.nextUrl.searchParams
    const gender = query.get('gender');
    const birthdate = query.get('birthdate');
    const month = query.get('month');
    const time = query.get('time');

    console.log(gender,birthdate,month,time)
    const res = await fetch(`https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver?_callback=window.__jindo2_callback._fortune_my_0&gender=${gender}&birth=${birthdate}&solarCal=${month}&time=${time}`)
    //console.log(await res.text()) //터미널창에서 확인하기
    //text() : text를 변환시키는것 그래서 await를 적어줘서 변환시키는 시간동안 기다려준 다음 데이터를 출력시킴

    function convert(str:string): JsonResponse | null {
        const fixedStr = str.replace(/^window\.__jindo2_callback\._fortune_my_0\(/, '').replace(/\);$/, '');
        try{
            const parsed:JsonResponse = JSON.parse(fixedStr.replace(/([\w]+) ?:/g, '"$1":'));
            // 큰따옴표 없는 거 찾아서 큰따옴표 강제로 작성해줌
            if(parsed){
                return parsed;
            }else{
                return null;
            }
        }catch(error){
            return null;
        }
    }
    
    const resTxt = await res.text();
    // 변환시키는 함수 변수로 설정해주기
    const resultData = convert(resTxt);

    //console.log(req.nextUrl.searchParams.get('birthdate')) // get('내가 가져올 데이터')
    //https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver




    // return NextResponse.json({error:"데이터가 없음"} )
    return NextResponse.json(resultData)
}

