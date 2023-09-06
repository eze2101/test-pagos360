import { Signal, computed, signal } from '@angular/core';

export class SignalStore<T> {
  readonly stateObjet = signal({} as T);
  readonly stateArray = signal([] as T);
  readonly stateBoolean = signal(false as boolean);

  /**
Crea una señal con la propiedad a leer del estado*
@param key - el nombre de la propiedad que se va a leer 
*/
  public select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.stateObjet()[key]);
  }

  /**
Este actualiza una sola propiedad del estado*
@param key - el nombre de la propiedad que se va guardar
@param data - la informació a guardar
*/
  public set<K extends keyof T>(key: K, data: T[K]) {
    this.stateObjet.update((currentValue) => ({
      ...currentValue,
      [key]: data,
    }));
  }

  /**
Este se utiliza cuando es necesario actualizar
varias propiedades del estado.
*
@param partialState - el estado Parcial o multiples propiedades a guardar
*/
  public setState(partialState: Partial<T>): void {
    this.stateObjet.update((currentValue) => ({
      ...currentValue,
      ...partialState,
    }));
  }

  /**
Se utiliza cuando es necesario actualizar TODA la información de un arreglo
*
@param state - el nuevo arreglo a guardar
*/
  public setStateArray(state: T): void {
    this.stateArray.set(state);
  }

  /**
Se utiliza cuando es necesario actualizar el valor booleano de la señal
*
@param state - el nuevo valor boolean a guardar
*/
  public setStateBoolean(state: boolean) {
    this.stateBoolean.set(state);
  }
}
