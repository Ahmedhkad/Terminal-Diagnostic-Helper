function keyboardLayoutSwitch(stringToConvert) {
    var sourceLayout = [
        'й',
        'ц',
        'у',
        'к',
        'е',
        'н',
        'г',
        'ш',
        'щ',
        'з',
        'х',
        'ъ',
        'ф',
        'ы',
        'в',
        'а',
        'п',
        'р',
        'о',
        'л',
        'д',
        'ж',
        'э',
        'я',
        'ч',
        'с',
        'м',
        'и',
        'т',
        'ь',
        'б',
        'ю'
    ];

    var targetLayout = [
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        '[',
        ']',
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        ';',
        "'",
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
        ',',
        '.'
    ];

    for (var index = 0; index < sourceLayout.length; index++) {
        const reg = new RegExp(sourceLayout[index], 'mig');
        stringToConvert = stringToConvert.replace(reg, function(currentLetter) {
            return currentLetter == currentLetter.toLowerCase() ? targetLayout[index] : targetLayout[index].toUpperCase();
        });
    }

    return stringToConvert;
}
