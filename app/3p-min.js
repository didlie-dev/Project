/********** Not free software **********/
/***************************************/
/*** _3p.js and _3p-min.js are the *****/
/*** exclusive property of the owner ***/
/*** and original author: **************/
/*** Isaac Krishna Jacobs Christopher **/
/*** Deilson. This work has only one ***/
/*** author. This work is not free *****/
/*** this work, the code, the design ***/
/*** the file name and the program *****/
/*** functionality are the exclusive ***/
/*** property of the author and can ****/
/*** only be used by other parties with*/
/*** written contractual permission of */
/*** the author. To purchase a license */
/*** to use this design and/or program */
/*** you can contact the author to *****/
/*** purchase a license via email: *****/
/*** arvinsmail@gmail.com **************/
/*** everforward@live.com **************/
/*** The use of this program and/or ****/
/*** design without a contract with ****/
/*** the author, is a violation of *****/
/*** copyright. ************************/
/***************************************/
/***************************************/
var _3p=function(){function l(l){return"left"===l?f:"center"===l?u:"right"===l?H:!1}function e(e,n){var s;(s=l(e))&&(s.innerHTML=n)}function n(e,n){var s;(s=l(e))&&s.appendChild(n)}function s(){""!==m.innerHTML?m.style.display="block":m.style.display="none"}function y(){""!==T.innerHTML?(T.style.display="none",k=g.scrollHeight,T.style.top=k-0+"",T.style.display="block",k=g.scrollHeight):T.style.display="none"}function t(){L.style.display="none"===H.style.display&&""!==H.innerHTML||"none"===u.style.display&&"block"===f.style.display?"block":"none",M.style.display="none"===f.style.display&&""!==f.innerHTML||"none"===u.style.display&&"block"===H.style.display?"block":"none"}function i(){var l=b/320,e=Math.floor((Math.floor((c-b)/2)-1)/l)
f.style.marginLeft="block"===f.style.display?e:0,u.style.marginLeft="block"===u.style.display?e:0,H.style.marginLeft="block"===H.style.display?e:0}function o(){s()
var l
c=g.clientWidth,r=g.clientHeight,k=g.scrollHeight,639>=c?(b=320,"block"==H.style.display&&""!==H.innerHTML?(l="right",f.style.display="none",u.style.display="none"):"block"==f.style.display&&""!==f.innerHTML&&"none"===u.style.display?(l="left",H.style.display="none",u.style.display="none"):(l="center",H.style.display="none",f.style.display="none",u.style.display="block")):959>=c&&c>639?(b=640,u.style.display="block","block"===H.style.display&&""!==H.innerHTML?(l="center",f.style.display="none"):"block"===f.style.display&&""!==f.innerHTML?(l="left",H.style.display="none"):""!==H.innerHTML?(l="center",H.style.display="block",f.style.display="none"):""!==f.innerHTML?(l="left",f.style.display="block",H.style.dispaly="none"):""===f.innerHTML&&""===H.innerHTML?(b-=320,l="center",f.style.display="none",H.style.display="none"):(f.style.display=""==f.innerHTML?"none":"block",H.style.display=""==H.innerHTML?"none":"block")):c>959&&(b=960,""!=H.innerHTML?H.style.display="block":(b-=320,H.style.display="none"),""!=f.innerHTML?(l="left",f.style.display="block"):(b-=320,l="center",f.style.display="none"),u.style.display="block"),t(),i(),y()}function d(){s()
var l;(""!==H.innerHTML&&"none"==H.style.display||"none"==u.style.display&&"block"==f.style.display)&&("block"===f.style.display&&"none"===u.style.display?(l="center",u.style.display="block",f.style.display="none"):"none"===f.style.display&&"block"===u.style.display?(l="right",u.style.display="none",H.style.display="block"):"block"===f.style.display&&"block"===u.style.display&&(l="center",f.style.display="none",H.style.display="block"),i()),t()}function a(){s()
var l;(""!==f.innerHTML&&"none"===f.style.display||"none"==u.style.display&&"block"==H.style.display)&&("block"===H.style.display&&"none"===u.style.display?(l="center",u.style.display="block",H.style.display="none"):"none"===H.style.display&&"block"===u.style.display?(l="left",u.style.display="none",f.style.display="block"):"block"===H.style.display&&"block"===u.style.display&&(l="left",H.style.display="none",f.style.display="block"),i()),t()}function p(l){switch(l){case"center":if("none"===u.style.display)for(var e="block"===L.display?L:M;"none"===u.style.display;)e.click()
break
case"left":if("none"===f.style.display&&""!==f.innerHTML)for(;"none"===f.style.display;)M.click()
break
case"right":if("none"===H.style.display&&""!==H.innerHTML)for(;"none"===H.style.display;)L.click()}}var c,r,k,b,f=document.getElementById("_3p-left-body"),u=document.getElementById("_3p-center-body"),H=document.getElementById("_3p-right-body"),g=document.getElementsByTagName("body")[0],L=document.getElementById("_3p-right"),M=document.getElementById("_3p-left"),T=document.getElementById("_3p-footer"),m=document.getElementById("_3p-header")
return L.onclick=d,M.onclick=a,g.onscroll=function(){k<g.clientHeight&&y()},{adjust:o,scroll_right:d,scroll_left:a,fill:e,append:n,select_panel:p}}()
window.onresize=_3p.adjust,window.onload=_3p.adjust;
