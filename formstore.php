<?php
if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['message'])) {
    $data = $_POST['name'] . '-' . $_POST['email'] . '-' . $_POST['phone'] .  '-' . $_POST['message'] . "\n";
    $ret = file_put_contents('tmp/mydata.txt', $data, FILE_APPEND | LOCK_EX);
    if($ret === false) {
        die('There was an error writing this file');
    }
    else {
        echo "$ret bytes written to file";
    }
}
else {
   die('no post data to process');
}