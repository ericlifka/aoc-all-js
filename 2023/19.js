import { withInputSegments } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { sum } from "../utilities/reducers.js"

const parseConditions = str => {
    const rules = str.split(',')
    const finalTarget = rules.pop()
    
    let parsed = rules
        .map( rule => rule.match(/([xmas])([><])(\d+):(\w+)/))
        .map(([_, prop, compare, value, target]) => ({ prop, compare, target, value: toInt(value)}))

    return [ ...parsed, { target: finalTarget } ]
}

let [ workflows, parts ] = withInputSegments('\n\n')

parts = parts.replaceAll(/=/g, ':').split('\n').map(s => eval(`(${s})`))
workflows = workflows
    .split('\n')
    .map( line => line.match(/(\w+)\{(.*)\}/) )
    .map(([_, name, conditions]) => [ name, parseConditions(conditions) ])
    .reduce((rules, [ name, conditions ]) => {
        rules[name] = conditions
        return rules
    }, { })

const evaluateCompare = (compare, partVal, ruleVal) => 
    compare == '>' ? partVal > ruleVal : partVal < ruleVal

const evaluateWorkflow = (workflow, part) => {
    for (let rule of workflow) {
        if (!rule.compare) {
            return rule.target
        }

        if (evaluateCompare(rule.compare, part[rule.prop], rule.value)) {
            return rule.target
        }
    }
}

const followWorkflowChain = part => {
    let workflow = 'in'
    while (workflow != 'A' && workflow != 'R') {
        workflow = evaluateWorkflow(workflows[workflow], part)
    }
    return workflow
}

const scoreParts = parts => parts.map(({x, m, a, s}) => x + m + a + s).reduce(sum)

let out = { A: [ ], R: [ ] }
parts.forEach( part => out[ followWorkflowChain(part) ].push(part) )

console.log('part 1: ', scoreParts(out.A))


let topRange = {
    x: { min: 1, max: 4000 },
    m: { min: 1, max: 4000 }, 
    a: { min: 1, max: 4000 }, 
    s: { min: 1, max: 4000 } }

const copyRange = range => ({ x: { ...range.x }, m: { ...range.m }, a: { ...range.a }, s: { ...range.s } })
const rangeSpace = ({ x, m, a, s }) =>
    (x.max - x.min + 1) *
    (m.max - m.min + 1) *
    (a.max - a.min + 1) *
    (s.max - s.min + 1)

let acceptedRanges = []

const walkWorkflowNode = (workflow, incomingRange) => {
    let remainingRange = copyRange(incomingRange)
    for (let rule of workflows[workflow]) {
        // console.log(rule)
        let ruleInclude = copyRange(remainingRange)
        let ruleExclude = copyRange(remainingRange)

        if (rule.compare) { // normal rule
            
            if (rule.compare == '>') {
                
                ruleInclude[rule.prop].min = Math.max(rule.value + 1, ruleInclude[rule.prop].min)
                ruleExclude[rule.prop].max = Math.min(rule.value, ruleExclude[rule.prop].max)
            } else {
                ruleInclude[rule.prop].max = Math.min(rule.value - 1, ruleInclude[rule.prop].max)
                ruleExclude[rule.prop].min = Math.max(rule.value, ruleExclude[rule.prop].min)
            }

        }

        if (rule.target == 'A') {
            acceptedRanges.push(ruleInclude)
        } else if (rule.target != 'R') {
            walkWorkflowNode(rule.target, ruleInclude)
        }

        remainingRange = ruleExclude
    }
}

walkWorkflowNode('in', topRange)

console.log('part 2: ', acceptedRanges.map(rangeSpace).reduce(sum))

/*
in{ s<1351:px, qqz }
    | - px{ a<2006:qkq, m>2090:A, rfg }
    |       | - qkq{ x<1416:A, crn }
    |       |       | - A                   x[1-1415] m[1-4000] a[1-2005] s[1-1350]
    |       |       | - crn{ x>2662:A, R }
    |       |               | - A           x[2663-4000] m[1-4000] a[1-2005] s[1-1350]
    |       |               | - R           
    |       |
    |       | - A                           x[1-4000] m[2091-4000] a[2006-4000] s[1-1350]
    |       |
    |       | - rfg{ s<537:gd, x>2440:R, A }
    |               | - gd{ a>3333:R, R }
    |               |       | - R           
    |               |       | - R           
    |               | - R                   
    |               | - A                   x[1-2440] m[1-2090] a[2006-4000] s[537-1350]
    |
    | - qqz{ s>2770:qs, m<1801:hdj, R }
            | - qs{ s>3448:A, lnx }
            |       | - A                   x[1-4000] m[1-4000] a[1-4000] s[3449-4000]
            |       | - lnx{ m>1548:A, A }
            |               | - A           x[1-4000] m[1549-4000] a[1-4000] s[2771-3448]
            |               | - A           x[1-4000] m[1-1548] a[1-4000] s[2771-3448]
            |
            | - hdj{ m>838:A, pv }
            |       | - A                   x[1-4000] m[839-1800] a[1-4000] s[1351-2770]
            |       | - pv{ a>1716:R, A }
            |               | - R           
            |               | - A           x[1-4000] m[1-838] a[1-1716] s[1351-2770]
            |
            | - R
*/