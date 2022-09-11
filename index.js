const arr = [{
        id: 1,
        top: 20,
        left: 40
    },
    {
        id: 2,
        top: 20,
        left: 20
    },
]

const render = () => {
    for (block of arr) {

        const blockDiv = $('<div class="box" id="b' + block.id + '"/>')
        blockDiv.css({
            left: block.left + 'px',
            top: block.top + 'px'
        })
        $('#field').append(blockDiv)
    }
}
$(document).ready(render())

setInterval(() => {
    let last = arr.pop(arr.length - 1)
    arr.unshift({ id: last.id, top: 20, left: arr[0].left + 20 })
    let a = arr[0]
    $('#b' + arr[0].id).css({
        top: 20,
        left: arr[0].left
    })
    console.log(arr)
}, 1000)