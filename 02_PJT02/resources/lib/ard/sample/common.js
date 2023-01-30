/* eslint no-undef: "off" */
/* eslint prefer-const: "off" */

const ApiType = {
    DevWeb: "DevWeb",
    OpenWeb: "OpenWeb",
};
const ApiReferenceType = {
    Standard: "Standard",
    Survey: "Survey",
};

const params = new URLSearchParams(location.search);
const model = {};

(function() {
    const referenceTypeString = location.href.match(/\/r=([\w\d]+)#?\/?/)?.[1];

    model.apiReferenceType = Object.keys(ApiReferenceType).find(x => x.toLowerCase() === referenceTypeString?.toLowerCase());
    model.id = params.get("id");
})();

function initAsync() {
    let request;

    if (isServiceable) {
        // "userKey"를 [Client Side]에서 사용하기 위해 샘플 코드를 이용하지만 실 사용 시 [Server Side]에서 구현해야 합니다.
        request = getUserKeyAsync();
    } else {
        request = Promise.resolve(model.id || testUserKey);
    }

    return request
    .then(data => {
        model.userKey = data;
    })
    .catch(error => {
        console.log(error);
    });
}

/**
 * 사용자 키 가져옴
 * @returns {Promise<string>}
 */
function getUserKeyAsync() {
    // [Server Side] 기능을 대신 합니다.
    // 웹뷰 사용을 위해 "userKey"를 가져오는 기능을 제공 합니다.

    // 실 운영 시 [서비스 키] 노출을 피하기 위해
    // [Server Side]에서 이 기능을 구현하면 됩니다.

    return getUserInfoAsync(serviceInfo)
    .then(data => {
        if (data) {
            if (data.SUCS_YN === "Y") {
                if (data.Data?.length > 0) {
                    const userInfo = data.Data[0];
                    return userInfo.USER_KEY;
                }
            } else {
                console.log(data);
            }
        }
    });
}

/**
 * 사용자 정보
 * @param data JSON data
 * @returns {Promise<*>}
 */
function getUserInfoAsync(data) {
    // https://devapi.bizabm.com 개발용 도메인 접근 시 IP 제한없이 테스트 가능합니다
    // https://openapi.bizabm.com 운영용 도메인은 고객사 백엔드 서버의 IP만 허용 됩니다

    const url = "https://devapi.bizabm.com/maservice.svc/webresults-v1";
    return fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}
