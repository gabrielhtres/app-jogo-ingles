import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: any = ''

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {
    if(this.rodadaFrase.frasePtBr == this.resposta){
      
      // Trocar pergunta da rodada
      this.rodada++

      // Progresso
      this.progresso = this.progresso + (100 / this.frases.length)

      if(this.rodada === 4) {
        this.encerrarJogo.emit('vitoria')
      }

      // Atualiza o objeto rodadaFrase
      this.atualizaRodada()
      
    } else {
      // Diminuir a variável tentativas
      this.tentativas--

      if(this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
      }
    }

  }

  public atualizaRodada(): void {

    // Define a frase da rodada com base em alguma lógica
    this.rodadaFrase = this.frases[this.rodada]
     
    // Limpar a resposta
    this.resposta = ''
  }

  ngOnDestroy(): void {
  }

}
 