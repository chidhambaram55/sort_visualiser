const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");

const l = 200;

let arr = [];

let starty;
let widthf;
let strtx;

let a = [];
let b = [];

let i1 = 0;
let j1 = 0;
let l1 = 0;
let l2 = 0;

let k = 0;
let p1 = 0;
let q1 = 0;
let mid1 = 0;

let strt = 100;
let p = 0;
let q = 0;

var abort = false;

function stopf() {
  abort = true;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setup() {
  arr = [];
  starty = 100;
  widthf = 5;
  strtx = 100;

  strt = 100;
  p = 0;
  q = 0;

  a = [];
  b = [];

  i1 = 0;
  j1 = 0;
  l1 = 0;
  l2 = 0;

  k = 0;
  p1 = 0;
  q1 = 0;
  mid1 = 0;

  abort = false;
  for (let i = 0; i < l; i++) {
    let val = Math.floor(Math.random() * 500 + 1);
    arr.push(val);
  }

  draw();
}

function draw() {
  if (abort) return;
  let startx = 100;
  ctx.clearRect(100, 100, (l + 10) * widthf, 1000);

  ctx.fillStyle = "white";
  ctx.fillRect(80, 80, (l + 10) * widthf, 600);

  for (let i = 0; i < l; i++) {
    let endx = startx + widthf;

    ctx.beginPath();

    ctx.fillStyle = "black";
    ctx.rect(startx, starty, widthf, arr[i]);

    ctx.stroke();

    ctx.fillRect(startx + widthf, starty, widthf, arr[i]);

    startx = endx;
  }
}

function merge() {
  if (abort) return;

  msort(0, l - 1);
}

async function hfunc() {
  if (abort) return;

  ctx.clearRect((p1 + i1) * widthf + strtx, 100, widthf, arr[p1 + i1]);
  ctx.fillStyle = "red";
  ctx.fillRect((p1 + i1) * widthf + strtx, 100, widthf, arr[p1 + i1]);

  ctx.clearRect(
    (mid1 + 1 + j1) * widthf + strtx,
    100,
    widthf,
    arr[mid1 + j1 + 1]
  );

  ctx.fillStyle = "red";
  ctx.fillRect(
    (mid1 + 1 + j1) * widthf + strtx,
    100,
    widthf,
    arr[mid1 + 1 + j1]
  );

  if (i1 < l1 && j1 < l2) {
    if (a[i1] < b[j1]) {
      arr[p1 + k] = a[i1];
      k++;
      i1++;
    } else {
      arr[p1 + k] = b[j1];
      j1++;
      k++;
    }
  } else if (i1 < l1) {
    arr[p1 + k] = a[i1];
    i1++;
    k++;
  } else if (j1 < l2) {
    arr[p1 + k] = b[j1];
    j1++;
    k++;
  }

  await sleep(1);
  draw();

  if (i1 < l1 || j1 < l2) await hfunc();
}

async function msort(p, q) {
  if (p == q) {
    return;
  }

  if (abort) return;

  if (p < q) {
    let mid = Math.floor(p + (q - p) / 2);

    await Promise.all([msort(p, mid), msort(mid + 1, q)]);

    //await msort(p, mid);
    //  await msort(mid + 1, q);
    l1 = mid - p + 1;
    l2 = q - mid;

    p1 = p;
    q1 = q;
    mid1 = mid;

    a = [];
    b = [];

    i1 = 0;
    j1 = 0;
    k = 0;
    for (let i = 0; i < l1; i++) {
      a[i] = arr[p + i];
    }
    for (let i = 0; i < l2; i++) {
      b[i] = arr[mid + 1 + i];
    }

    await hfunc();
  }
}

draw();

//bubble

function draw1(nd) {
  if (abort) return;
  let startx = 100;

  ctx.clearRect(100, 100, (l + 1) * widthf, 750);

  ctx.fillStyle = "white";
  ctx.fillRect(80, 80, (l + 1) * widthf, 600);
  for (let i = 0; i < l; i++) {
    let endx = startx + widthf;
    // endy = starty + arr[i];

    ctx.beginPath();

    if (nd != i) ctx.fillStyle = "black";
    else ctx.fillStyle = "blue";
    ctx.rect(startx, starty, widthf, arr[i]);

    ctx.stroke();

    ctx.fillRect(startx, starty, widthf, arr[i]);

    startx = endx;
  }

  if (p < l) {
    if (q == l - p - 1) {
      p++;
      strt = 100;
      q = 0;
    }

    // await bsort();

    setTimeout(bsort, 0.0001);
  }
}

function bsort() {
  {
    if (abort) return;
    swap();
    strt += widthf;
    q++;
  }
}

function swap() {
  if (abort) return;
  ctx.clearRect(strt, 100, widthf, arr[q]);
  ctx.fillStyle = "blue";
  ctx.fillRect(strt, starty, widthf, arr[q]);

  ctx.clearRect(strt + widthf, 100, widthf, arr[q + 1]);

  ctx.fillStyle = "red";
  ctx.fillRect(strt + widthf, starty, widthf, arr[q + 1]);

  if (arr[q] > arr[q + 1]) {
    let temp = arr[q];
    arr[q] = arr[q + 1];
    arr[q + 1] = temp;
  }

  // await draw1(q+1);
  //draw();

  setTimeout(draw1, 0.0001, q + 1);
}

//selection sort

function sdraw(nd) {
  if (abort) return;
  let startx = 100;

  ctx.clearRect(80, 80, (l + 1) * widthf, 750);

  ctx.fillStyle = "white";
  ctx.fillRect(80, 80, (l + 1) * widthf, 750);

  for (let i = 0; i < l; i++) {
    let endx = startx + widthf;
    // endy = starty + arr[i];

    ctx.beginPath();
    if (i < p) ctx.fillStyle = "lime";
    else if (nd != i) ctx.fillStyle = "black";
    else if (nd == i) ctx.fillStyle = "blue";
    ctx.rect(startx, starty, widthf, arr[i]);

    ctx.stroke();

    ctx.fillRect(startx, starty, widthf, arr[i]);

    startx = endx;
  }

  if (p < l - 1) {
    if (q == l) {
      p++;
      strt = 100;
      q = p + 1;
    }

    // await ssort();
    setTimeout(ssort, 0.0001);
  }
}

function ssort() {
  {
    if (abort) return;
    sswap();
    //strt += widthf;
    q++;
  }
}

function sswap() {
  if (abort) return;

  ctx.clearRect(strt + p * widthf, 100, widthf, arr[p]);
  ctx.fillStyle = "blue";
  ctx.fillRect(strt + p * widthf, starty, widthf, arr[p]);

  ctx.clearRect(strt + q * widthf, 100, widthf, arr[q]);

  ctx.fillStyle = "red";
  ctx.fillRect(strt + q * widthf, starty, widthf, arr[q]);

  if (arr[p] > arr[q]) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(strt + p * widthf, starty, widthf, arr[p]);
    let temp = arr[p];
    arr[p] = arr[q];
    arr[q] = temp;
  }

  //await sdraw(p);
  //draw();
  setTimeout(sdraw, 0.0001, p);
}
