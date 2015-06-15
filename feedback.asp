<%@ Language="VBscript" %>
<html>

<head>
<title>Submitted Data</title>
</head>

<body>
<%

Dim name, email, phone, message

name=Request.Form("name")
email=Request.Form("email")
phone=Request.Form("phone")
message=Request.Form("message")

Response.Write("Name: " & name & "<br>")
Response.Write("E-mail: " & email & "<br>")
Response.Write("Phone Number: " & phone & "<br>")
Response.Write("Message: " & message & "<br>")
%> 
</body>

</html>
