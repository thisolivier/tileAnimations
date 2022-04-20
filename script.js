var ns = 'http://www.w3.org/2000/svg'
let sessionId = Math.random()

document.addEventListener("visibilitychange", () => {
    sessionId = Math.random()
    main()
})

document.addEventListener('DOMContentLoaded', (event) => {
    main()
})

function main() {
    var div = document.getElementById('drawing')
    var svg = SVG().addTo(div).size(div.offsetWidth, div.offsetHeight)
    let documentWidthAndHeight = [div.offsetWidth, div.offsetHeight]
    let numberAcross = 20
    let widthOfOne = documentWidthAndHeight[0] / numberAcross
    let howManyInHeight = Math.ceil(documentWidthAndHeight[1] / widthOfOne)
    for (let outerIndex = 0; outerIndex < howManyInHeight; outerIndex++) {
        for (let innerIndex = 0; innerIndex < numberAcross; innerIndex++) {
            let topCorner = [widthOfOne*innerIndex, widthOfOne*outerIndex]
            let indicies = [outerIndex, innerIndex]
            let element = addElementAt(
                svg,
                topCorner, 
                widthOfOne
            )
            let centerX = topCorner[0] + (widthOfOne * 0.5)
            let centerY = topCorner[1] + (widthOfOne * 0.5)
            element.attr({
                'transform-origin': centerX + ' ' + centerY
            })
            addRotateAnimation(element, topCorner, indicies, true)
        }
    }
    console.log(documentWidthAndHeight)
}

function addSquareAnimation(element, topCorner, indicies, initial) {
    let delay = initial ? (indicies[0] * 20) + (indicies[1] * 20) : 0
    console.log({element, topCorner, indicies})
    let runner = element.animate({
        duration: 1000,
        delay: delay
    })
    runner.move(topCorner[0] + 100, topCorner[1])
    runner.ease('<>')
    runner = runner.animate(500)
    runner.move(topCorner[0] + 100, topCorner[1] + 100)
    runner.ease('<>')
    runner = runner.animate(1000)
    runner.move(topCorner[0], topCorner[1] + 100)
    runner.ease('<>')
    runner = runner.animate(500)
    runner.move(topCorner[0], topCorner[1])
    runner.ease('<>')
    runner.after(() => {addAnimation(element, topCorner, indicies, false)})
}

function addRotateAnimation(element, topCorner, indicies, initial) {
    let delay = initial ? (indicies[0] * 100) + (indicies[1] * 50) : 0
    console.log({element, topCorner, indicies})
    let runner = element.animate({
        duration: 2000,
        delay: delay
    })
    runner.ease('-')
    runner.rotate(360, 0, 0)
    runner.after(() => {addRotateAnimation(element, topCorner, indicies, false)})
}

function addElementAt(parent, topCorner, size) {
    let edge = size*0.35
    let rect = parent
        .rect(edge, edge) // set dimensions
        .attr({ 
            x: topCorner[0], 
            y: topCorner[1], 
            fill: '#fef5ff'
        })
    let rect2 = parent
    .rect(edge, edge) // set dimensions
    .attr({ 
        x: topCorner[0] + size - edge, 
        y: topCorner[1] + size - edge, 
        fill: '#ff9d3b'
    })
    let group = parent.group()
    group.add(rect)
    group.add (rect2)
    return(group)
}