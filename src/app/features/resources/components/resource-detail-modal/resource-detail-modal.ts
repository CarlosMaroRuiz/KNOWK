import { Component, ChangeDetectionStrategy, input, output, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonDirective, IconButtonDirective } from '@common/components/button';
import { LucideAngularModule, X, CheckCircle2, XCircle, Lightbulb, ArrowRight, HelpCircle, Eye, Sparkles, Info, Volume2, RotateCcw } from 'lucide-angular';
import { ResourceItem } from '../../domain/models/resource.model';

@Component({
  selector: 'resource-detail-modal',
  standalone: true,
  imports: [RouterLink, ButtonDirective, IconButtonDirective, LucideAngularModule],
  templateUrl: './resource-detail-modal.html',
  styleUrl: './resource-detail-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailModalComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly item = input.required<ResourceItem>();
  readonly close = output<void>();

  readonly activeTab = signal<'theory' | 'sandbox' | 'quiz'>('theory');
  readonly expandedExample = signal<number | null>(null);
  readonly selectedQuizOption = signal<number | null>(null);
  readonly activeTokenHint = signal<string | null>(null);
  readonly isSpeaking = signal<boolean>(false);

  // Sandbox State
  readonly sandboxSubject = signal<string>('The student');
  readonly sandboxAuxiliary = signal<string>('has');
  readonly sandboxVerb = signal<string>('completed');
  readonly sandboxComplement = signal<string>('the exam successfully.');

  readonly X = X;
  readonly CheckCircle2 = CheckCircle2;
  readonly XCircle = XCircle;
  readonly Lightbulb = Lightbulb;
  readonly ArrowRight = ArrowRight;
  readonly HelpCircle = HelpCircle;
  readonly Eye = Eye;
  readonly Sparkles = Sparkles;
  readonly Info = Info;
  readonly Volume2 = Volume2;
  readonly RotateCcw = RotateCcw;

  private readonly tokenRules: Array<{ pattern: string; hint: string }> = [
    { pattern: 'Sujeto', hint: 'Sujeto: Sustantivo, pronombre (I, You, He, She, It, We, They) o frase nominal que ejecuta la acción.' },
    { pattern: 'AM', hint: 'Auxiliar BE en presente: AM para I; IS para He/She/It; ARE para You/We/They.' },
    { pattern: 'IS', hint: 'Auxiliar BE en presente: AM para I; IS para He/She/It; ARE para You/We/They.' },
    { pattern: 'ARE', hint: 'Auxiliar BE en presente: AM para I; IS para He/She/It; ARE para You/We/They.' },
    { pattern: 'WAS', hint: 'Auxiliar BE en pasado: WAS para I/He/She/It; WERE para You/We/They.' },
    { pattern: 'WERE', hint: 'Auxiliar BE en pasado: WAS para I/He/She/It; WERE para You/We/They.' },
    { pattern: 'HAVE', hint: 'Auxiliar Present Perfect: HAS para He/She/It; HAVE para I/You/We/They.' },
    { pattern: 'HAS', hint: 'Auxiliar Present Perfect: HAS para He/She/It; HAVE para I/You/We/They.' },
    { pattern: 'HAD', hint: 'Auxiliar Past Perfect: HAD se usa con todos los pronombres sin excepción.' },
    { pattern: '-ing', hint: 'Verbo en Gerundio (-ing): Indica acción continua o progresiva.' },
    { pattern: 'Participio', hint: 'Participio Pasado (Forma V3): Verbo regular (-ed) o irregular (written, eaten, done).' },
    { pattern: 'V3', hint: 'Participio Pasado (Forma V3): Verbo regular (-ed) o irregular (written, eaten, done).' },
    { pattern: 'Verbo', hint: 'Verbo Principal: Acción principal de la oración conjugada según el tiempo.' },
  ];

  readonly formulaVariants = computed(() => {
    const raw = this.item().formula;
    if (!raw) return [];
    return raw.split('|').map((v) => v.trim());
  });

  readonly sandboxSentence = computed(() => {
    return `${this.sandboxSubject()} ${this.sandboxAuxiliary()} ${this.sandboxVerb()} ${this.sandboxComplement()}`.replace(/\s+/g, ' ').trim();
  });

  setTab(tab: 'theory' | 'sandbox' | 'quiz'): void {
    this.activeTab.set(tab);
  }

  toggleExample(index: number): void {
    this.expandedExample.update((prev) => (prev === index ? null : index));
  }

  selectOption(index: number): void {
    this.selectedQuizOption.set(index);
  }

  splitTokens(variant: string): string[] {
    return variant.split('+').map((t) => t.trim());
  }

  getTokenHint(token: string): string {
    const cleanToken = token.trim();
    const match = this.tokenRules.find((rule) => cleanToken.includes(rule.pattern));
    return match ? match.hint : `Elemento gramatical: ${cleanToken}`;
  }

  selectToken(token: string): void {
    const hint = this.getTokenHint(token);
    this.activeTokenHint.update((prev) => (prev === hint ? null : hint));
  }

  speakText(text: string): void {
    if (!isPlatformBrowser(this.platformId) || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    this.isSpeaking.set(true);
    utterance.onend = () => this.isSpeaking.set(false);
    utterance.onerror = () => this.isSpeaking.set(false);

    window.speechSynthesis.speak(utterance);
  }

  setSandboxSubject(val: string): void {
    this.sandboxSubject.set(val);
  }

  setSandboxAuxiliary(val: string): void {
    this.sandboxAuxiliary.set(val);
  }

  setSandboxVerb(val: string): void {
    this.sandboxVerb.set(val);
  }

  setSandboxComplement(val: string): void {
    this.sandboxComplement.set(val);
  }

  onClose(): void {
    if (isPlatformBrowser(this.platformId) && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.close.emit();
  }
}
