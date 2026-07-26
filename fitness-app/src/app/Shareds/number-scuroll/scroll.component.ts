import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  forwardRef,
  input,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-scroll',
   imports: [CommonModule],
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScrollComponent),
      multi: true,
    },
  ],
  templateUrl: './scroll.component.html',
  styleUrl: './scroll.component.css',
})
export class ScrollComponent  implements ControlValueAccessor, AfterViewInit {
  
  min = input(10);
  max = input(60);
  step = input(1);
  label = input('Value');
  unit = input('');
  protected readonly Math = Math;
  selectedValue = signal<number>(this.min());
  disabled = false;
  @Output() valueChange = new EventEmitter<number>();

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  private onChange = (_value: number | null) => {};
  private onTouched = () => {};

  values = computed(() => {
    const list = [];
    for (let i = this.min(); i <= this.max(); i += this.step()) {
      list.push(i);
    }
    return list;
  });

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollToValue(this.selectedValue());
    }, 150);
  }

  writeValue(value: number | null): void {
    const newValue = value ?? this.min();
    this.selectedValue.set(newValue);
    setTimeout(() => {
      this.scrollToValue(this.selectedValue());
    });
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onScroll(event: Event) {
    if (this.disabled) return;
    const container = event.target as HTMLDivElement;
    const scrollLeft = container.scrollLeft;
    const itemWidth = this.getItemWidth();
    const centerOffset = container.clientWidth / 2;
    const paddingLeft = container.clientWidth * 0.3;
    const scrolledCenter = scrollLeft + centerOffset;
    const index = Math.round((scrolledCenter - paddingLeft - itemWidth / 2) / itemWidth);
    const targetValue = this.min() + index * this.step();

    if (
      targetValue >= this.min() &&
      targetValue <= this.max() &&
      targetValue !== this.selectedValue()
    ) {
      this.updateValue(targetValue);
    }
  }

  selectValue(value: number) {
    if (this.disabled) return;
    this.selectedValue.set(value);
    this.updateValue(value);
  }

  private updateValue(value: number) {
    this.selectedValue.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
    this.onTouched();
    this.scrollToValue(value);
  }

  private getItemWidth(): number {
    const firstItem = this.scrollContainer?.nativeElement?.firstElementChild;
    return firstItem?.getBoundingClientRect().width || 64;
  }

  private scrollToValue(value: number) {
    if (!this.scrollContainer) return;
    const container = this.scrollContainer.nativeElement;
    const itemWidth = this.getItemWidth();
    const index = (value - this.min()) / this.step();
    const paddingLeft = container.clientWidth * 0.3;
    const centerOffset = container.clientWidth / 2;
    const targetScroll = index * itemWidth + paddingLeft - centerOffset + itemWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: 'smooth',
    });
  }
}
