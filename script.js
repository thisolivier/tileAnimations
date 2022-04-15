var ns = 'http://www.w3.org/2000/svg'

document.addEventListener('DOMContentLoaded', (event) => {
    var div = document.getElementById('drawing')
    //var svg = SVG().addTo(div).size(div.offsetWidth, div.offsetHeight)
    var svg = document.createElementNS(ns, 'svg')
    svg.setAttributeNS(null, 'width', '100%')
    svg.setAttributeNS(null, 'height', '100%')
    div.appendChild(svg)
    let documentWidthAndHeight = [div.offsetWidth, div.offsetHeight]
    let numberAcross = 10
    let widthOfOne = documentWidthAndHeight[0] / numberAcross
    let howManyInHeight = Math.ceil(documentWidthAndHeight[1] / widthOfOne)
    for (let outerIndex = 0; outerIndex < howManyInHeight; outerIndex++) {
        for (let innerIndex = 0; innerIndex < numberAcross; innerIndex++) {
            let topCorner = [widthOfOne*innerIndex, widthOfOne*outerIndex]
            let element = addElementAt(
                topCorner, 
                widthOfOne
            )
            svg.appendChild(element)
            //let animationRunner = element.animate()
            //animationRunner.move(100, 100)
            //animationRunner.loop(10)
            console.log(element.x.baseVal)
        }
    }
    console.log(documentWidthAndHeight)
})

function addElementAt(topCorner, size) {
    var rect = document.createElementNS(ns, 'rect')
    rect.setAttributeNS(null, 'width', size*0.5)
    rect.setAttributeNS(null, 'height', size*0.5)
    rect.setAttributeNS(null, 'fill', '#f06')
    rect.setAttribute('x', topCorner[0])
    rect.setAttribute('y', topCorner[1])
    return(rect)
}