export function camelCase(){
    var DEFAULT_REGEX = /[-_]+(.)?/g;

    function toUpper(match, group1) {
        return group1 ? group1.toUpperCase() : '';
    }
    return function (str, delimiters) {
        return str.replace(
            delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, toUpper
        ).ucfirst();
    };
}


export  function camelCaseSpace(str){
    try {
        var camelCaseFun = camelCase();
        var str = camelCaseFun(str,"");
    } catch(e) {}

    return str.replace(/([a-z0-9]+)([A-Z])/g, '$1 $2').replace('_', ' ');
}

export function pascalCaseSpace(str){
    try {
        var camelCaseFun = camelCase();
        var str = camelCaseFun(str,"");
    } catch(e) {}
    str = str.replace(/([a-z0-9]+)([A-Z])/g, '$1 $2').replace('_', ' ');
    str = str.substr(0,1).toUpperCase()+str.substr(1)
    return str;
}