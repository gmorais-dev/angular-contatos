import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ContatoService } from '../../core/services/contato.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Contato } from '../../models/contato.model';


@Component({
  selector: 'app-cadastro-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-contato.component.html',
  styleUrls: ['./cadastro-contato.component.scss']
})
export class CadastroContatoComponent {
  duplicidadeErro: string | null = null;

  contatoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private router: Router
  ) {
    this.contatoForm = this.fb.group({
      contatoNome: ['', [Validators.required, Validators.minLength(3)]],
      contatoEmail: ['', [Validators.required, Validators.email]],
      contatoCelular: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      contatoTelefone: [''],
      contatoSnFavorito: ['S', Validators.required],
      contatoSnAtivo: ['S', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contatoForm.valid) {
      const contato = this.contatoForm.value as Contato;
      this.contatoService.verificarDuplicidadeCelular(contato.contatoCelular)
        .subscribe(
          (existe: boolean) => {
            if (existe) {
              this.duplicidadeErro = 'Número de celular já cadastrado!';
            } else {
              this.cadastrarContato(contato);
            }
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
  }

  cadastrarContato(contato: Contato): void {
    this.contatoService.cadastrarContato(contato)
      .subscribe(
        (response: any) => {
          this.router.navigate(['/consulta']);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
