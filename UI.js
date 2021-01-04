class UI{
    constructor() {
        this.element = document.querySelector('#ui');

        this.sleepTimeInput = document.querySelector('#sleepTime');
        this.gridInput = document.querySelector('#grid');
        this.crosshairInput = document.querySelector('#crosshair');

        this.verticesCountInfo = document.querySelector('#verticesCount');
        this.trianglesCountInfo = document.querySelector('#trianglesCount');
        this.actionsCountInfo = document.querySelector('#actionsCount');
        this.uiMain = document.querySelector('#ui-main');

        this.uiToggleButton = document.querySelector('#menuButton');
        this.startButton = document.querySelector('#startAnimationButton');
        this.resetButton = document.querySelector('#resetButton');

        this.visible = true;

        this.startButton.addEventListener('click', ()=>{
            polygon.triangulate();
            console.log(123);
        });
        this.resetButton.addEventListener('click', ()=>{
            reset();
            console.log(312);
        });
        this.uiToggleButton.addEventListener('click', ()=>{
            if(this.visible) {
                this.visible = false;
                this.hide();
            }else{
                this.visible = true;
                this.show();
            }
        })
    }

    hide() {
        this.uiMain.classList.add('hidden');
        if (this.uiMain.classList.contains('visible')) this.uiMain.classList.remove('visible');
    }

    show() {
        this.uiMain.classList.add('visible');
        if (this.uiMain.classList.contains('hidden')) this.uiMain.classList.remove('hidden');
    }

    getData() {
        sleepDurationSeconds = 5-Number(this.sleepTimeInput.value);
        b_drawGrid = this.gridInput.checked;
        b_drawCrosshair = this.crosshairInput.checked;
    }

    setData() {
        this.trianglesCountInfo.innerHTML = triangles.length;
        this.actionsCountInfo.innerHTML = actionsCount;
        this.verticesCountInfo.innerHTML = verticesCount;
    }

    update() {
        this.getData();
        this.setData();
    }
}
