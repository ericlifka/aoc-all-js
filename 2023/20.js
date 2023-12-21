import { withInputLines } from "../utilities/with-input.js"
import { coalesceBy } from "../utilities/vectors.js"
import { leastCommonMultiple as LCM } from "../utilities/math.js"
import { elapsed } from "../utilities/timer.js"

const parseName = module =>
    module == "broadcaster"
        ? "broadcaster"
        : module.slice(1)

const parseType = module =>
      module == "broadcaster" ? "broadcaster"
    : module[0] == '%' ? 'flip-flop'
    : module[0] == '&' ? 'conjunction'
    : null


let moduleList = withInputLines()
    .map(line => line.split(' -> '))
    .map(([module, targets]) => ({
        name: parseName(module),
        type: parseType(module),
        targets: targets.split(', ')
    }))
    .map( module =>
        module.type == "conjunction"
            ? { ...module, memory: {} }
            : module )

let moduleTable = coalesceBy(moduleList, 'name')

const resetState = () => {
    moduleList.forEach((module) => {
        module.targets.forEach( target => {
            if (moduleTable[target] && moduleTable[target].type == "conjunction")
                moduleTable[target].memory[module.name] = "low"
        })

        if (module.type == 'flip-flop')
            module.on = false
    })
}

let i = 0;
let firsts = {
    xj: null,
    qs: null,
    kz: null,
    km: null
}

const pushButton = () => {
    i += 1
    let pulseCounts = { high: 0, low: 0 }
    let pulseQueue = [
        { type: 'low', from: 'button', to: 'broadcaster' }
    ]

    while (pulseQueue.length > 0) {
        let pulse = pulseQueue.shift()
        pulseCounts[pulse.type]++

        let module = moduleTable[ pulse.to ]
        if (!module) continue

        switch (module.type) {
            case 'broadcaster':
                module.targets.forEach( target => pulseQueue.push({
                    type: pulse.type,
                    from: module.name,
                    to: target
                }))
                break

            case 'flip-flop':
                if (pulse.type == 'low') {
                    module.on = !module.on
                    module.targets.forEach (target => pulseQueue.push({
                        type: module.on ? 'high' : 'low',
                        from: module.name,
                        to: target
                    }))
                }
                break

            case 'conjunction':
                module.memory[ pulse.from ] = pulse.type
                let pulseType = Object.values(module.memory).every( pulse => pulse == 'high' ) ? 'low' : 'high'
                module.targets.forEach( target => pulseQueue.push({
                    type: pulseType,
                    from: module.name,
                    to: target
                }))

                if (module.name == 'gq') { // watch the module that feeds the special rx output
                    let memory = module.memory
                    if (!firsts.xj && memory.xj == 'high') firsts.xj = i
                    if (!firsts.qs && memory.qs == 'high') firsts.qs = i
                    if (!firsts.kz && memory.kz == 'high') firsts.kz = i
                    if (!firsts.km && memory.km == 'high') firsts.km = i
                }
                break

            default:
                throw "unknown module type " + JSON.stringify(module)
        }
    }

    return pulseCounts
}

resetState()
let pulseCounts = { high: 0, low: 0 }

while (  !firsts.xj
      || !firsts.qs
      || !firsts.kz
      || !firsts.km  )
{
    let { high, low } = pushButton()
    pulseCounts.high += high
    pulseCounts.low += low
    if (i === 1000) {
        console.log('part 1: ', pulseCounts.high * pulseCounts.low, elapsed())
    }
}

console.log('part 2: ', LCM(...Object.values(firsts)), elapsed())
