const tareas = [];
const completadas = [];

/**
 * Muestra el menú principal de opciones del gestor de tareas.
 * @returns {number} Opción seleccionada por el usuario.
 */
function mostrarMenu(){
    console.log('\n==== GESTIÓN DE TAREAS ====');
    console.log('1. Anadir tarea');
    console.log('2. Mostrar tareas');
    console.log('3. Marcar completada');
    console.log('4. Eliminar tarea');
    console.log('5. Estadisticas');
    console.log('6. Salir');

    return Number(prompt('Elije una opcion'));
}

/**
 * Añade una nueva tarea a la lista si la descripción es válida y no está duplicada.
 * @returns {string} Mensaje de éxito o error.
 */
function anadirTarea(){
    let nuevaTarea = prompt('Introduzca una tarea: ')?.trim() ?? '';

    if (nuevaTarea === '') return 'La descripción no puede estar vacía.';

    let duplicada = tareas.find(tarea => tarea.toLowerCase() === nuevaTarea.toLowerCase());

    if (duplicada) return 'Esta tarea ya existe';

    tareas.push(nuevaTarea);
    completadas.push(false);

    return 'Tarea anadida correctamente';
}

/**
 * Muestra todas las tareas registradas con su estado de completado.
 * @returns {string} Lista formateada de tareas.
 */
function mostrarTareas(){
    if (tareas.length === 0) return 'No hay ninguna tarea registrada.';

    let listaTareas = '==== Gestion de tareas ====\n';

    tareas.forEach((tarea, index) =>{
        let estado = completadas[index]
            ? '[X]' 
            : '[ ]';

        let itemLista = `${index + 1}. ${estado} - ${tarea}`;

        listaTareas += itemLista + '\n';
    });

    return listaTareas;
}

/**
 * Muestra únicamente las tareas que todavía no han sido completadas.
 * @returns {string} Lista de tareas pendientes.
 */
function mostrarTareasPendientes(){
    let pendientes = tareas
        .map((tarea, index) => ({ tarea, index, completada: completadas[index] }))
        .filter(item => !item.completada);

    if (pendientes.length === 0) return 'No hay tareas pendientes.';

    let listaPendientes = '==== Tareas pendientes ====';

    listaPendientes += '\n' + pendientes
        .map((item, index) => `${index + 1} - ${item.tarea}`)
        .join('\n');

    return listaPendientes;
}

/**
 * Obtiene y valida el índice de una tarea introducido por el usuario.
 * @returns {number} Índice válido de la tarea o -1 si no es válido.
 */
function obtenerIndexValido(){
    let numero = Number(prompt('Número de tarea:')?.trim() ?? '');

    if (isNaN(numero) || numero <= 0) return -1;

    let index = numero - 1;

    if (index < 0 || index >= tareas.length){
        return -1;
    }

    return index;
}

/**
 * Modifica el estado de una tarea o la elimina según la acción indicada.
 * @param {number} index Índice de la tarea a modificar.
 * @param {string} accion Acción a realizar: completar o borrar.
 * @returns {string} Mensaje con el resultado de la operación.
 */
function modificarTarea(index, accion){
    if (index === -1 && tareas.length === 0) return 'No se ha encontrado ninguna tarea';

    if (accion === 'completar'){
        if (completadas[index]) {
            return 'La tarea ya estaba completada!';
        }

        completadas[index] = true;
        return 'Tarea completada!';
    }

    if (accion === 'borrar'){
        tareas.splice(index, 1);
        completadas.splice(index, 1);
        return 'Tarea eliminada!';
    }
}

/**
 * Muestra las estadísticas generales de las tareas registradas.
 * @returns {string} Resumen con total, completadas y pendientes.
 */
function mostrarEstadistica(){
    if (tareas.length === 0) return 'No hay estadistica!';

    let total = tareas.length;

    let hechas = completadas
                 .filter(estado => estado).length;

    let pendientes = total - hechas;

    let estadistica = `
        - Total: ${total}
        - Completadas: ${hechas}
        - Pendientes: ${pendientes}
    `;

    return estadistica;
}

/**
 * Cierra el programa tras ejecutar una acción final.
 * @param {Function} callback Función a ejecutar antes de salir.
 */
const salirDelPrograma = (callback) => {

     alert("\nCerrando sesión de usuario...");
     console.log("\nCerrando sesión de usuario...");
      setTimeout(() => {
         callback();
          process.exit(0);
         }, 1500);
};

/**
 * Punto principal de ejecución del gestor de tareas.
 */
function main(){
    let opcion;

    while(true){
        opcion = mostrarMenu();

        switch (opcion) {
            case 1:
                console.log(anadirTarea());
                alert("Tarea anadida correctamente");
                break;

            case 2:
                console.log(mostrarTareasPendientes());
                break;

            case 3:
                console.log(modificarTarea());

                if (tareas.length > 0){
                    console.log(
                        modificarTarea(
                            obtenerIndexValido(),
                            'completar'
                        )
                    );
                }
                break;

            case 4:
                console.log(modificarTarea());

                if (tareas.length > 0){
                    console.log(
                        modificarTarea(
                            obtenerIndexValido(),
                            'borrar'
                        )
                    );
                }
                break;

            case 5:
                console.log(mostrarEstadistica());
                break;

            case 6:
                salirDelPrograma(() =>
                alert("Gracias por usar el gestor de tareas. Adiós!"));
                return false;

            default:
                console.log("Opción no vàlida");
        }
    }
}

main();