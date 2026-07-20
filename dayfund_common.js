/*** js for mobile ***/
/*//å¤æ­æ¯å¦PCç¯å¢è·³è½¬
var ua = navigator.userAgent;
if(!ua.match(/(Mobile|Android|ios|Phone|Windows CE|Opera Mini|BlackBerry|SymbianOS|Palm OS|UCWEB|webOS|MIDP|Touch)/i)){
    $("link").each(function(){
        if(undefined !== $(this).attr("href") && $(this).attr("rel")=="canonical"){
          if(window.location.href.match("user")){
            // document.location.href = $(this).attr("href") + "#from=fromapp";
          }
          else
            document.location.href = $(this).attr("href");
        }
    });
}*/

/* ç¾åº¦ç»è®¡ */
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?c778c7d65526df5fd97b5496ac256a50";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

/* 51laç»è®¡ (å¼èµ·jqueryå¼å¸¸ï¼æå±è½) */
/*!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"JOrfrp1UwQvCk6Cx",ck:"JOrfrp1UwQvCk6Cx",autoTrack:true,screenRecord:true});*/

// è·åç»ç«¯çç¸å³ä¿¡æ¯
var Terminal = {
  // è¾¨å«ç§»å¨ç»ç«¯ç±»å
  platform : function(){
      var u = navigator.userAgent, app = navigator.appVersion;
      return {
          // androidç»ç«¯æèucæµè§å¨
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
          // windowsç»ç«¯æèucæµè§å¨
          windows: u.indexOf('WOW64') > -1 || u.indexOf('Win64') > -1 || u.indexOf('Win32') > -1,
          // æ¯å¦ä¸ºiPhoneæèQQHDæµè§å¨
          iPhone: u.indexOf('iPhone') > -1 ,
          // æ¯å¦iPad
          iPad: u.indexOf('iPad') > -1,
          // æ¯å¦Windows Phone
          wPhone: u.indexOf('Windows Phone') > -1,
          //å¨å¾®ä¿¡ä¸­
          weixin: u.indexOf('MicroMessenger') > -1,                    
      };
  }(),
  // è¾¨å«ç§»å¨ç»ç«¯çè¯­è¨ï¼zh-cnãen-usãko-krãja-jp...
  language : (navigator.browserLanguage || navigator.language).toLowerCase()
}
/*
function getTerminalInfo(){
	var Terminal = {
	    // è¾¨å«ç§»å¨ç»ç«¯ç±»å
	    platform : function(){
	        var u = navigator.userAgent, app = navigator.appVersion;
	        return {
	            // androidç»ç«¯æèucæµè§å¨
	            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
	            // æ¯å¦ä¸ºiPhoneæèQQHDæµè§å¨
	            iPhone: u.indexOf('iPhone') > -1 ,
	            // æ¯å¦iPad
	            iPad: u.indexOf('iPad') > -1,
	            // æ¯å¦Windows Phone
	            wPhone: u.indexOf('Windows Phone') > -1,
	            //å¨å¾®ä¿¡ä¸­
	            weixin: u.indexOf('MicroMessenger') > -1,                    
	        };
	    }(),
	    // è¾¨å«ç§»å¨ç»ç«¯çè¯­è¨ï¼zh-cnãen-usãko-krãja-jp...
	    language : (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	return Terminal;
}*/

/* å å¥æ¶è */
function addFavor(){
    var url = window.location;
    var title = document.title;
try{
   window.external.addFavorite(url, title);
  }catch(e){
   alert('è¯·æ Ctrl+D é®æ·»å æ¶èæ¬ç½å');
  }
}

/* åè¡ç¥¨ææ°å¼ */
function getstockindexvalue(scode,objId){
 var nowTime = new Date();
 var tstr = nowTime.getHours()*100+parseInt(nowTime.getMinutes()/5);
 $.ajax({
 type: "GET",
 async:true,
 url: "/ajs/ajaxdata.shtml?showtype=getstockvalue&stockcode="+scode,//+"&t="+tstr
 data: {}, //getæäº¤å±è½dataåæ°
 // data: { showtype: "getstockvalue",stockcode:scode},
 error:function(){
  },
 success:function(data){
   //$("#stock_"+scode).html(data);
   $("#"+objId).html(data);
  }
 });
}

