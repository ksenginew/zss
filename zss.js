export let setup = () => {
    let cache = {}
    let sheet = []
    let id = 0
    let gen_class = () => {
        let cls = (id++).toString(36)
        return cls.indexOf('ad') === -1 ? '_' + cls : gen_class()
    }
    let style = (styles, parent = '&') => {
        let clsList = []
        for (let prop in styles) {
            let val = styles[prop]
            if (typeof val === 'object') {
                clsList = clsList.concat(style(val, parent + prop))
                continue
            }
            let hash = prop + val
            let cls = cache[hash]
            if (!cls) {
                cls = cache[hash] = gen_class()
                sheet.push(parent.replace(/&/g, '.' + cls) + '{' + prop + ':' + val + '}')
            }
            clsList.push(cls)
        }
        return clsList
    }

    let extract = () => sheet.join('\n')

    return { css(styles) { return style(styles).join(' ') }, extract }
}

let { css, extract } = setup()

export { css, extract };
