export interface declaration {
	value: string//'color:red;',
	type: 'decl',
	props: string // 'color',
	children: string // 'red',
    line: number, column: number
}

export interface comment {
	value: string // '/*@noflip*/',
	type: 'comm',
	props: '/',
	children: string // '@noflip',
    line: number, column: number
}

export interface ruleset  {
	value: 'h1,h2',
	type: 'rule',
	props: string[] // ['h1', 'h2'],
	children: [/* ... */],
    line: number, column: number
}

export interface atruleset  {
	value: '@media (max-width:100), (min-width:100)',
	type: '@media',
	props: ['(max-width:100)', '(min-width:100)'],
	children: [/* ... */],
    line: number, column: number
}