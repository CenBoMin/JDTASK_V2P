"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var $ = {};
var cookie = '', cookiesArr = [], res = '', shareCodes = [];
var joyId = [], workJoyInfoList = [];
var joyId1, userLevel, Joys = [];
var joys;
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, _i, _a, j;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, requireConfig()];
            case 1:
                _b.sent();
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 10];
                cookie = cookiesArr[i];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                return [4 /*yield*/, TotalBean()];
            case 3:
                _b.sent();
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + ($.nickName || $.UserName) + "\n");
                return [4 /*yield*/, joyList()];
            case 4:
                joys = _b.sent();
                console.log("\u4F60\u6709" + joys.data.activityJoyList.length + "\u53EA\uD83D\uDC36");
                for (_i = 0, _a = joys.data.activityJoyList; _i < _a.length; _i++) {
                    j = _a[_i];
                    console.log('id:', j.id, '等级:', j.level);
                }
                return [4 /*yield*/, wait(7000)];
            case 5:
                _b.sent();
                return [4 /*yield*/, makeShareCodes()];
            case 6:
                _b.sent();
                return [4 /*yield*/, wait(7000)];
            case 7:
                _b.sent();
                return [4 /*yield*/, merge()];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 2];
            case 10: return [2 /*return*/];
        }
    });
}); })();
function api(fn, body) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].post("https://api.m.jd.com/", "functionId=" + fn + "&body=" + JSON.stringify(body) + "&_t=" + Date.now() + "&appid=activities_platform", {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'User-Agent': TS_USER_AGENTS_1["default"],
                            'Host': 'api.m.jd.com',
                            'Referer': 'https://joypark.jd.com/',
                            'Origin': 'https://joypark.jd.com',
                            'Cookie': cookie
                        }
                    })];
                case 1:
                    data = (_a.sent()).data;
                    resolve(data);
                    return [2 /*return*/];
            }
        });
    }); });
}
function joyList() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("https://api.m.jd.com/?functionId=joyList&body={%22linkId%22:%22LsQNxL7iWDlXUs6cFl-AAg%22}&appid=activities_platform", {
                        headers: {
                            'host': 'api.m.jd.com',
                            'User-agent': TS_USER_AGENTS_1["default"],
                            'cookie': cookie,
                            'origin': 'https://joypark.jd.com',
                            'referer': 'https://joypark.jd.com'
                        }
                    })];
                case 1:
                    data = (_a.sent()).data;
                    resolve(data);
                    console.log(data);
                    return [2 /*return*/];
            }
        });
    }); });
}
function merge() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var level, mergeTemp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    level = userLevel < 6 ? 1 : 2;
                    mergeTemp = joys.data.activityJoyList.filter(function (j) {
                        return j.level === 3;
                    });
                    console.log(mergeTemp);
                    if (!(mergeTemp.length >= 2)) return [3 /*break*/, 2];
                    console.log('aaa');
                    return [4 /*yield*/, api('joyMerge', { "joyOneId": mergeTemp[0].id, "joyTwoId": mergeTemp[1].id, "linkId": "LsQNxL7iWDlXUs6cFl-AAg" })];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    return [3 /*break*/, 8];
                case 2:
                    if (!(mergeTemp.length === 1)) return [3 /*break*/, 8];
                    console.log('bbb');
                    return [4 /*yield*/, api('joyBuy', { "level": level, "linkId": "LsQNxL7iWDlXUs6cFl-AAg" })];
                case 3:
                    res = _a.sent();
                    console.log('joyBuy:', res);
                    return [4 /*yield*/, wait(7000)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, joyList()];
                case 5:
                    joys = _a.sent();
                    return [4 /*yield*/, wait(7000)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, merge()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    /*
                    let level: number = userLevel < 6 ? 1 : 2
                    res = await api('joyBuy', {"level": level, "linkId": "LsQNxL7iWDlXUs6cFl-AAg"})
                    let jid1: number = res.data.id
                    console.log(jid1)
                    await wait(2000)
                    res = await api('joyBuy', {"level": level, "linkId": "LsQNxL7iWDlXUs6cFl-AAg"})
                    let jid2: number = res.data.id
                    console.log(jid2)
                    await wait(2000)
                    res = await api('joyMerge', {"joyOneId": jid1, "joyTwoId": jid2, "linkId": "LsQNxL7iWDlXUs6cFl-AAg"})
                    console.log(res)
                    */
                    resolve();
                    return [2 /*return*/];
            }
        });
    }); });
}
function makeShareCodes() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api('joyBaseInfo', { "taskId": "167", "inviteType": "", "inviterPin": "", "linkId": "LsQNxL7iWDlXUs6cFl-AAg" })];
                case 1:
                    res = _a.sent();
                    console.log('用户等级:', res.data.level, '助力码:', res.data.invitePin);
                    shareCodes.push(res.data.invitePin);
                    userLevel = res.data.level;
                    resolve();
                    return [2 /*return*/];
            }
        });
    }); });
}
function wait(t) {
    return new Promise(function (e) { return setTimeout(e, t); });
}
function requireConfig() {
    return new Promise(function (resolve) {
        console.log('\n====================Hello World====================\n');
        console.log('开始获取配置文件\n');
        var jdCookieNode = require('./jdCookie.js');
        Object.keys(jdCookieNode).forEach(function (item) {
            if (jdCookieNode[item]) {
                cookiesArr.push(jdCookieNode[item]);
            }
        });
        console.log("\u5171" + cookiesArr.length + "\u4E2A\u4EAC\u4E1C\u8D26\u53F7\n");
        resolve(0);
    });
}
function TotalBean() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1["default"].get('https://me-api.jd.com/user_new/info/GetJDUserInfoUnion', {
                headers: {
                    Host: "me-api.jd.com",
                    Connection: "keep-alive",
                    Cookie: cookie,
                    "User-Agent": TS_USER_AGENTS_1["default"],
                    "Accept-Language": "zh-cn",
                    "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                    "Accept-Encoding": "gzip, deflate, br"
                }
            }).then(function (res) {
                if (res.data) {
                    var data = res.data;
                    if (data['retcode'] === "1001") {
                        $.isLogin = false; //cookie过期
                        return;
                    }
                    if (data['retcode'] === "0" && data['data'] && data.data.hasOwnProperty("userInfo")) {
                        $.nickName = data.data.userInfo.baseInfo.nickname;
                    }
                }
                else {
                    console.log('京东服务器返回空数据');
                }
            })["catch"](function (e) {
                console.log('Error:', e);
            });
            resolve();
            return [2 /*return*/];
        });
    }); });
}
