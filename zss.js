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

export let toHash = (/** @type {string} */ str) => {
    let i = 0,
        out = 11;
    while (i < str.length) out = (101 * out + str.charCodeAt(i++)) >>> 0;
    return '_' + out;
};

export let setup = (options = {}) => {
    /** @type {Record<string, string>} */
    let cache = {}
    /**@type {CSSStyleSheet | string[]} */
    let sheet;
    /** @type {(rule: string, index?: number) => any} */
    let update;
    let extract;

    if (typeof window === 'object') {
        sheet = new CSSStyleSheet()
        document.adoptedStyleSheets.push(sheet)
        // @ts-ignore
        update = (/** @type {string} */ rule, index) => sheet.insertRule(rule, index)
        // @ts-ignore
        extract = () => [...sheet.cssRules].map(rule => rule.cssText).join('')

    } else {
        /** @type {string[]} */
        sheet = []
        // @ts-ignore
        update = (/** @type {string} */ rule, index = sheet.length) => sheet.splice(index, 0, rule)
        // @ts-ignore
        extract = () => sheet.join('')
    }

    let style = (/** @type {{ [x: string]: any; }} */ styles) => {
        let css = stringify(styles);
        console.log(css)

        let className =
            cache[css] || (cache[css] = toHash(css));

        // If there's no entry for the current className
        if (!cache[className]) {
            cache[className] = css

            // add or update
            let pos = update('.' + className + '{' + css + '}')
        }

        // return hash
        return className;
    }


    return {
        /** @param {{ [x: string]: any; }} styles*/
        css(styles) { return style(styles) },
        extract, sheet
    }
}

let { css, extract, sheet } = setup()

export { css, extract, sheet };
