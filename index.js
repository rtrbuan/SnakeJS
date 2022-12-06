const arr = [
  {
    id: 1,
    top: 20,
    left: 40,
  },
  {
    id: 2,
    top: 20,
    left: 20,
  },
]
let speed = 400
let dir = 'down'
let curDir = 'down'
let apple = ''
let l = 0
let t = 0

const restart = () => {}

const over = () => {
  clearInterval(interval)
  alert('GAME OVER( Click "OK" to restart')
  if (confirm) {
    window.location.reload()
  }
}
const checkEatYourself = () => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[0].left === arr[i].left && arr[0].top === arr[i].top) {
      over()
      return
    }
  }
}

const checkOutOfBounds = () => {
  if (
    arr[0].left >= 600 ||
    arr[0].top >= 600 ||
    arr[0].left < 0 ||
    arr[0].top < 0
  ) {
    over()
  }
}

const createApple = () => {
  apple = $('<div class="apple" id="apple"/>')
  l = Math.trunc(Math.random() * (590 - 10) + 10)
  if (l > 0 && l < 20) {
    l = 0
  } else {
    l = l - (l % 20)
  }
  t = Math.trunc(Math.random() * (590 - 10) + 10)
  console.log()
  if (t > 0 && t < 20) {
    t = 0
  } else {
    t = t - (t % 20)
  }
  apple.css({
    left: l,
    top: t,
  })
  $('#field').append(apple)
}

const deleteApple = () => {
  $('#apple').detach()
}

const render = () => {
  for (block of arr) {
    const blockDiv = $('<div class="box" id="b' + block.id + '"/>')
    blockDiv.css({
      left: block.left + 'px',
      top: block.top + 'px',
    })
    $('#field').append(blockDiv)
  }
  createApple()
}
$(document).ready(render())
const newBlock = () => {
  const newBlock = $('<div class="box" id="b' + arr.length + '"/>')
  newBlock.css({
    top: arr[0].top + 'px',
    left: arr[0].left + 'px',
  })
  $('#field').append(newBlock)
}

const checkDir = () => {
  addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
      dir = 'up'
    } else if (e.code === 'ArrowDown') {
      dir = 'down'
    } else if (e.code === 'ArrowLeft') {
      dir = 'left'
    } else if (e.code === 'ArrowRight') {
      dir = 'right'
    }
  })
}

const move = () => {
  checkOutOfBounds()
  checkDir()
  if (arr[0].left === l && arr[0].top === t) {
    arr.unshift({ id: arr.length + 1, top: t, left: l })
    newBlock()
    deleteApple()
    createApple()
    speed = speed - 50
    console.log(speed)
  }
  let last = arr.pop()
  if (
    (curDir === 'right' && dir === 'left') ||
    (curDir === 'up' && dir === 'down') ||
    (curDir === 'left' && dir === 'right') ||
    (curDir === 'down' && dir === 'up')
  ) {
    over()
  }
  if (curDir === 'right' && dir !== 'left') {
    arr.unshift({ id: last.id, top: arr[0].top, left: arr[0].left + 20 })
    if (dir === 'up') {
      curDir = 'up'
    } else if (dir === 'down') {
      curDir = 'down'
    }
  } else if (curDir === 'up' && dir !== 'down') {
    arr.unshift({ id: last.id, top: arr[0].top - 20, left: arr[0].left })
    if (dir === 'left') {
      curDir = 'left'
    } else if (dir === 'right') {
      curDir = 'right'
    }
  } else if (curDir === 'down' && dir !== 'up') {
    arr.unshift({ id: last.id, top: arr[0].top + 20, left: arr[0].left })
    if (dir === 'left') {
      curDir = 'left'
    } else if (dir === 'right') {
      curDir = 'right'
    }
  } else if (curDir === 'left' && dir !== 'right') {
    arr.unshift({ id: last.id, top: arr[0].top, left: arr[0].left - 20 })
    if (dir === 'up') {
      curDir = 'up'
    } else if (dir === 'down') {
      curDir = 'down'
    }
  }

  let a = arr[0]
  $('#b' + a.id).css({
    top: a.top,
    left: a.left,
  })
  checkEatYourself()
}
let interval = setInterval(move, 100)
