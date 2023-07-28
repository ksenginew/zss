let stringify = (/** @type {{ [x: string]: any; }} */ data) => {
    let out = '';
    for (let p in data) {
        if (typeof data[p] == 'object')
            out += p + '{' + stringify(data[p]) + '}'
        else
            out += p + ':' + data[p] + ';';
    }
    return out
};

let ID = 'zs'
let toHash = (/** @type {string} */ str) => {
    let i = 0,
        out = 11;
    while (i < str.length) out = (101 * out + str.charCodeAt(i++)) >>> 0;
    return ID + out;
};


export let setup = (options = {}) => {
    /** @type {Record<string, string>} */
    let cache = {}
    let sheet = new CSSStyleSheet()
    document.adoptedStyleSheets.push(sheet)

    let style = (/** @type {number | undefined} */ type, /** @type {{ [x: string]: any; }} */ styles) => {
        let css = stringify(styles);

        if (type == 1) {
            sheet.insertRule(css, 0)
            return
        }
        let className =
            cache[css] || (cache[css] = toHash(css));

        // If there's no entry for the current className
        if (!cache[className]) {
            cache[className] = css

            // add or update
            if (type == 2)
                sheet.insertRule('@keyframes ' + className + '{' + css + '}')
            else
                sheet.insertRule('.' + className + '{' + css + '}')
        }

        // return hash
        return className;
    }


    return {
        css: style,
        // @ts-ignore
        global: style.bind(null, 1),
        // @ts-ignore
        keyframes: style.bind(null, 2),
        extract() {
            return [...sheet.cssRules].map(rule => rule.cssText).join('')
        }, sheet
    }
}

let { css, extract, sheet } = setup()

export { css, extract, sheet };
