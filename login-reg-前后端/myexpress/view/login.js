document.getElementById("btn").onclick = function () {
    let username = document.getElementById("username").value;
    let pwd = document.getElementById("pwd").value;
    let xhr=new XMLHttpRequest();
    xhr.open("get","/users/login?username=" + username + "&pwd=" + pwd);
    xhr.onreadystatechange=function (){
        if(xhr.status==200 && xhr.readyState==4){
            let result=JSON.parse(xhr.responseText);
            if(result.code == 1){
                window.location.href="/"
                console.log(result);
            }else if(result.code == -1){
                window.location.href="/users/reg";
            }else{
                alert(result.msg);
            }
        }
    }
    xhr.send();
    console.log(username, pwd);
}