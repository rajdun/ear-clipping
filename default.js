const backgroundColor = "#353b48";
const mainColor = "#2f3640";
const highlightColor = "#00a8ff";
const successColor = "#4cd137";
const failureColor = "#e84118";
const executingColor = "#fbc531";
const lineWeight = 2;
const lineWeightLight = 1;
const dotRadius = 5;
const windowSizeRatio = window.innerWidth/window.innerHeight;

let state = "drawing"; // drawing, playing, finished
let ui;
let sleepDurationSeconds = .5;
let diagonal = new Line(0,0,0,0);
let triangles = [];
let actionsCount = 0;
let verticesCount = 0;
let clickCooldown = 0.1;
let lastClick = 0;

let b_drawGrid = true;
let b_drawCrosshair = true;
