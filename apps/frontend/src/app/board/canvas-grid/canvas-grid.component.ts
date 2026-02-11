import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'canvas-grid',
  standalone: true,
  imports: [CommonModule],
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
})
export class CanvasGridComponent implements AfterViewInit, OnChanges {
  @Input() board: boolean[][] = [];
  @Input() cellSize = 12;
  @Output() boardChange = new EventEmitter<boolean[][]>();

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private drawing = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['board'] && this.ctx) {
      this.render();
    }
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    // set logical size according to board and cellSize
    if (this.board && this.board.length) {
      const rows = this.board.length;
      const cols = this.board[0].length;
      canvas.width = cols * this.cellSize;
      canvas.height = rows * this.cellSize;
    } else {
      canvas.width = 400;
      canvas.height = 300;
    }
  }

  private render() {
    if (!this.ctx || !this.board) return;
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
          ctx.fillRect(
            y * this.cellSize,
            x * this.cellSize,
            this.cellSize,
            this.cellSize,
          );
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

  // Pointer event handlers
  private handlePointerDown = (ev: PointerEvent) => {
    this.drawing = true;
    this.toggleAtEvent(ev);
  };

  private handlePointerUp = () => {
    this.drawing = false;
  };

  private handlePointerMove = (ev: PointerEvent) => {
    if (!this.drawing) return;
    this.toggleAtEvent(ev);
  };

  private toggleAtEvent(ev: PointerEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = Math.floor((ev.clientY - rect.top) / this.cellSize);
    const y = Math.floor((ev.clientX - rect.left) / this.cellSize);
    if (
      !this.board ||
      x < 0 ||
      y < 0 ||
      x >= this.board.length ||
      y >= this.board[0].length
    )
      return;
    const newBoard = this.board.map((row) => row.slice());
    newBoard[x][y] = !newBoard[x][y];
    this.boardChange.emit(newBoard);
    // locally update and rerender immediately for snappy feedback
    this.board = newBoard;
    this.render();
  }

  // Support keyboard resize if needed
  @HostListener('window:resize') onWindowResize() {
    this.resizeCanvas();
    this.render();
  }
}
