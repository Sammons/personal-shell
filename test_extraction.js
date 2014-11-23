function get_args_from_segment(line_array) {
    var args = [];
    var pieces = line_array;
    console.log('starting', pieces)
    while(pieces.length > 0) {
        var pce = pieces.shift();
        if (!pce.match(/(\")|(\')/)){
          console.log('added ', pce)
          args.push(pce)
        }
        else {
          pieces.unshift(pce)
          var stuff = ' '+pieces.join(' ')
          console.log('searching stuff', stuff)
          var finding_first_quot = true;
          var finding_second_quot = true;
          var first_quot = "";
          var i =1, j = 1;
          while(finding_first_quot) {
            var cur_char = stuff[i];
            var prev_char = stuff[i-1];
            if ( (cur_char == "'" || cur_char =='"') && prev_char !== "\\") 
            {
              console.log('first quote found@',i)
              first_quot = cur_char;
              finding_first_quot = false;
              break;
            }
            i++;
            if (i >= stuff.length) break;
          }
          j = i + 1;
          while(finding_second_quot && !finding_first_quot) {
            var cur_char = stuff[j];
            var prev_char = stuff[j-1];
            if (cur_char == first_quot && prev_char !== "\\") 
            {
              finding_second_quot = false;
              break;
            }
            j++;
            if (j >= stuff.length) break;
          }
          if (finding_first_quot || finding_second_quot) {
            pieces = stuff.split(' ');
            var arg = pieces.shift();
            while (!arg && pieces.length > 0)
              arg = pieces.shift();
            console.log('added', arg)
            args.push(arg);
          }
          else {
            var arg = stuff.substring(i, j+1);
            stuff = stuff.replace(arg,'').trim();
            console.log('added', arg)
            args.push(arg);
            pieces = stuff.split(' ')
          }
        }
      }
      console.log('args',args)
      return args;
  }

function execute(line) {
    line.replace('\\','\\\\')
    var child_process = require('child_process');
    var input_text = line;
    var segments = input_text.split('|');

    var processes = [];

    for (var i in segments) {
      var pieces = segments[i].split(/\s/g);
      
      var cmd = pieces.shift();
      while (!cmd) cmd = pieces.shift();

      pieces = get_args_from_segment(pieces);

      for (var i in pieces) 
        if (!pieces[i]) pieces.splice(i, 1);

      pieces.push('');
      console.log(pieces)

    }
  }

execute('git commit -m "executing from my own cli"');