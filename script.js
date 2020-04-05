function blockify(str) {
    var prefix = ':regional_indicator_';
    var suffix = ': ';

    str = str.toLowerCase().replace(/\s/g, a => a.repeat(4));

    return str.replace(/[a-z]/gi, char => {
        return prefix.concat(char, suffix);
    });
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
