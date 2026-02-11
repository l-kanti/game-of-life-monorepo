"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasGridComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let CanvasGridComponent = class CanvasGridComponent {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.board = [];
        this.cellSize = 12;
        this.boardChange = new core_1.EventEmitter();
        this.drawing = false;
        // Pointer event handlers
        this.handlePointerDown = (ev) => {
            this.drawing = true;
            this.toggleAtEvent(ev);
        };
        this.handlePointerUp = () => {
            this.drawing = false;
        };
        this.handlePointerMove = (ev) => {
            if (!this.drawing)
                return;
            this.toggleAtEvent(ev);
        };
    }
    ngAfterViewInit() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d');
        this.resizeCanvas();
        this.render();
        // Prevent Angular change detection on pointer events
        this.ngZone.runOutsideAngular(() => {
            canvas.addEventListener('pointerdown', this.handlePointerDown);
            window.addEventListener('pointerup', this.handlePointerUp);
            canvas.addEventListener('pointermove', this.handlePointerMove);
        });
    }
    ngOnChanges(changes) {
        if (changes['board'] && this.ctx) {
            this.render();
        }
    }
    resizeCanvas() {
        const canvas = this.canvasRef.nativeElement;
        // set logical size according to board and cellSize
        if (this.board && this.board.length) {
            const rows = this.board.length;
            const cols = this.board[0].length;
            canvas.width = cols * this.cellSize;
            canvas.height = rows * this.cellSize;
        }
        else {
            canvas.width = 400;
            canvas.height = 300;
        }
    }
    render() {
        if (!this.ctx || !this.board)
            return;
        const ctx = this.ctx;
        const rows = this.board.length;
        const cols = rows ? this.board[0].length : 0;
        const w = cols * this.cellSize;
        const h = rows * this.cellSize;
        const canvas = this.canvasRef.nativeElement;
        if (canvas.width !== w || canvas.height !== h) {
            this.resizeCanvas();
        }
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw cells
        ctx.fillStyle = '#111';
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                if (this.board[x][y]) {
                    ctx.fillRect(y * this.cellSize, x * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
        // Grid lines
        ctx.strokeStyle = 'rgba(0,0,0,0.06)';
        ctx.beginPath();
        for (let x = 0; x <= rows; x++) {
            ctx.moveTo(0, x * this.cellSize);
            ctx.lineTo(canvas.width, x * this.cellSize);
        }
        for (let y = 0; y <= cols; y++) {
            ctx.moveTo(y * this.cellSize, 0);
            ctx.lineTo(y * this.cellSize, canvas.height);
        }
        ctx.stroke();
    }
    toggleAtEvent(ev) {
        const rect = this.canvasRef.nativeElement.getBoundingClientRect();
        const x = Math.floor((ev.clientY - rect.top) / this.cellSize);
        const y = Math.floor((ev.clientX - rect.left) / this.cellSize);
        if (!this.board ||
            x < 0 ||
            y < 0 ||
            x >= this.board.length ||
            y >= this.board[0].length)
            return;
        const newBoard = this.board.map((row) => row.slice());
        newBoard[x][y] = !newBoard[x][y];
        this.boardChange.emit(newBoard);
        // locally update and rerender immediately for snappy feedback
        this.board = newBoard;
        this.render();
    }
    // Support keyboard resize if needed
    onWindowResize() {
        this.resizeCanvas();
        this.render();
    }
};
exports.CanvasGridComponent = CanvasGridComponent;
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Array)
], CanvasGridComponent.prototype, "board", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], CanvasGridComponent.prototype, "cellSize", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], CanvasGridComponent.prototype, "boardChange", void 0);
__decorate([
    (0, core_1.ViewChild)('canvas', { static: true }),
    __metadata("design:type", core_1.ElementRef)
], CanvasGridComponent.prototype, "canvasRef", void 0);
__decorate([
    (0, core_1.HostListener)('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CanvasGridComponent.prototype, "onWindowResize", null);
exports.CanvasGridComponent = CanvasGridComponent = __decorate([
    (0, core_1.Component)({
        selector: 'canvas-grid',
        standalone: true,
        imports: [common_1.CommonModule],
        template: `
    <canvas #canvas style="border:1px solid #ddd; touch-action: none"></canvas>
  `,
        styles: [
            `
      :host {
        display: block;
      }
    `,
            `
      canvas {
        width: 100%;
        height: 100%;
        max-width: 800px;
        max-height: 600px;
      }
    `,
        ],
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], CanvasGridComponent);
//# sourceMappingURL=canvas-grid.component.js.map