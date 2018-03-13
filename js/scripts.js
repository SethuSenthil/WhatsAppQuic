/*!
 * WhatsAppQuic v0.0.2 (https://SethuSenthil.github.io/WhatsAppQuic)
 * Copyright 2018 Sethu Senthil
 * MIT License (https://SethuSenthil.github.io/WhatsAppQuic/LICENSE)
 */
if (window.matchMedia('(display-mode: standalone)').matches) {
  document.getElementById('jsdown').innerHTML = "<br><br><br><br><br><br><br><br><br><br>";
}
var $toastContent = $('<span id="goAway">Want to send this to your phone?</span>').add($('<button class="btn-flat toast-action red-text grey darken-3" data-popup-open="popup-1" >Yes</button><button class="btn-flat toast-action darken-3">No</button>')),
fixtime = 10000;

function bye() {
  document.getElementById("goAway").innerHTML = "";
}
var input = $(".phone"),
  output = $("#output"),
is_iOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false,
is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
is_iPad = navigator.platform == "iPad",
ua = navigator.userAgent.toLowerCase(),
isAndroid = ua.indexOf("android") > -1,
out = document.getElementById('out');

if (is_Mac) document.getElementById("download").innerHTML = "<p>Download our Mac OS app! It doesn't hogg any system resources, and you will get to experience WhatsAppQuic offline!</p> <a class='waves-effect waves-light btn red lighten-1'><i class='material-icons left'>file_download</i>WhatsAppQuic for mac</a>"
if (is_iOS) document.getElementById("download").innerHTML = "WhatsAppQuic is a WebApp, in other words it's an app that doesn't consume much resources such as hard drive space and RAM. Since its an App, you may access it offline! To download WhatsAppQuic via Safari on iOS, click on the 3 dot menu and click add to homescreen.", bye()
if (is_iPad) alert("You can still access WhatsAppQuic, but unfortunately WhatsApp does not support iPad therefor WhatsAppQuic does not either 😞"), bye()
if (isAndroid) {
  document.getElementById("download").innerHTML = "WhatsAppQuic is a WebApp, in other words it's an app that doesn't consume much resources such as hard drive space and RAM. Since its an App, you may access it offline! To download WhatsAppQuic via Chrome on Android, click on the 3 dot menu and click add to homescreen.", bye()
}
input.intlTelInput({
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/js/utils.js"
});

function validateNone() {
  var getphone = document.getElementById("phone").value;
  if (getphone == "") {
    var txt;
    if (confirm("You left the number input empty. Do you want to proceed?")) {
      //Pressed yes;
    } else {
      //pressed no
      // TODO: About function main if pressed no
    }
  }
}

input.on("keyup change", function() {
  var intlNumber = input.intlTelInput("getNumber");
  if (intlNumber) {
    output.text("International: " + intlNumber);
  } else {
    output.text("Please enter a numb2er below");
  }
});
Materialize.toast($toastContent, fixtime);

function main() {
  validateNone();
  var openedWindow = window.open('whatsapp://send?text=' + document.getElementById('message').value + '&phone=' + input.intlTelInput("getNumber"));

  setTimeout(function() {
    openedWindow.close();
  }, 3000);
}
$("#message").keyup(function(event) {
  if (event.keyCode == 13) {
    $("#sendbtn").click();
  }
});

$("#telinp").keyup(function(event) {
  if (event.keyCode == 13) {
    $("#sendbtn").click();
  }
});

function Share() {
  // FIXME: Fix floating share button
  if (navigator.share) {
    navigator.share({
        title: 'I found a cool WebApp called WhatsAppQuic!',
        text: 'What up, I found a cool new WebApp called WhatsAppQuic, this allows you to send whatsapp messages to people not in your contacts!',
        url: 'https://sethusenthil.github.io/WhatsAppQuic'
      })
      .then(() => console.log('Share button is up and running'))
      .catch((error) => console.log('Share Error', error));
  }
}

function sending() {
  Materialize.toast('Sending...', 5000, )
}
$(function() {
  $('[data-popup-open]').on('click', function(e) {
    var targeted_popup_class = jQuery(this).attr('data-popup-open');
    $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
    e.preventDefault();
  });
  $('[data-popup-close]').on('click', function(e) {
    var targeted_popup_class = jQuery(this).attr('data-popup-close');
    $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
    e.preventDefault();
  });
});
// TODO: Add toast when user is on a non mobile device, that opens or shares link/QR Code to phone
// TODO: Build/compile and upload Mac App
