/**
 * 命名
 * 〇〇Id ...HTML内のID名
 * 〇〇   ...DOM
 */
var n = 1;
var inputId = "input_"+n;
var imgId = "img_"+n;
var reader = new FileReader();
var inputElement;
var formElement;
var imgElLen;
var imgIds =Array();
const FORM_ID = "myForm"; //任意
const SAVE_URL = "/img/";     //任意
const INPUT_CLASS = "input_class"; //任意
const IMG_CLASS = "img_class" //任意

function sousin(){
    organizeInputNode();
    changeSrc();

    document.myForm.submit();  //form name
}

function imgRead(e){
    var target = e.target;
    var file = target.files[0];
    var fileType = file.type;
    if(fileType=="image/jpeg"||fileType=="image/png"){

    }else{
        inputId.value="";
        return;
    }
    reader.readAsDataURL(file);
}

function fileLoad(){
    var src = reader.result;
    document.execCommand('insertHTML',false,'<img src="'+src+'" id="'+imgId+'" class="'+IMG_CLASS+'">');
    createInputNode(); //新ノード追加
}

function selectImg(){
    document.getElementById(inputId).click();
    // return false;
}

window.onload=function(){
    reader.addEventListener('load',fileLoad,false);
    formElement = document.getElementById(FORM_ID);

    inputElement = document.getElementById(inputId);
    inputElement.addEventListener('change',imgRead,false);
}

/**
 * 新inputノード追加
 */
function createInputNode(){
    var newInput = document.createElement("input");//新inputノード
    newInput.type = "file"; 
        n++;//inputId カウントあっぷ
        inputId = "input_"+n;
        imgId   = "img_"+n;
    newInput.name = inputId;
    newInput.accept = "image/*";
    newInput.setAttribute("id",inputId);
    newInput.setAttribute("class",INPUT_CLASS);
    formElement.appendChild(newInput); //追加

    //値が変わったから再セット
    inputElement = document.getElementById(inputId);
    inputElement.addEventListener('change',imgRead,false);
}


/**
 * 送信ボタンが押されたら、submit前に行う処理
 * 1.いらないinputノードの処理(編集エリア内に残ってる画像とinputのidを比較して、
 * 　エリアに存在しないinputノードを消す。)
 * 2.エリア内のimgのsrcを正規のリンクに書き換える
 * 
 * indexOf
 * https://www.sejuku.net/blog/22228
 */

 /**
  * imgのクラスとinputのクラスのエレメントを配列化し、
  * 合致しないとこを探す
  */
 /**
  * inputノード整理
  */
 function organizeInputNode(){
    var inputElements = document.getElementsByClassName(INPUT_CLASS);
    var imgElements = document.getElementsByClassName(IMG_CLASS);
    var inputElLen = inputElements.length;
    imgElLen = imgElements.length;
    var serch;
    // var imgIds =Array();

    for(var n=0;n<imgElLen;n++){
        imgIds[n]=imgElements[n].id; 
    }

    if(imgElLen!==inputElLen-1){ //画像数＝input数-１か
        //画像数と不一致，不一致箇所検索
        console.log(imgIds);
        for(var i=1;i<=inputElLen;i++){ //inputの数-1だけ回す
            serch = "img_"+i;
            if(imgIds.indexOf(serch)==-1){ //imgIdsにserchが存在しない
                deleteInputNode(i);
            }
        }
    }else{
        //画像数一致．後ろの空だけ消す．
        deleteInputNode(inputElLen);
    }
 }

 /**
  * input削除
  */
function deleteInputNode(num){
    var nowInputId;
    var nowInputIdEl;

    nowInputId = "input_"+num;
    nowInputIdEl = document.getElementById(nowInputId);
    formElement.removeChild(nowInputIdEl);  
}

/**
 * src書き換え
 */
function changeSrc(){
    var num;
    var inputId_a;
    var inputElement_a;
    var fileName;
    for(var x=0; x<imgElLen; x++){
        num = imgIds[x].slice(4); //id切り出し
        inputId_a ="input_"+num; //input_id結合
        inputElement_a  = document.getElementById(inputId_a);
        imgElement_a = document.getElementById(imgIds[x]);
        fileName = inputElement_a.files[0].name;
        console.log(fileName);
        imgElement_a.src=SAVE_URL+fileName;
    }
}