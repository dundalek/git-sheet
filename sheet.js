
// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
// http://ejohn.org/blog/javascript-micro-templating/
// i replaced <% with {{ and %> with }}
(function(){
  var cache = {};

  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        // quote fix from:
        // http://www.west-wind.com/weblog/posts/2008/Oct/13/Client-Templating-with-jQuery
        str.replace(/[\r\t\n]/g, " ")
            .replace(/'(?=[^%]*}})/g,"\t")
            .split("'").join("\\'")
            .split("\t").join("'")
            .replace(/{{=(.+?)}}/g, "',$1,'")
            .split("{{").join("');")
            .split("}}").join("p.push('")
            + "');}return p.join('');");
//         str
//           .replace(/[\r\t\n]/g, " ")
//           .split("{{").join("\t")
//           .replace(/((^|}})[^\t]*)'/g, "$1\r")
//           .replace(/\t=(.*?)}}/g, "',$1,'")
//           .split("\t").join("');")
//           .split("}}").join("p.push('")
//           .split("\r").join("\\'")
//       + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();

var docBase = 'http://schacon.github.com/git/';

function manualLink(cmd) {
    cmd = cmd.split(/\s/);
    if (cmd[0] === 'git' ) {
        return docBase + cmd[0] + '-' + cmd[1] + '.html';
    }
    return docBase + 'git.html';
}

function escapeVariable(val) {
    return val.replace(/ /g, '\\ ');
}

function runCommand(cmd) {
    var text = $(".cmd", cmd).text();
    if (text) {
        text = text.replace(/\$([-_a-zA-Z0-9]+)/g,
            function (a, b) {
                //var r = o[b];
                //return typeof r === 'string' ? r : a;
                var el = $('.control [name="'+b+'"]', cmd);
                return escapeVariable(el.val());
            });
        alert(text);
    }
}

function controlReplace(control) {
    return control.replace(/\n/g, "<br>").replace(/\$([-_a-zA-Z0-9]+)/g,
        function (a, b) {
            return '<input name="'+b+'" type="text" placeholder="'+a+'"/>';
        }
    );
}

function extractCommands(command) {
    var cmds;
    if ("command" in command) {
        cmds = [{command : command.command}];
        if ("note" in command)
            cmds[0].note = command.note;
    } else {
        cmds = command.commands;
    }
    return cmds;
}

function renderSheet(element, data) {
        element = $(element);

        var columns = data.columngroups,
            items = data.items,
            column = null,
            group;

        for (var i = 0; i < items.length; i++) {
            group = $(tmpl('group_tmpl', items[i]));

            // columns hack
            if (columns && columns.length > 0 && columns[0] === items[i].label) {
                columns.shift();
                if (column !== null) {
                    element.append(column);
                }
                column = $('<div class="column">');
            }
            column.append(group);
        }
        element.append(column);
}

function bindHandlers() {
    $(".command").click(function() {
        runCommand(this);
    });

    $(".command input")
        .autoResize({
            minWidth: 16,
            maxWidth: 250,
            extraSpace: 3,
            animate: false
        })
        .click(function(e) {
            // we just want to focus input
            // we stop propagation so that command is not executed
            e.stopPropagation();
        })
        .keypress(function(e) {
            // enter is pressed.. execute command
            if (e.which == '13') {
                e.stopPropagation();
                runCommand($(this).parents(".command"));
            }
        });

    $('.manpage').click(function(e) {
        // we stop propagation so that command is not executed
        e.stopPropagation();
    });

    // placeholder implementation for browsers without HTML5 support
    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();

    $('#filter').keyup(function() {
        var val = $(this).val(),
            selector = ":contains('"+val+"')";
        $('#content .group').hide();
        $('#content .entry').hide().filter(selector).show().parent('.group').show();

    });
}