/*!
 * WhatsAppQuic v0.0.3 (https://SethuSenthil.github.io/WhatsAppQuic)
 * Copyright 2018 Sethu Senthil
 * MIT License (https://SethuSenthil.github.io/WhatsAppQuic/LICENSE)
 */
if (window.matchMedia('(display-mode: standalone)').matches) {
  document.getElementById('jsdown').innerHTML = "<br><br><br><br><br><br><br><br><br><br>";
}
const greetings = ['Hi!','Whats up!','Sup','Whats up','hi','yo'];
const randomGreet = Math.floor(Math.random() * greetings.length);
document.getElementById('message').value = greetings[randomGreet];
let $toastContent = $('<span id="goAway">Want to send this website to your phone?</span>').add($('<button class="btn-flat toast-action red-text grey darken-3" data-popup-open="popup-1" >Yes</button><button class="btn-flat toast-action darken-3">No</button>')),
fixtime = 10000;

function bye() {
  document.getElementById("goAway").innerHTML = "";
}
const input = $(".phone"),
  output = $("#output"),
is_iOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false,
is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
is_iPad = navigator.platform == "iPad",
ua = navigator.userAgent.toLowerCase(),
isAndroid = ua.indexOf("android") > -1,
out = document.getElementById('out');

if (is_Mac) document.getElementById("download").innerHTML = "<p>Download our Mac OS app! It doesn't hogg any system resources, and you will get to experience WhatsAppQuic offline!</p> <a class='waves-effect waves-light btn red lighten-1'><i class='material-icons left'>file_download</i>WhatsAppQuic for mac</a>"
if (is_iOS) document.getElementById("download").innerHTML = "<p>Download our PWA! Its super lite, and this service will be available to access offline., and you will get to experience WhatsAppQuic offline!</p> <a id='pwaBtn' class='waves-effect waves-light btn red lighten-1'><i class='material-icons left'>file_download</i>WhatsAppQuic for iOS</a> ", bye()
if (is_iPad) alert("You can still access WhatsAppQuic, but unfortunately WhatsApp does not support iPad therefor WhatsAppQuic does not either 😞"), bye()
if (isAndroid) {
  document.getElementById("download").innerHTML = "<p>Download our PWA! Its super lite, and this service will be available to access offline., and you will get to experience WhatsAppQuic offline!</p> <a id='pwaBtn' class='waves-effect waves-light btn red lighten-1'><i class='material-icons left'>file_download</i>WhatsAppQuic for Android</a> ", bye()
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
  let message = document.getElementById('message').value,
      number = input.intlTelInput("getNumber").substr(1), //removes the '+' (first char in string) before the number according to whatsapp guidelines
      key = `whatsapp://send?phone=${number}&text=${message}&source=https://sethusenthil.com/WhatsAppQuic&data=`, //builds URL which evokes app immediately bypassing Whatsapp API
      iframed = `<iframe src="${key}" frameborder="0"></iframe> `; //code for iframe before mount, this will make it a streamlined process instead of opening a tab
  document.getElementById('invoke').innerHTML = iframed;
  //console.log(iframed);
  setTimeout(function() {
    document.getElementById('invoke').innerHTML = '';
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
  // FIXME: Optimize share button more OS other than Android
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
var iconUrl = 'https://raw.githubusercontent.com/SethuSenthil/WhatsAppQuic/master/images/192x192.png';
var imgElement = document.createElement('img');
imgElement.src = iconUrl;
var installPromptEvent;
var btnInstall = document.getElementById('pwaBtn');

window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    installPromptEvent = event;
    btnInstall.removeAttribute('disabled');
});

btnInstall.addEventListener('click', function () {
    btnInstall.setAttribute('disabled', '');
    installPromptEvent.prompt();
    installPromptEvent.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        installPromptEvent = null;
    });
});
// TODO: Add toast when user is on a non mobile device, that opens or shares link/QR Code to phone
// TODO: Build/compile and upload Mac App