import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  // Subject crea 1 Observable manualmente
  private debouncer = new Subject<string>();
  private debouncerSubscription?: Subscription; // manejar subs independiente

  @Input()
  public initialValue: string = '';

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  // pude haber obtenido solo el value en el html
  @ViewChild('txtInput') // solo a ref locales
  public tagInput!: ElementRef<HTMLInputElement>;

  // @Override
  ngOnInit(): void {
    // todo .sub() retorna 1 sub, menos HTTP de Angular
    this.debouncerSubscription = this.debouncer
      // espera a q el obs deje de emitir valores x t, luego continua con el .subscribe
      .pipe(debounceTime(420))
      .subscribe((value) => this.onDebounce.emit(value));
  }

  ngOnDestroy(): void {
    // se llama cuando se destruye el component:
    this.debouncerSubscription?.unsubscribe();
  }

  onKeyPress() {
    const value = this.tagInput.nativeElement.value;
    if (!value.trim()) return;

    this.debouncer.next(value);
  }

  emitValue() {
    const input = this.tagInput.nativeElement;
    if (!input.value) return;
    this.onValue.emit(input.value);

    input.value = '';
  }
}
