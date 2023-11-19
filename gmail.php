<?php

    $addressee = 'nicolasguardattiutn@gmail.com';
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $header = "Enviado desde el portafolio de Nicolás Guardatti";
    $full_message = $message . "\nAtentamente: " . $name;

    mail($addressee, $name, $full_message, $header);
    echo "<script>alert('Sent Successfully')</script>";
    echo "<script>setTimeout(\"location.href='index.html'\",1000)</script>";

?>