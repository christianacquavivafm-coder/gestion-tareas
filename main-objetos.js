const prompt = require('prompt-sync')();
const alert = (mensaje) => console.log(mensaje);

class Tarea {
    constructor(descripcion) {
        this.descripcion = descripcion;
        this.completada = false;
    }

    marcarCompletada() {
        this.completada = true;
    }

    obtenerTexto(index) {
        const estado = this.completada ? '[X]' : '[ ]';
        return `${index + 1}. ${estado} - ${this.descripcion}`;
    }
}

class GestorTareas {
    constructor() {
        this.tareas = [];
    }

    mostrarMenu() {
        console.log('\n==== GESTIÓN DE TAREAS ====');
        console.log('1. Añadir tarea');
        console.log('2. Mostrar tareas');
        console.log('3. Marcar completada');
        console.log('4. Eliminar tarea');
        console.log('5. Estadísticas');
        console.log('6. Salir');

        return Number(prompt('Elije una opción: '));
    }

    anadirTarea() {
        const descripcion = prompt('Introduzca una tarea: ')?.trim() ?? '';

        if (descripcion === '') {
            return 'La descripción no puede estar vacía.';
        }

        const duplicada = this.tareas.some(
            tarea => tarea.descripcion.toLowerCase() === descripcion.toLowerCase()
        );

        if (duplicada) {
            return 'Esta tarea ya existe.';
        }

        this.tareas.push(new Tarea(descripcion));
        return 'Tarea añadida correctamente.';
    }

    mostrarTareas() {
        if (this.tareas.length === 0) {
            return 'No hay ninguna tarea registrada.';
        }

        return ['==== Gestión de tareas ====']
            .concat(this.tareas.map((tarea, index) => tarea.obtenerTexto(index)))
            .join('\n');
    }

    mostrarTareasPendientes() {
        const pendientes = this.tareas.filter(tarea => !tarea.completada);

        if (pendientes.length === 0) {
            return 'No hay tareas pendientes.';
        }

        return ['==== Tareas pendientes ====']
            .concat(pendientes.map((tarea, index) => `${index + 1}. ${tarea.descripcion}`))
            .join('\n');
    }

    obtenerIndexValido() {
        const numero = Number(prompt('Número de tarea: ')?.trim() ?? '');

        if (isNaN(numero) || numero <= 0) {
            return -1;
        }

        const index = numero - 1;

        if (index < 0 || index >= this.tareas.length) {
            return -1;
        }

        return index;
    }

    completarTarea(index) {
        if (index === -1) {
            return 'No se ha encontrado ninguna tarea.';
        }

        if (this.tareas[index].completada) {
            return 'La tarea ya estaba completada.';
        }

        this.tareas[index].marcarCompletada();
        return 'Tarea completada.';
    }

    eliminarTarea(index) {
        if (index === -1) {
            return 'No se ha encontrado ninguna tarea.';
        }

        this.tareas.splice(index, 1);
        return 'Tarea eliminada.';
    }

    mostrarEstadisticas() {
        if (this.tareas.length === 0) {
            return 'No hay estadísticas.';
        }

        const total = this.tareas.length;
        const completadas = this.tareas.filter(tarea => tarea.completada).length;
        const pendientes = total - completadas;

        return `
- Total: ${total}
- Completadas: ${completadas}
- Pendientes: ${pendientes}
`;
    }

    salirDelPrograma(callback) {
        alert('\nCerrando sesión de usuario...');
        console.log('\nCerrando sesión de usuario...');

        setTimeout(() => {
            callback();
            if (typeof process !== 'undefined') {
                process.exit(0);
            }
        }, 1500);
    }

    iniciar() {
        while (true) {
            const opcion = this.mostrarMenu();

            switch (opcion) {
                case 1:
                    console.log(this.anadirTarea());
                    break;

                case 2:
                    console.log(this.mostrarTareas());
                    break;

                case 3: {
                    const index = this.obtenerIndexValido();
                    console.log(this.completarTarea(index));
                    break;
                }

                case 4: {
                    const index = this.obtenerIndexValido();
                    console.log(this.eliminarTarea(index));
                    break;
                }

                case 5:
                    console.log(this.mostrarEstadisticas());
                    break;

                case 6:
                    this.salirDelPrograma(() => {
                        alert('Gracias por usar el gestor de tareas. ¡Adiós!');
                    });
                    return;

                default:
                    console.log('Opción no válida.');
            }
        }
    }
}

const gestor = new GestorTareas();
gestor.iniciar();
