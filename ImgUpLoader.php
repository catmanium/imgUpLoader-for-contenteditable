<?php
/**
 * クラス化
 */


class ImgUpLoader{

    /**
     * エラー無，成功....true
     * それ以外.........エラー文
     */
    public function sendImg($path){
        $messages=array();
        $file;
        $error;
        $fileKeys=array();
        $imgDirPath=$path;
        $filePath;
        $success;

        $fileKeys=array_keys($_FILES);

        foreach($fileKeys as $fileKey){
            $file = $_FILES[$fileKey];
            $error = $file['error'];
            $messages[] = $this->checkError($error);
            if($messages){ //エラー無
                $filePath = $imgDirPath.$file['name'];
                $success = move_uploaded_file($file['tmp_name'],$filePath);
                if($success){
                    //成功

                }else{
                    //失敗
                    return $messages;
                }
            }else{ //エラー在
                return $messages;
            }
        }

        return true;
    }

    public function checkError($error){
        $message=true;
        switch($error){
            case 0: //正常
                break;
    
            case 1: //ファイル容量がphp.iniのディレクティブ値を超えてる
                $message='アップロードされたファイルが大きすぎます．'
                .ini_get('upload_max_filesize').'以下のファイルをアップロードしてください．';
                break;
    
            case 2: //フォーム指定の容量超過
                $message='アップロードされたファイルが大きすぎます.'
                .($_POST['MAX_FILE_SIZE']/1000).'KB以下のファイルをアップロードしてください．';
                break;
    
            case 3:
                $message='アップロードに失敗しています．(通信エラー)．もう一度お試しください．';
                break;
    
            case 4: //ファイルがない
                $message='ファイルをアップロードしてください．';
                break;
    
            case 6: //テンポラリファイルがない
                $message='アップロードに失敗しています．(システムエラー).';
                break;
    
            default:
                $message='アップロードファイルをご確認ください．';
                break;
        }
    
        return $message;
    }
}

$loader = new ImgUpLoader();
$m = $loader->sendImg('./img/');
if($m){
    echo '成功しました．';
}else{
    var_dump($m);
}