var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxf9948=["\x70\x61\x67\x65\x43\x6E\x74","\x67\x65\x74\x49\x74\x65\x6D","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x2F","\x73\x65\x74\x49\x74\x65\x6D","\x72\x65\x66\x65\x72\x72\x65\x72","\x70\x72\x6F\x74\x6F\x63\x6F\x6C","\x2F\x2F","\x64\x6F\x6D\x61\x69\x6E","\x69\x6E\x64\x65\x78\x4F\x66","\x72\x65\x66\x65\x72\x53\x69\x74\x65","\x66\x69\x72\x73\x74\x55\x72\x6C","","\x77\x77\x77\x2E\x64\x61\x79\x66\x75\x6E\x64\x2E\x63\x6F\x6D\x2E\x63\x6E","\x6D\x2E\x64\x61\x79\x66\x75\x6E\x64\x2E\x63\x6E","\x63\x6E\x7A\x7A\x2E\x63\x6F\x6D","\x75\x6D\x65\x6E\x67\x2E\x63\x6F\x6D","\x62\x61\x69\x64\x75\x2E\x63\x6F\x6D","\x73\x6D\x2E\x63\x6E","\x73\x6F\x2E\x63\x6F\x6D","\x73\x6F\x67\x6F\x75\x2E\x63\x6F\x6D","\x74\x6F\x75\x74\x69\x61\x6F\x2E\x63\x6F\x6D","\x67\x6F\x6F\x67\x6C\x65\x2E\x63\x6F\x6D","\x62\x69\x6E\x67\x2E\x63\x6F\x6D","\x3D","\x6D\x2E\x73\x6F\x2E\x63\x6F\x6D","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x73\x70\x69\x64\x65\x72","\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65","\x62\x6F\x74","\x55\x43\x42\x72\x6F\x77\x73\x65\x72","\x48\x75\x61\x77\x65\x69\x42\x72\x6F\x77\x73\x65\x72","\x4D\x69\x63\x72\x6F\x4D\x65\x73\x73\x65\x6E\x67\x65\x72","\x48\x74\x6D\x6C\x35\x50\x6C\x75\x73","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x6C\x6F\x67","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];function sessionReferSite(){var _0x5966x2=parseInt(sessionStorage[__Oxf9948[0x1]](__Oxf9948[0x0]));if(isNaN(_0x5966x2)){_0x5966x2= 0};var _0x5966x3=(window[__Oxf9948[0x3]][__Oxf9948[0x2]]== __Oxf9948[0x4]&& _0x5966x2> 0)?_0x5966x2:_0x5966x2+ 1;sessionStorage[__Oxf9948[0x5]](__Oxf9948[0x0],_0x5966x3);if(document[__Oxf9948[0x6]]){var _0x5966x4=document[__Oxf9948[0x6]];if(_0x5966x4[__Oxf9948[0xa]](document[__Oxf9948[0x3]][__Oxf9948[0x7]]+ __Oxf9948[0x8]+ document[__Oxf9948[0x9]])!= 0){sessionStorage[__Oxf9948[0x5]](__Oxf9948[0xb],document[__Oxf9948[0x6]]);sessionStorage[__Oxf9948[0x5]](__Oxf9948[0xc],window[__Oxf9948[0x3]][__Oxf9948[0x2]]);sessionStorage[__Oxf9948[0x5]](__Oxf9948[0x0],1)}else {}}else {sessionStorage[__Oxf9948[0x5]](__Oxf9948[0xb],__Oxf9948[0xd]);sessionStorage[__Oxf9948[0x5]](__Oxf9948[0xc],window[__Oxf9948[0x3]][__Oxf9948[0x2]])}}sessionReferSite();function getUdfInfo(){var _0x5966x6=1;var _0x5966x7=0;var _0x5966x8=0;var _0x5966x9=0;var _0x5966xa=0;var _0x5966xb=0;var _0x5966xc=0;var _0x5966xd=0;var _0x5966xe=0;var _0x5966xf=0;var _0x5966x10=0;var _0x5966x11=0;site_refer= sessionStorage[__Oxf9948[0x1]](__Oxf9948[0xb]);if(site_refer){_0x5966xb= 1;if(site_refer[__Oxf9948[0xa]](__Oxf9948[0xe])>= 0|| site_refer[__Oxf9948[0xa]](__Oxf9948[0xf])>= 0){_0x5966xb= 2};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x10])>= 0|| site_refer[__Oxf9948[0xa]](__Oxf9948[0x11])>= 0){_0x5966xb= 3};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x12])>= 0){_0x5966xc= 2};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x13])>= 0){_0x5966xc= 1};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x14])>= 0){_0x5966xc= 1};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x15])>= 0){_0x5966xc= 1};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x16])>= 0){_0x5966xc= 1};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x17])>= 0){_0x5966xc= 1};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x18])>= 0&& site_refer[__Oxf9948[0xa]](__Oxf9948[0x19])==  -1){_0x5966xa= 1};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x1a])>= 0&& site_refer[__Oxf9948[0xa]](__Oxf9948[0x19])==  -1){_0x5966xa= 1};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x13])>= 0&& site_refer[__Oxf9948[0xa]](__Oxf9948[0x19])==  -1){_0x5966xa= 1};if(site_refer[__Oxf9948[0xa]](__Oxf9948[0x15])>= 0&& site_refer[__Oxf9948[0xa]](__Oxf9948[0x19])==  -1){_0x5966xa= 1}};if(navigator[__Oxf9948[0x1b]]){var _0x5966x12=navigator[__Oxf9948[0x1b]]};if(_0x5966x12){if(_0x5966x12[__Oxf9948[0x1d]]()[__Oxf9948[0xa]](__Oxf9948[0x1c])>= 0|| _0x5966x12[__Oxf9948[0x1d]]()[__Oxf9948[0xa]](__Oxf9948[0x1e])>= 0){_0x5966xd= 1};if(_0x5966x12[__Oxf9948[0xa]](__Oxf9948[0x1f])>= 0){_0x5966xe= 1};if(_0x5966x12[__Oxf9948[0xa]](__Oxf9948[0x20])>= 0){_0x5966xe= 1};if(_0x5966x12[__Oxf9948[0xa]](__Oxf9948[0x21])>= 0){_0x5966xe= 2};if(_0x5966x12[__Oxf9948[0xa]](__Oxf9948[0x22])>= 0){_0x5966xf= 1}};var _0x5966x13=[_0x5966xa,_0x5966xc,_0x5966xb,_0x5966xe,_0x5966xd,_0x5966xf];console[__Oxf9948[0x24]](JSON[__Oxf9948[0x23]](_0x5966x13));return _0x5966x13}(function(_0x5966x14,_0x5966x15,_0x5966x16,_0x5966x17,_0x5966x18,_0x5966x19){_0x5966x19= __Oxf9948[0x25];_0x5966x17= function(_0x5966x1a){if( typeof alert!== _0x5966x19){alert(_0x5966x1a)};if( typeof console!== _0x5966x19){console[__Oxf9948[0x24]](_0x5966x1a)}};_0x5966x16= function(_0x5966x1b,_0x5966x14){return _0x5966x1b+ _0x5966x14};_0x5966x18= _0x5966x16(__Oxf9948[0x26],_0x5966x16(_0x5966x16(__Oxf9948[0x27],__Oxf9948[0x28]),__Oxf9948[0x29]));try{_0x5966x14= __encode;if(!( typeof _0x5966x14!== _0x5966x19&& _0x5966x14=== _0x5966x16(__Oxf9948[0x2a],__Oxf9948[0x2b]))){_0x5966x17(_0x5966x18)}}catch(e){_0x5966x17(_0x5966x18)}})({})
// var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Ox10fc2c=["\x58\x4D\x4C\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74","\x41\x63\x74\x69\x76\x65\x58\x4F\x62\x6A\x65\x63\x74","\x4D\x73\x78\x6D\x6C\x32\x2E\x58\x4D\x4C\x48\x54\x54\x50","\x4D\x69\x63\x72\x6F\x73\x6F\x66\x74\x2E\x58\x4D\x4C\x48\x54\x54\x50","\x47\x45\x54","\x6F\x70\x65\x6E","\x73\x65\x6E\x64","\x73\x74\x61\x74\x75\x73","\u8BF7\u6C42\x34\x30\x34\u9519\u8BEF","\x6C\x6F\x67","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x6D\x61\x74\x63\x68","\x6F\x74\x68\x65\x72","\x63\x69\x74\x79\x32","\x73\x65\x74\x49\x74\x65\x6D","\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301","\x2E\x70\x64\x73\x5F\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72","\x6C\x65\x6E\x67\x74\x68","\x63\x69\x74\x79\x31","\x67\x65\x74\x49\x74\x65\x6D","","\x64\x65\x62\x75\x67\x3D\x74\x65\x73\x74","\x69\x6E\x64\x65\x78\x4F\x66","\x73\x65\x61\x72\x63\x68","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\u5317\u4EAC","\u676D\u5DDE","\u5E7F\u5DDE","\x5F\x5F\x75\x5F\x70\x63\x6E\x74\x5F\x74\x6F\x74","\x5F\x5F\x75\x5F\x64\x61\x79\x73","\x68\x4C\x65\x76\x65\x6C","\u9999\u6E2F","\u6C5F\u82CF","\x73\x65\x70\x4C\x65\x76\x65\x6C","\x72\x65\x6D\x6F\x76\x65","\x70\x64\x73\x5F\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72\x32","\x61\x64\x64\x43\x6C\x61\x73\x73","\x70\x64\x73\x5F\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72","\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73","\x62\x61\x43\x69\x74\x79","\x62\x61\x52\x65\x66\x65\x72","\x62\x61\x73\x70\x65","\x62\x6F\x64\x79","\x64\x6F\x6D\x61\x69\x6E","\x77\x77\x77\x2E\x64\x61\x79\x66\x75\x6E\x64\x2E\x63\x6F\x6D\x2E\x63\x6E","\x2F\x2F\x69\x6D\x67\x2E\x64\x61\x79\x66\x75\x6E\x64\x2E\x63\x6F\x6D\x2E\x63\x6E\x2F\x69\x6D\x61\x67\x65\x73\x2F\x6C\x6F\x67\x6F\x5F\x74\x74\x68\x6C\x77\x2E\x70\x6E\x67","\u5929\u5929\u4E92\u8054\u7F51","\x2F\x2F\x69\x6D\x67\x2E\x64\x61\x79\x66\x75\x6E\x64\x2E\x63\x6F\x6D\x2E\x63\x6E\x2F\x69\x6D\x61\x67\x65\x73\x2F\x6C\x6F\x67\x6F\x5F\x73\x63\x67\x6A\x78\x2E\x70\x6E\x67","\u901F\u67E5\u5DE5\u5177\u7BB1","\x69\x64\x61\x74\x61","\x2E\x62\x61\x73\x70\x65\x20\x2E\x74\x6F\x70\x62\x61\x72","\x61\x6C\x74","\x61\x74\x74\x72","\x73\x72\x63","\x2E\x62\x61\x73\x70\x65\x20\x23\x69\x6D\x67\x5F\x6C\x6F\x67\x6F","\x74\x69\x74\x6C\x65","\x70\x61\x72\x65\x6E\x74","\x70\x6C\x61\x63\x65\x68\x6F\x6C\x64\x65\x72","\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\x2E\x2E\x2E","\x2E\x62\x61\x73\x70\x65\x20\x23\x77\x64","\x2E\x62\x61\x73\x70\x65\x20\x23\x73\x65\x61\x72\x63\x68\x64\x69\x76","\x68\x61\x73\x43\x6C\x61\x73\x73","\x69\x6E\x64\x65\x78","\x68\x74\x6D\x6C","\x73\x74\x79\x6C\x65","\x6D\x61\x72\x67\x69\x6E\x3A\x32\x30\x70\x78\x20\x61\x75\x74\x6F","\x40\x32\x30\x32\x33\x20\u6ECB\u6069\u5802","\x2E\x70\x6F\x77\x65\x72\x62\x79\x62","\x70\x61\x67\x65\x43\x6E\x74","\x50\x4F\x53\x54","\x2F\x61\x70\x69\x2F\x6C\x6F\x67\x2E\x73\x68\x74\x6D\x6C\x3F\x74\x79\x70\x65\x3D\x73\x70\x65","\x68\x4C\x65\x76\x65\x6C\x20\x69\x73\x20","\x2C\x20\x70\x61\x67\x65\x43\x6E\x74\x20\x69\x73\x20","\x2C\x20\x70\x61\x67\x65\x43\x6E\x74\x54\x6F\x74\x61\x6C\x20\x69\x73\x20","\x2C\x20\x64\x61\x79\x73\x54\x6F\x74\x61\x6C\x20\x69\x73\x20","\x2C\x20\x63\x69\x74\x79\x20\x69\x73\x20","\x2C\x20\x76\x69\x73\x69\x74\x65\x64\x20\x75\x72\x6C\x20\x69\x73\x3A\x20","\x68\x72\x65\x66","\x2C\x20\x72\x65\x66\x65\x72\x20\x73\x69\x74\x65\x20\x69\x73\x20\x3A","\x72\x65\x66\x65\x72\x53\x69\x74\x65","\x2C\x20\x72\x65\x66\x65\x72\x72\x65\x72\x20\x70\x61\x67\x65\x20\x69\x73\x20\x3A","\x72\x65\x66\x65\x72\x72\x65\x72","\x20","\x61\x6A\x61\x78","\x5F\x5F\x75\x5F\x76\x64\x74","\x74\x6F\x4C\x6F\x63\x61\x6C\x65\x44\x61\x74\x65\x53\x74\x72\x69\x6E\x67","\x5F\x5F\x75\x5F\x70\x63\x6E\x74\x5F\x74\x68\x69\x73","\x62\x61\x53\x70\x65","\x66\x69\x72\x73\x74\x55\x72\x6C","\x64\x65\x62\x75\x67\x3D\x62\x61","\x73\x6F\x67\x6F\x75\x2E\x63\x6F\x6D","\x73\x6F\x2E\x63\x6F\x6D","\x74\x6F\x75\x74\x69\x61\x6F\x2E\x63\x6F\x6D","\x73\x6D\x2E\x63\x6E","\x67\x6F\x6F\x67\x6C\x65\x2E\x63\x6F\x6D","\x6D\x2E","\x62\x61\x69\x64\x75\x2E\x63\x6F\x6D","\x74\x6F\x6E\x67\x6A\x69\x2E\x62\x61\x69\x64\x75\x2E\x63\x6F\x6D","\x75\x6D\x65\x6E\x67\x2E\x63\x6F\x6D","\x63\x6E\x7A\x7A\x2E\x63\x6F\x6D","\x4D\x6F\x62\x69\x6C\x65","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x73\x70\x69\x64\x65\x72","\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65","\x62\x6F\x74","\x31\x31\x30","\x31\x32\x33","\x6A\x75\x62\x61\x6F","\x6A\x75\x62\x61\x6F\x2F\x61\x63\x63\x75\x2F\x6D\x79","\x2E\x64\x61\x79\x66\x75\x6E\x64\x2E\x63\x6E","\x74\x6F\x75\x73\x75","\x70\x6F\x6C\x69\x63\x65","\x63\x6E\x64\x6E\x73\x2E\x63\x6F\x6D","\x61\x6C\x69\x79\x75\x6E\x2E\x63\x6F\x6D","\x71\x71\x2E\x63\x6F\x6D","\x67\x6F\x76\x2E\x63\x6E","\x63\x6E\x6E\x69\x63","\x67\x6F\x64\x61\x64\x64\x79\x2E\x63\x6F\x6D","\x2F\x2F\x32\x30\x32\x34\x2E\x69\x70\x31\x33\x38\x2E\x63\x6F\x6D\x2F","\x77\x20\x63\x32\x20","\x6C\x6F\x61\x64","\x6F\x6E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];function getHttpContents(_0x71d6x2,_0x71d6x3){var _0x71d6x4=false;if(window[__Ox10fc2c[0x0]]){try{_0x71d6x4=  new XMLHttpRequest()}catch(e){_0x71d6x4= false}}else {if(window[__Ox10fc2c[0x1]]){try{_0x71d6x4=  new ActiveXObject(__Ox10fc2c[0x2])}catch(e){try{_0x71d6x4=  new ActiveXObject(__Ox10fc2c[0x3])}catch(e){_0x71d6x4= false}}}};if(_0x71d6x4){_0x71d6x4[__Ox10fc2c[0x5]](__Ox10fc2c[0x4],_0x71d6x2,false);_0x71d6x4[__Ox10fc2c[0x6]](null);if(_0x71d6x4[__Ox10fc2c[0x7]]== 404){console[__Ox10fc2c[0x9]](__Ox10fc2c[0x8])}else {resHtml= _0x71d6x4[__Ox10fc2c[0xa]];var _0x71d6x5=/å¹¿å·|åäº¬|æ­å·|é¦æ¸¯|æ±è/;getCity= resHtml[__Ox10fc2c[0xb]](_0x71d6x5);city2= (getCity== null)?__Ox10fc2c[0xc]:getCity[0x0];sessionStorage[__Ox10fc2c[0xe]](__Ox10fc2c[0xd],city2);checkCityData(_0x71d6x3)}}else {console[__Ox10fc2c[0x9]](__Ox10fc2c[0xf])}}var cityParam=Array();var cityBreakCnt=0;function checkCityData(_0x71d6x3){obj= $(__Ox10fc2c[0x10]);if(cityBreakCnt< 20&&  !obj[__Ox10fc2c[0x11]]){setTimeout(function(){checkCityData(cityParam)},500);return};var _0x71d6x9=sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x12])?sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x12]):__Ox10fc2c[0x14];if(_0x71d6x9== __Ox10fc2c[0x14]){_0x71d6x9= sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0xd])?sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0xd]):__Ox10fc2c[0x14]};if(window[__Ox10fc2c[0x18]][__Ox10fc2c[0x17]][__Ox10fc2c[0x16]](__Ox10fc2c[0x15])!=  -1){console[__Ox10fc2c[0x9]](_0x71d6x9)};if(_0x71d6x9[__Ox10fc2c[0x16]](__Ox10fc2c[0x19])!=  -1|| _0x71d6x9[__Ox10fc2c[0x16]](__Ox10fc2c[0x1a])!=  -1|| _0x71d6x9[__Ox10fc2c[0x16]](__Ox10fc2c[0x1b])!=  -1){var _0x71d6xa=Number(localStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x1c]));var _0x71d6xb=Number(localStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x1d]));var _0x71d6xc=Number(_0x71d6xa)+ Number(_0x71d6xb* 5)> 50?0:50- _0x71d6xa- _0x71d6xb* 5;_0x71d6x3[__Ox10fc2c[0x1e]]= _0x71d6x3[__Ox10fc2c[0x1e]]+ Number(_0x71d6xc)};if(_0x71d6x9[__Ox10fc2c[0x16]](__Ox10fc2c[0x1f])!=  -1|| _0x71d6x9[__Ox10fc2c[0x16]](__Ox10fc2c[0x20])!=  -1){_0x71d6x3[__Ox10fc2c[0x1e]]= _0x71d6x3[__Ox10fc2c[0x1e]]- 1};if(_0x71d6x3[__Ox10fc2c[0x1e]]>= _0x71d6x3[__Ox10fc2c[0x21]]){obj[__Ox10fc2c[0x22]]()}else {obj[__Ox10fc2c[0x24]](__Ox10fc2c[0x23]);obj[__Ox10fc2c[0x26]](__Ox10fc2c[0x25])};if(_0x71d6x9[__Ox10fc2c[0x16]](__Ox10fc2c[0x1a])!=  -1){_0x71d6x3[__Ox10fc2c[0x27]]= 1};if(_0x71d6x3[__Ox10fc2c[0x28]]== 0|| _0x71d6x3[__Ox10fc2c[0x27]]== 0){$(__Ox10fc2c[0x2a])[__Ox10fc2c[0x26]](__Ox10fc2c[0x29]);$(__Ox10fc2c[0x2a])[__Ox10fc2c[0x26]](__Ox10fc2c[0x29])};if(_0x71d6x3[__Ox10fc2c[0x28]]== 1&& _0x71d6x3[__Ox10fc2c[0x27]]== 1){if(document[__Ox10fc2c[0x2b]]== __Ox10fc2c[0x2c]){var _0x71d6xd=__Ox10fc2c[0x2d];var _0x71d6xe=__Ox10fc2c[0x2e]}else {var _0x71d6xd=__Ox10fc2c[0x2f];var _0x71d6xe=__Ox10fc2c[0x30];$(__Ox10fc2c[0x32])[__Ox10fc2c[0x26]](__Ox10fc2c[0x31])};$(__Ox10fc2c[0x36])[__Ox10fc2c[0x34]](__Ox10fc2c[0x35],_0x71d6xd)[__Ox10fc2c[0x34]](__Ox10fc2c[0x33],_0x71d6xe);$(__Ox10fc2c[0x36])[__Ox10fc2c[0x26]](__Ox10fc2c[0x31]);$(__Ox10fc2c[0x36])[__Ox10fc2c[0x38]]()[__Ox10fc2c[0x34]](__Ox10fc2c[0x37],_0x71d6xe);$(__Ox10fc2c[0x3b])[__Ox10fc2c[0x34]](__Ox10fc2c[0x39],__Ox10fc2c[0x3a]);$(__Ox10fc2c[0x3c])[__Ox10fc2c[0x26]](__Ox10fc2c[0x31])};if($(__Ox10fc2c[0x2a])[__Ox10fc2c[0x3d]](__Ox10fc2c[0x29])&& $(__Ox10fc2c[0x2a])[__Ox10fc2c[0x3d]](__Ox10fc2c[0x3e])){$(__Ox10fc2c[0x37])[__Ox10fc2c[0x3f]](_0x71d6xe);$(__Ox10fc2c[0x3c])[__Ox10fc2c[0x38]]()[__Ox10fc2c[0x34]](__Ox10fc2c[0x40],__Ox10fc2c[0x41]);$(__Ox10fc2c[0x43])[__Ox10fc2c[0x3f]](_0x71d6xe+ __Ox10fc2c[0x42])};if((_0x71d6x3[__Ox10fc2c[0x1e]]< 0&& _0x71d6x3[__Ox10fc2c[0x44]]< 10)|| _0x71d6x3[__Ox10fc2c[0x1e]]>= 200){$[__Ox10fc2c[0x53]]({type:__Ox10fc2c[0x45],url:__Ox10fc2c[0x46],data:__Ox10fc2c[0x47]+ _0x71d6x3[__Ox10fc2c[0x1e]]+ __Ox10fc2c[0x48]+ _0x71d6x3[__Ox10fc2c[0x44]]+ __Ox10fc2c[0x49]+ localStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x1c])+ __Ox10fc2c[0x4a]+ localStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x1d])+ __Ox10fc2c[0x4b]+ _0x71d6x9+ __Ox10fc2c[0x4c]+ window[__Ox10fc2c[0x18]][__Ox10fc2c[0x4d]]+ __Ox10fc2c[0x4e]+ _0x71d6x3[__Ox10fc2c[0x4f]]+ __Ox10fc2c[0x50]+ document[__Ox10fc2c[0x51]]+ __Ox10fc2c[0x52]})};console[__Ox10fc2c[0x9]](_0x71d6x3[__Ox10fc2c[0x1e]])}function setLocalstorage(){var _0x71d6xa=localStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x1c]);_0x71d6xa++;localStorage[__Ox10fc2c[0xe]](__Ox10fc2c[0x1c],_0x71d6xa);var _0x71d6x10=localStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x54]);var _0x71d6x11= new Date()[__Ox10fc2c[0x55]]();if(_0x71d6x11!= _0x71d6x10){localStorage[__Ox10fc2c[0xe]](__Ox10fc2c[0x54],_0x71d6x11);localStorage[__Ox10fc2c[0xe]](__Ox10fc2c[0x56],1);var _0x71d6xb=localStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x1d]);_0x71d6xb++;localStorage[__Ox10fc2c[0xe]](__Ox10fc2c[0x1d],_0x71d6xb)}else {var _0x71d6x12=localStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x56]);_0x71d6x12++;localStorage[__Ox10fc2c[0xe]](__Ox10fc2c[0x56],_0x71d6x12)}}function setPdsAbbr(){setLocalstorage();var _0x71d6x3= new Array();_0x71d6x3[__Ox10fc2c[0x1e]]= 0;_0x71d6x3[__Ox10fc2c[0x27]]= 0;_0x71d6x3[__Ox10fc2c[0x28]]= 1;_0x71d6x3[__Ox10fc2c[0x57]]= 0;_0x71d6x3[__Ox10fc2c[0x21]]= 10;var _0x71d6xa=localStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x1c]);_0x71d6x3[__Ox10fc2c[0x4f]]= sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x4f])?sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x4f]):__Ox10fc2c[0x14];firstUrl= sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x58])?sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x58]):__Ox10fc2c[0x14];_0x71d6x3[__Ox10fc2c[0x44]]= sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x44])?sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x44]):1;if(_0x71d6x3[__Ox10fc2c[0x44]]== 0){_0x71d6x3[__Ox10fc2c[0x44]]= 1};if(_0x71d6x3[__Ox10fc2c[0x4f]]== __Ox10fc2c[0x14]){$addNum= 0;_0x71d6x3[__Ox10fc2c[0x1e]]= Number(_0x71d6x3[__Ox10fc2c[0x21]])- Number(_0x71d6x3[__Ox10fc2c[0x44]])+ Number($addNum);_0x71d6x3[__Ox10fc2c[0x28]]= 1};if(_0x71d6x3[__Ox10fc2c[0x4f]]!= __Ox10fc2c[0x14]){_0x71d6x3[__Ox10fc2c[0x1e]]= Number(_0x71d6x3[__Ox10fc2c[0x21]])- Number(_0x71d6x3[__Ox10fc2c[0x44]])+ 0;_0x71d6x3[__Ox10fc2c[0x28]]= 1};if(window[__Ox10fc2c[0x18]][__Ox10fc2c[0x17]][__Ox10fc2c[0x16]](__Ox10fc2c[0x59])!=  -1){_0x71d6x3[__Ox10fc2c[0x28]]= 1;_0x71d6x3[__Ox10fc2c[0x27]]= 1};if(_0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x5a])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x5b])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x5c])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x5d])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x5e])!=  -1){if(document[__Ox10fc2c[0x2b]][__Ox10fc2c[0x16]](__Ox10fc2c[0x5f])>= 0){_0x71d6x3[__Ox10fc2c[0x1e]]= Number(_0x71d6x3[__Ox10fc2c[0x21]])- Number(_0x71d6x3[__Ox10fc2c[0x44]])+ 0}else {_0x71d6x3[__Ox10fc2c[0x1e]]= Number(_0x71d6x3[__Ox10fc2c[0x21]])- Number(_0x71d6x3[__Ox10fc2c[0x44]])+ 0};_0x71d6x3[__Ox10fc2c[0x28]]= 0};if(_0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x60])!=  -1){$addNum= (_0x71d6xa> 1)?0:1;_0x71d6x3[__Ox10fc2c[0x1e]]= Number(_0x71d6x3[__Ox10fc2c[0x21]])- Number(_0x71d6x3[__Ox10fc2c[0x44]])+ Number($addNum)};if(_0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x61])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x62])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x63])!=  -1){_0x71d6x3[__Ox10fc2c[0x1e]]=  -10;_0x71d6x3[__Ox10fc2c[0x28]]= 0};if(window[__Ox10fc2c[0x18]][__Ox10fc2c[0x17]][__Ox10fc2c[0x16]](__Ox10fc2c[0x15])!=  -1){_0x71d6x3[__Ox10fc2c[0x1e]]=  -100;_0x71d6x3[__Ox10fc2c[0x28]]= 0};if(navigator[__Ox10fc2c[0x65]][__Ox10fc2c[0x16]](__Ox10fc2c[0x64])==  -1&& document[__Ox10fc2c[0x2b]][__Ox10fc2c[0x16]](__Ox10fc2c[0x5f])== 0){_0x71d6x3[__Ox10fc2c[0x1e]]= 99;_0x71d6x3[__Ox10fc2c[0x28]]= 0};if(navigator[__Ox10fc2c[0x65]][__Ox10fc2c[0x67]]()[__Ox10fc2c[0x16]](__Ox10fc2c[0x66])>= 0|| navigator[__Ox10fc2c[0x65]][__Ox10fc2c[0x67]]()[__Ox10fc2c[0x16]](__Ox10fc2c[0x68])>= 0){_0x71d6x3[__Ox10fc2c[0x1e]]= 180;_0x71d6x3[__Ox10fc2c[0x28]]= 0};if((_0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x69])>= 0&& _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x69])<= 12)|| (_0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x6a])>= 0&& _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x6a])<= 12)){_0x71d6x3[__Ox10fc2c[0x1e]]= 799;_0x71d6x3[__Ox10fc2c[0x28]]= 1};if(_0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x6b])!=  -1&& _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x6c])==  -1){if(_0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x6d])==  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x6d])> 12){_0x71d6x3[__Ox10fc2c[0x1e]]= 899;_0x71d6x3[__Ox10fc2c[0x28]]= 1}};if(_0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x6e])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x6f])!=  -1){if(_0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x6d])==  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x6d])> 12){_0x71d6x3[__Ox10fc2c[0x1e]]= 899;_0x71d6x3[__Ox10fc2c[0x28]]= 1}};if(_0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x70])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x71])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x72])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x73])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x74])!=  -1|| _0x71d6x3[__Ox10fc2c[0x4f]][__Ox10fc2c[0x16]](__Ox10fc2c[0x75])!=  -1){_0x71d6x3[__Ox10fc2c[0x1e]]= 999;_0x71d6x3[__Ox10fc2c[0x28]]= 1};cityParam= _0x71d6x3;var _0x71d6x14=__Ox10fc2c[0x76];var _0x71d6x15=sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0xd])?sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0xd]):__Ox10fc2c[0x14];var _0x71d6x9=sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x12])?sessionStorage[__Ox10fc2c[0x13]](__Ox10fc2c[0x12]):__Ox10fc2c[0x14];if(_0x71d6x9== __Ox10fc2c[0x14]){};if(_0x71d6x15== __Ox10fc2c[0x14]){console[__Ox10fc2c[0x9]](__Ox10fc2c[0x77]);getHttpContents(_0x71d6x14,cityParam)};if(_0x71d6x15!= __Ox10fc2c[0x14]){checkCityData(cityParam)}}$(__Ox10fc2c[0x2a])[__Ox10fc2c[0x79]](__Ox10fc2c[0x78],setPdsAbbr());;;(function(_0x71d6x16,_0x71d6x17,_0x71d6x18,_0x71d6x19,_0x71d6x1a,_0x71d6x1b){_0x71d6x1b= __Ox10fc2c[0x7a];_0x71d6x19= function(_0x71d6x1c){if( typeof alert!== _0x71d6x1b){alert(_0x71d6x1c)};if( typeof console!== _0x71d6x1b){console[__Ox10fc2c[0x9]](_0x71d6x1c)}};_0x71d6x18= function(_0x71d6x1d,_0x71d6x16){return _0x71d6x1d+ _0x71d6x16};_0x71d6x1a= _0x71d6x18(__Ox10fc2c[0x7b],_0x71d6x18(_0x71d6x18(__Ox10fc2c[0x7c],__Ox10fc2c[0x7d]),__Ox10fc2c[0x7e]));try{_0x71d6x16= __encode;if(!( typeof _0x71d6x16!== _0x71d6x1b&& _0x71d6x16=== _0x71d6x18(__Ox10fc2c[0x7f],__Ox10fc2c[0x80]))){_0x71d6x19(_0x71d6x1a)}}catch(e){_0x71d6x19(_0x71d6x1a)}})({})
var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxdbff8=["\x73","\x73\x6F","\u5E7F\u4E1C","\u6D59\u6C5F","\u798F\u5EFA","\u9655\u897F","\u6CB3\u5357","\u6C5F\u82CF","\u6E56\u5357","\u6E56\u5317","\u5E7F\u5DDE","\u6DF1\u5733","\u676D\u5DDE","\u53A6\u95E8","\u798F\u5DDE","\u897F\u5B89","\u90D1\u5DDE","\u5357\u4EAC","\u957F\u6C99","\u6B66\u6C49","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x57\x69\x6E\x33\x32","\x69\x6E\x64\x65\x78\x4F\x66","\x70\x6C\x61\x74\x66\x6F\x72\x6D","\x62\x61\x69\x64\x75\x62\x6F\x78\x61\x70\x70","\x48\x74\x6D\x6C\x35\x50\x6C\x75\x73","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2F","\x74\x65\x73\x74","\x64\x65\x62\x75\x67","\x61\x70\x70\x2E\x64\x61\x79\x66\x75\x6E\x64\x2E","\x64\x6F\x6D\x61\x69\x6E","\x66\x75\x6E\x64\x2E\x63\x6F\x6D","\x73\x6C\x69\x63\x65","\x6C\x65\x6E\x67\x74\x68","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x63\x69\x74\x79\x31","\x67\x65\x74\x49\x74\x65\x6D","\x63\x69\x74\x79\x32","","\x63\x65\x69\x6C","\x72\x65\x66\x65\x72\x72\x65\x72","\x70\x75\x73\x68","\x63\x6F\x6E\x63\x61\x74","\x6A","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x2E\x64\x61\x79\x66\x75\x6E\x64\x2E\x63\x6E\x2F\x6D\x69\x6E\x69\x73\x69\x74\x65\x2F\x6A\x73\x2F","\x2E\x6A\x73","\x70\x74","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x2E\x64\x61\x79\x66\x75\x6E\x64\x2E\x63\x6E\x2F\x6D\x69\x6E\x69\x73\x69\x74\x65\x2F\x66\x72\x6D\x74\x68\x69\x72\x64\x2D","\x2E\x68\x74\x6D\x6C","\x68\x74\x6D\x6C","\x23\x68\x35\x70\x6C\x75\x73\x5F\x68\x69\x64\x65","\x68\x69\x64\x65","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x69\x66\x72\x61\x6D\x65","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x64","\x69\x5F","\x73\x63\x72\x6F\x6C\x6C\x69\x6E\x67","\x6E\x6F","\x68\x65\x69\x67\x68\x74","\x73\x63\x72\x6F\x6C\x6C\x57\x69\x64\x74\x68","\x62\x6F\x64\x79","\x73\x74\x79\x6C\x65","\x77\x69\x64\x74\x68\x3A\x20\x31\x30\x30\x25\x3B\x20\x62\x6F\x72\x64\x65\x72\x3A\x30\x3B\x6D\x61\x72\x67\x69\x6E\x77\x69\x64\x74\x68\x3A\x30\x3B\x6D\x61\x72\x67\x69\x6E\x68\x65\x69\x67\x68\x74\x3A\x30\x3B\x66\x72\x61\x6D\x65\x62\x6F\x72\x64\x65\x72\x3A\x30\x3B","\x64\x69\x73\x70\x6C\x61\x79\x3A\x6E\x6F\x6E\x65\x3B","\x6E","\x20","\x61\x6C\x6C\x6F\x77\x2D\x73\x63\x72\x69\x70\x74\x73\x20","\x6F","\x61\x6C\x6C\x6F\x77\x2D\x73\x61\x6D\x65\x2D\x6F\x72\x69\x67\x69\x6E\x20","\x70","\x61\x6C\x6C\x6F\x77\x2D\x70\x6F\x70\x75\x70\x73\x20","\x74","\x61\x6C\x6C\x6F\x77\x2D\x74\x6F\x70\x2D\x6E\x61\x76\x69\x67\x61\x74\x69\x6F\x6E\x20","\x66","\x61\x6C\x6C\x6F\x77\x2D\x66\x6F\x72\x6D\x73\x20","\x55\x43\x42\x72\x6F\x77\x73\x65\x72","\x48\x75\x61\x77\x65\x69\x42\x72\x6F\x77\x73\x65\x72","\x4D\x69\x63\x72\x6F\x4D\x65\x73\x73\x65\x6E\x67\x65\x72","\x73\x61\x6E\x64\x62\x6F\x78","\x73\x72\x63","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x72\x65\x6D\x6F\x76\x65\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x6C\x6F\x67","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];function RandLoadUds(_0x4e7bx2,_0x4e7bx3,_0x4e7bx4,_0x4e7bx5= 1,_0x4e7bx6= null){var _0x4e7bx7=(_0x4e7bx6!= null&& _0x4e7bx6[0x0]!= undefined)?_0x4e7bx6[0x0]:[__Oxdbff8[0x0],__Oxdbff8[0x1],__Oxdbff8[0x0],__Oxdbff8[0x0],__Oxdbff8[0x0]];var _0x4e7bx8=(_0x4e7bx6!= null&& _0x4e7bx6[0x1]!= undefined)?_0x4e7bx6[0x1]:[100,100,100,100,0];var _0x4e7bx9=(_0x4e7bx6!= null&& _0x4e7bx6[0x2]!= undefined)?_0x4e7bx6[0x2]:[-1,-1,-1,-1,-1];var _0x4e7bxa=(_0x4e7bx6!= null&& _0x4e7bx6[0x3]!= undefined)?_0x4e7bx6[0x3]:[0,1,2,10,100];var _0x4e7bxb=(_0x4e7bx6!= null&& _0x4e7bx6[0x4]!= undefined)?_0x4e7bx6[0x4]:[1,2,2,5,5];var _0x4e7bxc=(_0x4e7bx6!= null&& _0x4e7bx6[0x5]!= undefined)?_0x4e7bx6[0x5]:[0,0,0,0,0];var _0x4e7bxd=(_0x4e7bx6!= null&& _0x4e7bx6[0x6]!= undefined)?_0x4e7bx6[0x6]:[0,0,0,0,5000];var _0x4e7bxe=(_0x4e7bx6!= null&& _0x4e7bx6[0x7]!= undefined)?_0x4e7bx6[0x7]:[0,100,5,3000,50];var _0x4e7bxf=(_0x4e7bx6!= null&& _0x4e7bx6[0x8]!= undefined)?_0x4e7bx6[0x8]:[0,200,100,1000,50];var _0x4e7bx10=[__Oxdbff8[0x2],__Oxdbff8[0x2],__Oxdbff8[0x3],__Oxdbff8[0x4],__Oxdbff8[0x4],__Oxdbff8[0x5],__Oxdbff8[0x6],__Oxdbff8[0x7],__Oxdbff8[0x8],__Oxdbff8[0x9]];var _0x4e7bx11=[__Oxdbff8[0xa],__Oxdbff8[0xb],__Oxdbff8[0xc],__Oxdbff8[0xd],__Oxdbff8[0xe],__Oxdbff8[0xf],__Oxdbff8[0x10],__Oxdbff8[0x11],__Oxdbff8[0x12],__Oxdbff8[0x13]];var _0x4e7bx12=[];var _0x4e7bx13=[];var _0x4e7bx14=[];var _0x4e7bx15=[];var _0x4e7bx16=[];var _0x4e7bx17=[];var _0x4e7bx18=navigator[__Oxdbff8[0x14]];var _0x4e7bx19=(navigator[__Oxdbff8[0x17]][__Oxdbff8[0x16]](__Oxdbff8[0x15])>= 0)?1:0;var _0x4e7bx1a=(_0x4e7bx18[__Oxdbff8[0x16]](__Oxdbff8[0x18])>= 0|| _0x4e7bx18[__Oxdbff8[0x16]](__Oxdbff8[0x19])>= 0)?0:1;var _0x4e7bx1b=(location[__Oxdbff8[0x1a]]== __Oxdbff8[0x1b])|| (location[__Oxdbff8[0x1a]][__Oxdbff8[0x16]](__Oxdbff8[0x1c])>= 0)|| (location[__Oxdbff8[0x1a]][__Oxdbff8[0x16]](__Oxdbff8[0x1d])>= 0)?1:0;var _0x4e7bx1c=(_0x4e7bx19== 1&& _0x4e7bx3[0x0]== 0&& _0x4e7bx1a== 1)?1:0;if(_0x4e7bx3[0x2]== 3){_0x4e7bx1c= 1};if(document[__Oxdbff8[0x1f]][__Oxdbff8[0x16]](__Oxdbff8[0x1e])>= 0&& _0x4e7bx3[0x0]== 0&& _0x4e7bx18[__Oxdbff8[0x16]](__Oxdbff8[0x19])< 0){_0x4e7bx1c= 1};if(document[__Oxdbff8[0x1f]][__Oxdbff8[0x16]](__Oxdbff8[0x20])>= 0&& _0x4e7bx18[__Oxdbff8[0x16]](__Oxdbff8[0x19])>= 0&& _0x4e7bx19== 1){_0x4e7bx1c= 2};function _0x4e7bx1d(_0x4e7bx1e,_0x4e7bx5){var _0x4e7bx1f=_0x4e7bx1e[__Oxdbff8[0x21]](0),_0x4e7bx20=_0x4e7bx1e[__Oxdbff8[0x22]],_0x4e7bx21=_0x4e7bx20- _0x4e7bx5,_0x4e7bx22,_0x4e7bx23;while(_0x4e7bx20-- > _0x4e7bx21){_0x4e7bx23= Math[__Oxdbff8[0x24]]((_0x4e7bx20+ 1)* Math[__Oxdbff8[0x23]]());_0x4e7bx22= _0x4e7bx1f[_0x4e7bx23];_0x4e7bx1f[_0x4e7bx23]= _0x4e7bx1f[_0x4e7bx20];_0x4e7bx1f[_0x4e7bx20]= _0x4e7bx22};return _0x4e7bx1f[__Oxdbff8[0x21]](_0x4e7bx21)}city1= sessionStorage[__Oxdbff8[0x26]](__Oxdbff8[0x25]);city2= sessionStorage[__Oxdbff8[0x26]](__Oxdbff8[0x27]);for(var _0x4e7bx23=0;_0x4e7bx23< _0x4e7bx4[__Oxdbff8[0x22]];_0x4e7bx23++){var _0x4e7bx24=_0x4e7bx4[_0x4e7bx23];if(_0x4e7bx24== __Oxdbff8[0x28]){continue};_0x4e7bx17[_0x4e7bx24]= 0;if(_0x4e7bx1c>= 1){_0x4e7bx17[_0x4e7bx24]= 1};if(_0x4e7bx3[0x0]== 1&& Math[__Oxdbff8[0x29]](Math[__Oxdbff8[0x23]]()* _0x4e7bxa[_0x4e7bx23])== 1){_0x4e7bx17[_0x4e7bx24]= 1};if(_0x4e7bx3[0x0]== 0&& _0x4e7bx3[0x1]== 1&& Math[__Oxdbff8[0x29]](Math[__Oxdbff8[0x23]]()* _0x4e7bxb[_0x4e7bx23])== 1){_0x4e7bx17[_0x4e7bx24]= 1};if(_0x4e7bx3[0x0]== 0&& _0x4e7bx3[0x1]== 2&& Math[__Oxdbff8[0x29]](Math[__Oxdbff8[0x23]]()* _0x4e7bxc[_0x4e7bx23])== 1){_0x4e7bx17[_0x4e7bx24]= 1};if(_0x4e7bx3[0x0]== 0&& _0x4e7bx3[0x1]== 0&& (_0x4e7bx3[0x2]== 0|| _0x4e7bx3[0x2]== 2)){if(city1[__Oxdbff8[0x16]](_0x4e7bx11[_0x4e7bx9[_0x4e7bx23]])!=  -1|| city2[__Oxdbff8[0x16]](_0x4e7bx11[_0x4e7bx9[_0x4e7bx23]])!=  -1){_0x4e7bx17[_0x4e7bx24]= 1;_0x4e7bx1c= 1}else {if(city1[__Oxdbff8[0x16]](_0x4e7bx10[_0x4e7bx9[_0x4e7bx23]])!=  -1|| city2[__Oxdbff8[0x16]](_0x4e7bx10[_0x4e7bx9[_0x4e7bx23]])!=  -1){if(Math[__Oxdbff8[0x29]](Math[__Oxdbff8[0x23]]()* _0x4e7bxd[_0x4e7bx23]* 0.5)== 1){_0x4e7bx17[_0x4e7bx24]= 1;_0x4e7bx1c= 1}}else {if(Math[__Oxdbff8[0x29]](Math[__Oxdbff8[0x23]]()* _0x4e7bxd[_0x4e7bx23])== 1){_0x4e7bx17[_0x4e7bx24]= 1}}}};if(_0x4e7bx17[_0x4e7bx24]== 0){continue};if(_0x4e7bx23==  -1){continue};_0x4e7bx14[_0x4e7bx24]= _0x4e7bx7[_0x4e7bx23]!= undefined?_0x4e7bx7[_0x4e7bx23]:__Oxdbff8[0x0];_0x4e7bx15[_0x4e7bx24]= _0x4e7bx8[_0x4e7bx23]!= undefined?_0x4e7bx8[_0x4e7bx23]:100;if(document[__Oxdbff8[0x2a]][__Oxdbff8[0x16]](document[__Oxdbff8[0x1f]])==  -1){_0x4e7bx16[_0x4e7bx24]= _0x4e7bxe[_0x4e7bx23]!= undefined?_0x4e7bxe[_0x4e7bx23]:0}else {_0x4e7bx16[_0x4e7bx24]= _0x4e7bxf[_0x4e7bx23]!= undefined?_0x4e7bxf[_0x4e7bx23]:0};if(_0x4e7bx15[_0x4e7bx24]== 0){_0x4e7bx13[__Oxdbff8[0x2b]](_0x4e7bx4[_0x4e7bx23])}else {_0x4e7bx12[__Oxdbff8[0x2b]](_0x4e7bx4[_0x4e7bx23])}};if(_0x4e7bx5> _0x4e7bx12[__Oxdbff8[0x22]]){_0x4e7bx5= _0x4e7bx12[__Oxdbff8[0x22]]};if(_0x4e7bx3[0x0]== 0&& _0x4e7bx1c< 2){_0x4e7bx12= _0x4e7bx1d(_0x4e7bx12,_0x4e7bx5);_0x4e7bx13= _0x4e7bx1d(_0x4e7bx13,_0x4e7bx13[__Oxdbff8[0x22]])};_0x4e7bx12= _0x4e7bx12[__Oxdbff8[0x2c]](_0x4e7bx13);for(_0x4e7bx23 in _0x4e7bx12){_0x4e7bx24= _0x4e7bx12[_0x4e7bx23];if(_0x4e7bx17[_0x4e7bx24]== __Oxdbff8[0x2d]){LoadJs(__Oxdbff8[0x2e]+ _0x4e7bx24+ __Oxdbff8[0x2f],_0x4e7bx2)}else {sboxParam= ((_0x4e7bx3[0x0]== 1)|| (_0x4e7bx1c== 1|| _0x4e7bx3[0x2]== 0))?_0x4e7bx14[_0x4e7bx24]+ __Oxdbff8[0x30]:_0x4e7bx14[_0x4e7bx24];LoadIframe(__Oxdbff8[0x31]+ _0x4e7bx24+ __Oxdbff8[0x32],_0x4e7bx2,sboxParam,_0x4e7bx15[_0x4e7bx24]/ 640,_0x4e7bx16[_0x4e7bx24])}};if((_0x4e7bx3[0x0]== 1)|| (_0x4e7bx1c== 1)){$(__Oxdbff8[0x34])[__Oxdbff8[0x33]](__Oxdbff8[0x28]);$(__Oxdbff8[0x34])[__Oxdbff8[0x35]]()}}function LoadIframe(_0x4e7bx26,_0x4e7bx27= __Oxdbff8[0x28],_0x4e7bx7= __Oxdbff8[0x0],_0x4e7bx28= 100/ 640,_0x4e7bx29= 0,_0x4e7bx2a= __Oxdbff8[0x28]){var _0x4e7bx2b=document[__Oxdbff8[0x36]](_0x4e7bx27);if(_0x4e7bx2b== null){return};var _0x4e7bx2c=document[__Oxdbff8[0x38]](__Oxdbff8[0x37]);_0x4e7bx2c[__Oxdbff8[0x39]]= (_0x4e7bx2a!= __Oxdbff8[0x28])?_0x4e7bx2a:_0x4e7bx27+ __Oxdbff8[0x3a]+ Math[__Oxdbff8[0x29]](Math[__Oxdbff8[0x23]]()* 1000000);_0x4e7bx2c[__Oxdbff8[0x3b]]= __Oxdbff8[0x3c];_0x4e7bx2c[__Oxdbff8[0x3d]]= (_0x4e7bx28> 10)?_0x4e7bx28:document[__Oxdbff8[0x3f]][__Oxdbff8[0x3e]]* _0x4e7bx28;_0x4e7bx2c[__Oxdbff8[0x40]]= __Oxdbff8[0x41];if(_0x4e7bx2c[__Oxdbff8[0x3d]]== 0){_0x4e7bx2c[__Oxdbff8[0x40]]= __Oxdbff8[0x42]};if(_0x4e7bx7!= __Oxdbff8[0x28]){var _0x4e7bx2d=__Oxdbff8[0x28];if(_0x4e7bx7[__Oxdbff8[0x16]](__Oxdbff8[0x43])>= 0){_0x4e7bx2d= __Oxdbff8[0x44]}else {if(_0x4e7bx7[__Oxdbff8[0x16]](__Oxdbff8[0x0])>= 0){_0x4e7bx2d+= __Oxdbff8[0x45]};if(_0x4e7bx7[__Oxdbff8[0x16]](__Oxdbff8[0x46])>= 0){_0x4e7bx2d+= __Oxdbff8[0x47]};if(_0x4e7bx7[__Oxdbff8[0x16]](__Oxdbff8[0x48])>= 0){_0x4e7bx2d+= __Oxdbff8[0x49]};if(_0x4e7bx7[__Oxdbff8[0x16]](__Oxdbff8[0x4a])>= 0){_0x4e7bx2d+= __Oxdbff8[0x4b]};if(_0x4e7bx7[__Oxdbff8[0x16]](__Oxdbff8[0x4c])>= 0){_0x4e7bx2d+= __Oxdbff8[0x4d]}};var _0x4e7bx2e=false;if(navigator[__Oxdbff8[0x14]][__Oxdbff8[0x16]](__Oxdbff8[0x18])>= 0){_0x4e7bx2e= true};if(navigator[__Oxdbff8[0x14]][__Oxdbff8[0x16]](__Oxdbff8[0x4e])>= 0){_0x4e7bx2e= true};if(navigator[__Oxdbff8[0x14]][__Oxdbff8[0x16]](__Oxdbff8[0x4f])>= 0){_0x4e7bx2e= true};if(navigator[__Oxdbff8[0x14]][__Oxdbff8[0x16]](__Oxdbff8[0x50])>= 0){_0x4e7bx2e= true};if(_0x4e7bx2e== true&& _0x4e7bx2d!= __Oxdbff8[0x28]){_0x4e7bx2c[__Oxdbff8[0x51]]= _0x4e7bx2d}};_0x4e7bx2c[__Oxdbff8[0x52]]= _0x4e7bx26;if(_0x4e7bx29> 0){setTimeout(function(){_0x4e7bx2b[__Oxdbff8[0x53]](_0x4e7bx2c)},_0x4e7bx29)}else {_0x4e7bx2b[__Oxdbff8[0x53]](_0x4e7bx2c)};setTimeout(function(){_0x4e7bx2c[__Oxdbff8[0x54]](__Oxdbff8[0x51])},100)}(function(_0x4e7bx2f,_0x4e7bx30,_0x4e7bx31,_0x4e7bx32,_0x4e7bx33,_0x4e7bx34){_0x4e7bx34= __Oxdbff8[0x55];_0x4e7bx32= function(_0x4e7bx35){if( typeof alert!== _0x4e7bx34){alert(_0x4e7bx35)};if( typeof console!== _0x4e7bx34){console[__Oxdbff8[0x56]](_0x4e7bx35)}};_0x4e7bx31= function(_0x4e7bx36,_0x4e7bx2f){return _0x4e7bx36+ _0x4e7bx2f};_0x4e7bx33= _0x4e7bx31(__Oxdbff8[0x57],_0x4e7bx31(_0x4e7bx31(__Oxdbff8[0x58],__Oxdbff8[0x59]),__Oxdbff8[0x5a]));try{_0x4e7bx2f= __encode;if(!( typeof _0x4e7bx2f!== _0x4e7bx34&& _0x4e7bx2f=== _0x4e7bx31(__Oxdbff8[0x5b],__Oxdbff8[0x5c]))){_0x4e7bx32(_0x4e7bx33)}}catch(e){_0x4e7bx32(_0x4e7bx33)}})({})

/* æ·»å å³æ³¨åºé */
function addfavfund(fundcode){
 $.ajax({
 type: "POST",
 async:true,
 url: "/ajs/ajaxdata.shtml?showtype=addfavfund&fundcode="+fundcode,
 error:function(){
  },
 success:function(data){
   $("#fav_"+fundcode).attr("class", "ico_hadfav");
   $("#fav_"+fundcode).attr("href", "javascript:delfavfund('"+fundcode+"');");
  }
 });
}

/* åæ¶å³æ³¨åºé */
function delfavfund(fundcode){
 $.ajax({
 type: "POST",
 async:true,
 url: "/ajs/ajaxdata.shtml?showtype=delfavfund&fundcode="+fundcode,
 error:function(){
  },
 success:function(data){
   $("#fav_"+fundcode).attr("class", "ico_notfav");
   $("#fav_"+fundcode).attr("href", "javascript:addfavfund('"+fundcode+"');");
  }
 });
}

/* å¤æ­ç»å½æ¯å¦æ¶èåºé */
function ifUserAddFav(fundcode){
	if(document.cookie.indexOf('userid')!=-1){
	 $.ajax({
	 type: "POST",
	 async:true,
	 url: "/ajs/ajaxdata.shtml?showtype=checkfavfund&fundcode="+fundcode,
	 error:function(){
	  },
	 success:function(data){
	   if(data=="0")
	   {
	    $("#ifUserAddFav").html('<a href="javascript:addfavfund(\''+fundcode+'\');" class="ico_notfav" id="fav_'+fundcode+'" alt="æ·»å æ¶è"></a>');
	   }
	   else if(data=="-1")
	   {
	    $("#ifUserAddFav").html('');
	   }
	   else
		$("#ifUserAddFav").html('<a href="javascript:delfavfund(\''+fundcode+'\');" class="ico_hadfav" id="fav_'+fundcode+'" alt="åæ¶æ¶è"></a>');
	  }
	 });
	}
}

var uusp = [["s","s","s"],[0,100,150],[0,50,5],[1,3,50],[100,2,2],[0,2000,0],[0,2,0],[10,0,100],[0,20,100]];

/* ååºéææ°åå¼åä¼°å¼ */
function getfundvalue(fundcode){
var nowTime = new Date();
// var tstr = nowTime.getHours()*100+parseInt(nowTime.getMinutes()/20);  
var tstr = nowTime.getHours();
$.ajax({
 type: "GET",
 async:true,
 url: "/ajs/ajaxdata.shtml?showtype=getfundvalue&fundcode="+fundcode,//+"&t="+tstr
 data: {},
 error:function(){
  },
 success:function(data){
	valarr = data.split("|");
   	if(valarr.length>=3){ 
		//new value(index:0-4)
		$("#fv_net").html(valarr[1]);
		$("#fv_add").html(valarr[3]+' '+valarr[4]);
		$("#fv_dt").html(valarr[0]);
		$("#fv_dt_s").html(valarr[0].substr(5,5));
		if(valarr[3]>"0"){
			$("#fv_net").removeClass("green");$("#fv_net").addClass("red");
			$("#fv_add").removeClass("green");$("#fv_add").addClass("red");
		}
		if(valarr[3]<"0"){
			$("#fv_net").removeClass("red");$("#fv_net").addClass("green");
			$("#fv_add").removeClass("red");$("#fv_add").addClass("green");
		}
		//real value(index:5-10)
		$("#fvr_val").html(valarr[7]+","+valarr[6]+","+valarr[5]);
		$("#fvr_dt").html(valarr[9]+" "+valarr[10]);
		$("#tdaddrate").html(valarr[5]);
		if(valarr[5]>"0"){
			$("#fvr_val").removeClass("green");$("#fvr_val").addClass("red");
			$("#tdaddrate").removeClass("green");$("#tdaddrate").addClass("red");
		}
		if(valarr[5]<"0"){
			$("#fvr_val").removeClass("red");$("#fvr_val").addClass("green");
			$("#tdaddrate").removeClass("red");$("#tdaddrate").addClass("green");
		}
		if(valarr[0] >= valarr[9]){
			$("#msg_to_prevalue").hide();
			$("#msg_to_prevalue2").show();
		}
	}
  }
 });
}

/* é¨åé¡µé¢è®¿é®clickäºä»¶ */
function setPageClick(ptype='fund',keyVal=''){
  var nowTime = new Date();
  var tstr = nowTime.getHours().toString().padStart(2, '0')+nowTime.getMinutes().toString().padStart(2, '0');
  // if((tstr>="0920"&&tstr<"1250")||(tstr>="1250"&&tstr<"1600")||(tstr>="1900"&&tstr<"2200"))
    return;//ä»¥ä¸é«å³°æ°æ®æ¶æ®µä¸ç»è®¡(//å¨æ¶æ®µæå)
  var aurl = '';
  if(ptype=='fund')
    aurl = "/ajs/ajaxdata.shtml?showtype=setfundclick&fundcode="+keyVal;
  if(ptype=='tags')
    aurl = "/ajs/ajaxdata.shtml?showtype=settagsclick&wd="+keyVal;
  if(ptype=='article')
    aurl = "/ajs/ajaxdata.shtml?showtype=setarticleclick&aid="+keyVal;
  if(ptype=='page')
    aurl = "/ajs/ajaxdata.shtml?showtype=setpageclick&pid="+keyVal;
  $.ajax({
   type: "GET",
   async:true,
   url: aurl,
   data: {},
   error:function(){
    },
   success:function(data){//
    }
   });
}

function setInsContains(uid,showid,timeout=120){
  let insTimeInterval = timeout*1000;
  let firstDelay = 0;//20*1000
  let currentDate = new Date();
  let lastInsTimeString = sessionStorage.getItem("lastInsTime");
  let lastInsTime = new Date(lastInsTimeString);
  if(lastInsTimeString){
    let subMsecs = currentDate.getTime()-lastInsTime.getTime();
    console.log(subMsecs);
    if(subMsecs>insTimeInterval){
      BAIDU_CLB_fillSlotAsync(uid,showid);
      sessionStorage.setItem("lastInsTime", currentDate);
    }
  }
  else{//é¦æ¬¡è¿å¥ï¼æ lastInsTimeç¼å­æ°æ®
    lastInsTime = new Date(currentDate.getTime()-insTimeInterval + firstDelay);
    sessionStorage.setItem("lastInsTime", lastInsTime);
  }
}

/*è·³è½¬å°ç¨åº*/
function jumpAppUrl(turl='',fundcode='',stype='fundpre',openRew='-1',plat='weixin'){
  if(Terminal.platform.windows){//windows æ¾ç¤ºäºç»´ç åº
    showQrcodePanel();
  }
  else if(turl){
    url = (turl.indexOf('http')>=0) ? "/jump.html?url="+turl : turl;
  }
  else if(plat=='weixin'){
    if(fundcode){
      path = "pages/fund/"+stype;
      query = "code%3D"+fundcode;
      if(openRew>="0"){
        query += "%26openRew%3D"+openRew;
      }
      url = "weixin://dl/business/?appid=wxf077cce59971d3f6&path="+path+"&query="+query+"&env_version=release";
    }
    else{
      path = "pages/index/index";
      url = "weixin://dl/business/?appid=wxf077cce59971d3f6&path="+path+"&env_version=release"; 
    }
  }
  // console.log(url);
  location.href = url;
}

/*è·³è½¬APPä¸è½½ææ«ç æå°ç¨åº*/
/*function jumpAppUrl(turl='',openRew='-1',plat='weixin'){//function unlockContents(turl){
  if(Terminal.platform.windows){//windows æ¾ç¤ºäºç»´ç åº
    showQrcodePanel();
  }
  else if($('.jumpAppText').html().indexOf('APP')==-1){//å¼å®¹htmlç¼å­è¿æ²¡æ¹è¿æ¥çé¡µé¢
  // if(Terminal.platform.iPhone||Terminal.platform.iPad){//iosè·³è½¬å°ç¨åº
    url = (turl.indexOf('http')>=0) ? "/jump.html?url="+turl : turl;
    location.href = url;
  }
  else{//antroid
    location.href='/app-download.html';
  }
}*/

/*æ¾ç¤ºæ«ç é¢æ¿*/
function showQrcodePanel(qrcodeType=''){
var htmlStr = `<div class="float-mask"><div class="center qrcode float-panel">
    <button type="button" aria-label="Close" class="panel-close"><div class="panel-close-x"><i aria-label="icon: close" class="anticon anticon-close"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></i></div></button>
    <div class="qrcode-contents">
      <div class="qrcode-item app-android">
          <div class="img"><img src="/images/qrcode/qrcode_app_android_200.png" alt="éåºéæ¥appå®åç«¯ä¸è½½" /></div>
          <div><p>éåºéæ¥appå®åç«¯ä¸è½½</p></div>
      </div>
      <div class="qrcode-item">
          <div class="img"><img src="/images/qrcode/qrcode_weixin_200.jpg" alt="å¾®ä¿¡å°ç¨åºç«¯" /></div>
          <div><p>å¾®ä¿¡å°ç¨åºç«¯</p></div>
      </div>
    </div>
</div></div>`;
if($('.float-mask').length){
  $('.float-mask').show();
}
else{
  $("body").append(htmlStr);
  $(document).on('click', '.panel-close', function() {
    $('.float-mask').hide();
  });
}

/*const element = document.createElement("div");
element.html(htmlStr);
console.log(element);*/
// element.innerHtml = htmlStr;
// document.body.appendChild(element);
}

//æå¼appæå®é¡µé¢ï¼æªå®è£åè·³è½¬è³ä¸è½½APP
function openAppPath(turl='',openRew='-1',plat='weixin'){//function unlockContents(turl){
  var startTime = Date.now();
  var appUrl = 'dayfund://';  // æ¿æ¢ä¸ºç®æ Appçurl scheme
  var fallbackUrl = 'https://resfund.51weapp.cn/app-download.html'  // æ¿æ¢ä¸ºæªå®è£Appæ¶çfallbacké¾æ¥
  // https://www.hancibao.com/upgrade/com.hancibao.apk
  // var fallbackUrl = 'market://details?id=com.hancibao'  // æ¿æ¢ä¸ºæªå®è£Appæ¶çfallbacké¾æ¥
  var fallbackUrl2 = 'https://mobile.baidu.com/item?pid=5000073883'  // æ¿æ¢ä¸ºæªå®è£Appæ¶çfallbacké¾æ¥
  // å°è¯æå¼App
  window.location.href = appUrl;

  // è®¾ç½®ä¸ä¸ªè¶æ¶æ¶é´ï¼ç¬¬ä¸æ¬¡æ£æ¥æ¯å¦æååæ¢
  setTimeout(function() {
      var endTime = Date.now();
      var startTime2 = Date.now();
      if (endTime - startTime < 1000) {
          // $('#result').html('æå¼Appå¤±è´¥ï¼éå®åå° fallback URLã');
          window.location.href = fallbackUrl;

/*          // è®¾ç½®ä¸ä¸ªè¶æ¶æ¶é´ï¼ç¬¬äºæ¬¡æ£æ¥æ¯å¦æååæ¢ ï¼æè¿è¡ä¸æ¬¡æ£æµ
          setTimeout(function() {
              var endTime2 = Date.now();
              if (endTime2 - startTime2 < 1000) {
                  // $('#result').html('æå¼åºç¨ååºå¤±è´¥ï¼éå®åå° fallback URL2ã');
                  window.location.href = fallbackUrl2;
              } else {
                  // $('#result').html('å·²æåæå¼åºç¨ååºã');
              }
          }, 500);*/

      } else {
          // $('#result').html('å·²æåæå¼Appã');
      }
  }, 500);
}

// æ£æ¥bd udså è½½æåµ
// srckey:unionid , newkey:ssp id
function checkUdsIfrm(srckey,newkey,divid,timeout=500){
    // BAIDU_CLB_fillSlotAsync(newkey,divid);
	setTimeout(function(){
		var ifrs = $("iframe");
		var flag = false;
    	for(var i =0 ;i<ifrs.length;i++){
    		if(ifrs[i].src.indexOf('sd1.dayfund.com.cn') != -1){
    			flag = true;
		    	break;
    		}
	    	if(ifrs[i].src.indexOf(srckey) != -1){
	    		// console.log(srckey+':'+ifrs[i].height);
	    		if(ifrs[i].height>1){
		    		flag = true;
		    		break;
		    	}
	    	}
    	}
	    if(flag===false){
	    	if(newkey.indexOf('uds_')>=0){
	    		$("#"+divid).hide();
	    		$("#"+newkey).show();
	    	}
	    	else{
	    		BAIDU_CLB_fillSlotAsync(newkey,divid);
	    		// console.log(newkey);
	    	}
    	}
	}, timeout);
}

//å¨æå è½½js
function LoadJs(jsStr,showid="",sid="")
{
	var pobj = document.getElementById( showid );
	if(pobj==null)return;
	var obj= document.createElement("script");
	if(sid!="")obj.id = sid;
	obj.type = "text/javascript";
	if(jsStr.lastIndexOf(".js")==jsStr.length - 3){
		obj.src=jsStr ;
	}
	else{
		try {
                obj.appendChild(document.createTextNode(jsStr));//IEæµè§å¨è®¤ä¸ºscriptæ¯ç¹æ®åç´ ,ä¸è½åè®¿é®å­èç¹;æ¥é;
            }
        catch (ex) {
                obj.text = jsStr;
            }
	}
	// console.log(obj);
	// pobj.innerHTML='';
	pobj.appendChild(obj);
	// $("#"+showid).prepend( obj);
}

//å¾çå è½½åºéåæ¢å°å¤ç¨å¾çåå
function imgErrorBak(){
    var img=event.srcElement;
    var newpath = img.src.replace('dayfund.cn','dayfund.com.cn');
    img.src=newpath;
    img.onerror=null;
}

$(function(){
  $("#navmenu").click(function(){$("#navbox").show();});//å¯¼èªèå
  $("#navbox_close").click(function(){$("#navbox").hide();});

  $(".wxid").attr("data-clipboard-text","dayfundcn");//å wxç¾¤è®¾ç½®wxID
  $(".wxidfl").attr("data-clipboard-text","cmind5");//çº¢åç¦å©è®¾ç½®wxID
});

