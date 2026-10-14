import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto, ProductoService } from '../services/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html'
})
export class Productos implements OnInit {
  productos: Producto[] = [];
  busqueda = '';
  soloInsuficientes = false;
  soloStockMayor20 = false;
  cargando = false;
  error = '';

  constructor(
    private readonly servicio: ProductoService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = '';
    this.cdr.detectChanges();

    this.servicio.obtenerProductos().subscribe({
      next: (datos: Producto[]) => {
        this.productos = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        console.error('Error HTTP:', err);
        this.error = 'No se pudieron obtener los productos.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  get productosFiltrados(): Producto[] {
    const texto = this.busqueda.trim().toLowerCase();

    return this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(texto) &&
      (!this.soloInsuficientes || producto.estadoStock === 'INSUFICIENTE') &&
      (!this.soloStockMayor20 || producto.stock > 20)
    );
  }
}
