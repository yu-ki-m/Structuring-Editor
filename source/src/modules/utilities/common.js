
import axios from "axios";
class CommonUtilities {
    constructor () {}

    test(url){
        axios.get(url)
        .then(function(response){
            console.log(response);
        }.bind(this))
        .catch(function(error){
            console.log(error)
        }.bind(this))
        .finally(function(){
        }.bind(this))
    }

    sleep(waitMsec) {
        var startMsec = new Date();
        while (new Date() - startMsec < waitMsec);
    }
    getUniqueStr(){
        let strong =  100000000000
        return (new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16))+ Math.floor(strong*Math.random()).toString(16);
    }

    parseHtmlToText(html){
        let text = ""
        if(html != ""){
            text = html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
            let replaceChar = [{r:"&amp;",v:"&"},{r:"&lt;",v:"<"},{r:"&gt;",v:">"},]
            replaceChar.forEach(
                (char)=>{
                    text = text.replace(char.r,char.v);
                }
            )
        }
        return text
    }

    getStyles(document){
        let styles = "";
        document.styleSheets.forEach(
            (cssStyleSheet)=>{
                try{
                    cssStyleSheet.cssRules.forEach(
                        (cssRule)=>{
                            try{
                                styles = styles + " " +cssRule.cssText;
                            }catch(e){
                                //なにもしない
                            }
                        }
                    )
                }catch(e){
                    //なにもしない
                }
            }
        )
        return styles;
    }
    getCssHref(document){
        let cssList = [];
        document.styleSheets.forEach(
            (cssStyleSheet)=>{
                try{
                    let href = cssStyleSheet.href
                    if(href != undefined){
                        cssList.push(href)
                    }
                }catch(e){
                    //なにもしない
                }
            }
        )
        return cssList;
    }
    createExportHtml(jsonData,document){
        let jsonContent = "<div style='display:none;' class='sheet_structuring_json_data'><structuring>"+JSON.stringify(jsonData,null,"    ")+"</structuring></div>";

        let headInner = ""
        for(let i = 0;i<document.head.children.length;i++){
            if(document.head.children[i].nodeName == "STYLE"
                || document.head.children[i].nodeName == "META" 
                || document.head.children[i].nodeName == "TITLE" 
                ){
                headInner = headInner + document.head.children[i].outerHTML
            }
            if(document.head.children[i].nodeName == "LINK" 
                ){
                if(document.head.children[i].getAttribute('as') == "style"
                    || document.head.children[i].getAttribute('rel') == "stylesheet"
                ){
                    headInner = headInner + document.head.children[i].outerHTML
                }
            }
        }
        let headContent = "<head>"+headInner+"</head>";
        let styleBody = ""
        for(let i = 0;i<document.body.children.length;i++){
            if(document.body.children[i].nodeName == "STYLE"  ){
                styleBody = styleBody + document.body.children[i].outerHTML
            }
        }

        let innerBody = "";
        innerBody = innerBody+ styleBody+ document.getElementById('export-html').outerHTML
        let bodyContent = "<body>"+innerBody+"</body>";
        let styleDisable = "<style>"+"button{display:none !important;}"+"</style>";
        styleDisable = styleDisable+"<style>"+".not-export-html{display:none !important;}"+"</style>"
        let htmlContent = "<html>"+headContent+styleDisable+bodyContent+jsonContent+"</html>";
        let content = htmlContent;

        return content
    }

    
    htmlBodyDownload(name = "" ,versionName="",existTimeStamp="",jsonData, document ){

        let content = this.createExportHtml(jsonData,document)
        let sheetName = name == "" ? "":name
        let sheetVersionName = sheetName == "" ? versionName :"_"+versionName
        let timeStamp = existTimeStamp != "" ? "_"+(existTimeStamp.replaceAll("/","").replaceAll(":","").replaceAll(" ","")) :"";
        
        let nonName = sheetName == "" && sheetVersionName == "" && timeStamp == "" ? 
            (new Date().toLocaleString().replaceAll("/","").replaceAll(":","").replaceAll(" ","")):""

        let fileName = nonName+ sheetName +""+sheetVersionName+""+timeStamp+".structuring.html"

        this.fileDownload(fileName,content,document)
    }
    fileDownload(fileName,content,document){
        var downLoadLink = document.createElement("a");
        downLoadLink.download = fileName;
        downLoadLink.href = URL.createObjectURL(new Blob([content], {type: "text.plain"}));
        downLoadLink.dataset.downloadurl = ["text/plain", downLoadLink.download, downLoadLink.href].join(":");
        downLoadLink.click();
    }

    jsonDownload(name = "" ,versionName="",existTimeStamp="",jsonData, document ){
        var content = JSON.stringify(jsonData,null,'    ' );
        let sheetName = name == "" ? "":name
        let sheetVersionName = sheetName == "" ? versionName :"_"+versionName
        let timeStamp = existTimeStamp != "" ? "_"+(existTimeStamp.replaceAll("/","").replaceAll(":","").replaceAll(" ","")) :"";
        
        let nonName = sheetName == "" && sheetVersionName == "" && timeStamp == "" ? 
            (new Date().toLocaleString().replaceAll("/","").replaceAll(":","").replaceAll(" ","")):""

        let fileName = nonName+ sheetName +""+sheetVersionName+""+timeStamp+".structuring.json"

        this.fileDownload(fileName,content,document)
    }
    attendVueIdToArray(array,$set){
        if (array == undefined){
            return array
        }
        if( array.length <= 0){
            return array
        }
        array.forEach(
            (v)=>{
                if(v.symVueId == undefined){
                    let symVueIdSym = Symbol('vueLoopId')
                    $set(v ,"symVueId",symVueIdSym)//vueループ用Id
                    $set(v,symVueIdSym,this.getUniqueStr())//vueループ用Id
                }
            }
        )
        return array;
    }
    attendVueIdToObject(obj,$set,getUniqueStr){
        if (obj == undefined){
            return obj
        }
        if(obj.symVueId == undefined){
            let symVueIdSym = Symbol('vueLoopId')
            $set(obj ,"symVueId",symVueIdSym)//vueループ用Id
            $set(obj,symVueIdSym,getUniqueStr())//vueループ用Id
        }
        return obj;
    }

    execCopy(string){
        // 空div 生成
        var tmp = document.createElement("div");
        // 選択用のタグ生成
        var pre = document.createElement('pre');
        // 親要素のCSSで user-select: none だとコピーできないので書き換える
        pre.style.webkitUserSelect = 'auto';
        pre.style.userSelect = 'auto';
        tmp.appendChild(pre).textContent = string;
        // 要素を画面外へ
        var s = tmp.style;
        s.position = 'fixed';
        s.right = '700%';
        // body に追加
        document.body.appendChild(tmp);
        // 要素を選択
        document.getSelection().selectAllChildren(tmp);
        // クリップボードにコピー
        var result = document.execCommand("copy");
        // 要素削除
        document.body.removeChild(tmp);
        return result;
    }
}
var commonUtilities = new CommonUtilities()
export { commonUtilities };