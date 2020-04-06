function blockify(str) {
    var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    var prefix = ':regional_indicator_';
    var suffix = ': ';

    str = str.toLowerCase().replace(/\s/g, a => a.repeat(4));

    str = str.replace(/[a-z]/gi, char => prefix.concat(char, suffix));

    str = str.replace(/[0-9]/gi, num => ':'.concat(numbers[num], suffix));

    return str;
}

var send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(data) {
    var obj;

    try {
        obj = JSON.parse(data);
    } catch (err) {}

    if (obj && obj.content) {
        obj.content = blockify(obj.content);
        data = JSON.stringify(obj);
    }

    return send.apply(this, [data]);
}
