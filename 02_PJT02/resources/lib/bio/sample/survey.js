/* eslint no-undef: "off" */
/* eslint prefer-const: "off" */

/** ******************************** **
 *  설문 데이터를 이용한 샘플 데이터 정리   *
 ** ******************************** **/

/**
 * 서버로 부터 웹뷰 결과 데이터를 가져오기 결정<br/>
 * 단, 정확한 서비스 정보(serviceInfo) 입력 필요<br/>
 * [true] 서버로 부터 웹뷰결과 데이터 가져와서 사용자키 활용<br/>
 * [false] 사용자키를 직접 입력하는 경우<br/>
 */
const isServiceable = false;

/**
 * 분석데이터 조회를 위한 입력 서비스 정보 <br/>
 * ---
 * key          - {서비스 키} API 개발가이드와 함께 제공되는 {{AccessKey}}<br/>
 * srvc_code    - {서비스 코드} 상품 서비스 코드 (당사제공 고정값)<br/>
 * rept_code    - {리포트 코드} 상품 리포트 코드 (당사제공 고정값)<br/>
 * tm_rept_code - {템플릿 리포트 코드} 상품 템플릿 리포트 코드 (당사제공 고정값)<br/>
 * cnty_code    - {언어 코드} 상품 리포트 언어코드 (당사제공 고정값)<br/>
 * chck_date    - {검진 일자} 건강검진 데이터 검진일자 (yyyyMMdd)<br/>
 * pcust_nmbr   - {고객 번호} 고객번호 (고객사 제공 유니크 값, 길이 30자이내)<br/>
 * ---
 * 프론트엔드 스크립트에서 본 방식은 {{AccessKey}} 노출로<br/>
 * 서비스 운영환경에서 권장하지 않음<br/>
 * 서비스 개발환경 테스트 경우에만 활용 바랍니다.<br/>
 */
const serviceInfo = {
    key: "{{AccessKey}}",
    data: [{
        srvc_code: "1010011",
        rept_code: "0402064",
        tm_rept_code: "0402066",
        cnty_code: "ko-KR",
        chck_date: "20191020",
        pcust_nmbr: "0402064-001-0001",
    }],
};

/** 테스트용 사용자 키 */
const testUserKeys = [
    "WmJXL1JRUHQ5T3E5aXk4THNyc091V2k5aVBoUUJIVGo5aUNKMFhxNHdraklJQ2YrN1U0a2RtSEFRWHNBenhvZ0Z1NW5iK1M1ODVDWmt3QnFJRy9jNWc9PQ==",
    "WmJXL1JRUHQ5T3E5aXk4THNyc091VmFvSHA3SVVQbnh6czNRKy9RUzh2UlFNOVdiZ3RMWHp1Sm4rWU9CckQyUzJTMTJhdEkyWlo4ODVWK2NJdHVGOHc9PQ==",
    "WmJXL1JRUHQ5T3E5aXk4THNyc091WnJhQWpDSmR6eFppbGNvOWVWR3ViU0pOWUpyb2NKSXlWWG1jQ3VzbFBHdmp1Tk50TFIzUzgyRkUwM0dxMWcyeVE9PQ==",
    "WmJXL1JRUHQ5T3E5aXk4THNyc091WVdhSUNlYm1RVFlJVHAxdEhPdlo3NUl4U04yRUcvd0RTN0RkWVI0SHVMRFJGYlFDWnVMc1JEcENaTG9oNjlwQXc9PQ==",
];

/** n번째 테스트용 사용자 키 사용 */
let testUserKey = testUserKeys[0];

/** 개발 API 사용 시 "DevWeb"을 사용<br/>
 ** 운영 API 사용 시 "OpenWeb"을 사용<br/> */
model.apiType = ApiType.DevWeb;
