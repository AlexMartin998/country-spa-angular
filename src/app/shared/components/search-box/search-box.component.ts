import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @ViewChild('txtInput') // solo a ref locales
  public tagInput!: ElementRef<HTMLInputElement>;

  emitValue() {
    const input = this.tagInput.nativeElement;
    if (!input.value) return;
    this.onValue.emit(input.value);

    input.value = '';
  }
}
