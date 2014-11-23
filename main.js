global.$ = $;

var path = require('path');
var abar = require('address_bar');
var shell = require('nw.gui').Shell;
var exec = require('child_process').exec;

$(document).ready(function() {
  var addressbar = new abar.AddressBar($('#addressbar'));
  addressbar.set(process.cwd());
  
  function signature() {
    return process.cwd() + '>> ';
  }

  function skipdown() {
    window.scrollTo(0,document.body.scrollHeight);
    setTimeout(function() {
        window.scrollTo(0,document.body.scrollHeight);
    }, 100)
  }
  function writeLine(content) {
    $('#terminal').append('<div class="row" selectable="true"><pre>'+signature()+content+'</pre></div>');
    skipdown();
  }
  function writeLineError(content) {
    $('#terminal').append('<div class="row error" selectable="true"><pre>'+signature()+content+'</pre></div>');
    skipdown();
  }
  function execute(line) {

  }

  $('#console').keypress(function(e) {
    if (e.which === 13) {
      e.preventDefault();
      var text = $('#console').text();
      $('#console').text('');
      writeLine(text);
      var cmd = exec(text,function(e, stdio, stderr) {
        if (e) writeLine(stderr);
        writeLine(stdio);
        skipdown();
      })
    }
  })

  writeLine('welcome to your personal shell, it should work like a real shell should.')

});
